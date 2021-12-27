const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { Post, Image, Comment, User, Hashtag } = require('../models');

const postRouter = express.Router();

try {
  fs.accessSync('uploads');
} catch (error) {
  console.log('uploads 폴더가 없으므로 생성합니다.');
  fs.mkdirSync('uploads');
}

const upload = multer({
  // computer hardware
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads');
    },
    filename(req, file, done) {
      const ext = path.basename(file.originalname); // 확장자 추출(.png)
      const basename = path.basename(file.originalname, ext); // 제로초
      done(null, basename + '_' + new Date().getTime() + ext); // 제로초12312414.png
    },
  }),
  // front -> cloud로 바로하는게 좋음
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
});

// Add Post
postRouter.post('/', isLoggedIn, upload.none(), async (req, res, next) => {
  try {
    const hashtags = req.body.content.match(/#[^\s#]+/g);
    // save to db
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id || 10,
    });
    // save hashtags to db
    if (hashtags) {
      const result = await Promise.all(
        hashtags.map((tag) =>
          Hashtag.findOrCreate({
            where: { name: tag.slice(1).toLowerCase() },
          })
        )
      );
      await post.addHashtags(result.map((v) => v[0]));
    }
    if (req.body.image) {
      if (Array.isArray(req.body.image)) {
        // images : [zerocho.png, boogicho.png]
        // 보통 파일은 s3같은데 올려서 cdn으로 캐싱을 적용하고, db는 image의 주소만 가짐
        const images = await Promise.all(req.body.image.map((image) => Image.create({ src: image })));
        await post.addImages(images);
      } else {
        // image : zerocho.png
        const image = await Image.create({ src: req.body.image });
        await post.addImages(image);
      }
    }
    // get post data from db
    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [
        {
          model: Image,
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['id', 'nickname'],
            },
          ],
        },
        {
          model: User,
          attributes: ['id', 'nickname'],
        },
        {
          model: User,
          as: 'Likers',
          attributes: ['id'],
        },
      ],
    });

    res.status(201).json(fullPost);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// Delete post
postRouter.delete('/:postId', isLoggedIn, async (req, res, next) => {
  try {
    Post.destroy({
      where: {
        id: parseInt(req.params.postId, 10),
        userId: req.user.id,
      },
    });
    res.status(200).json({ postId: req.params.postId });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// Patch Like
postRouter.patch('/:postId/like', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({ where: { id: parseInt(req.params.postId, 10) } });
    if (!post) {
      return res.status(403).send('게시글이 존재하지 않습니다.');
    }
    await post.addLikers(req.user.id);
    res.json({ PostId: post.id, UserId: req.user.id });
  } catch (error) {
    console.log(error);
    next(error);
  }
});
// Delete Like
postRouter.delete('/:postId/unlike', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({ where: { id: parseInt(req.params.postId, 10) } });
    if (!post) {
      return res.status(403).send('게시글이 존재하지 않습니다.');
    }
    await post.removeLikers(req.user.id);
    res.json({ PostId: post.id, UserId: req.user.id });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// Add comment
postRouter.post('/:postId/comment', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: parseInt(req.params.postId, 10) },
    });
    if (!post) {
      return res.status(403).send('존재하지 않는 게시글입니다.');
    }
    const comment = await Comment.create({
      content: req.body.content,
      PostId: parseInt(req.params.postId, 10),
      UserId: req.user.id,
    });
    const fullComment = await Comment.findOne({
      where: { id: comment.id },
      include: [
        {
          model: User,
          attributes: ['id', 'nickname'],
        },
      ],
    });
    res.status(201).json(fullComment);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// upload.none(Text) , fills(input이 두 개 이상), array(여러개), single(하나)
// Upload Image
postRouter.post('/images', isLoggedIn, upload.array('image'), async (req, res, next) => {
  try {
    res.json(req.files.map((v) => v.filename));
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// Upload Image
postRouter.post('/:postId/retweet', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
      include: [{ model: Post, as: 'Retweet' }],
    });
    if (!post) {
      return res.status(403).send('존재하지 않는 게시글입니다.');
    }
    if (req.user.id === post.UserId || (post.Retweet && post.Retweet.UserId === req.user.id)) {
      return res.status(403).send('자신의 글은 리트윗 할 수 없습니다.');
    }
    const retweetTargetId = post.RetweetId || post.id;
    const exPost = await Post.findOne({
      where: {
        UserId: req.user.id,
        RetweetId: retweetTargetId,
      },
    });
    if (exPost) {
      return res.status(403).send('이미 리트윗한 게시물입니다.');
    }
    const retweet = await Post.create({
      UserId: req.user.id,
      RetweetId: retweetTargetId,
      // sequlize allowNull : false라서 문자열 아무거나 입력한ㄱㅓ
      content: 'retweet',
    });
    const retweetWithPrevPost = await Post.findOne({
      include: [
        {
          model: Post,
          as: 'Retweet',
          include: [
            {
              model: User,
              attributes: ['id', 'nickname'],
            },
            {
              model: Image,
            },
          ],
        },
        {
          model: User,
          attributes: ['id', 'nickname'],
        },
        {
          model: User, // 좋아요 누른 사람
          as: 'Likers',
          attributes: ['id'],
        },
        {
          model: Image,
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['id', 'nickname'],
            },
          ],
        },
      ],
    });
    res.status(201).json(retweetWithPrevPost);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// GET POST
postRouter.get('/:postId', async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });
    if (!post) {
      return res.status(404).send('존재하지 않는 게시글입니다.');
    }
    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [
        {
          model: Post,
          as: 'Retweet',
          include: [
            {
              model: User,
              attributes: ['id', 'nickname'],
            },
            {
              model: Image,
            },
          ],
        },
        {
          model: User,
          attributes: ['id', 'nickname'],
        },
        {
          model: User, // 좋아요 누른 사람
          as: 'Likers',
          attributes: ['id'],
        },
        {
          model: Image,
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['id', 'nickname'],
            },
          ],
        },
      ],
    });
    res.status(201).json(fullPost);
  } catch (error) {
    console.log(error);
    next(error);
  }
});
module.exports = postRouter;
