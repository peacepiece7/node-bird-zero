const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { Post, Image, Comment, User } = require('../models');

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
    // save to db
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id || 10,
    });

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
    console.log(req.files);
    res.json(req.files.map((v) => v.filename));
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = postRouter;
