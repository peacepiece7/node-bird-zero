const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { Post, Image, Comment, User } = require('../models');

const postRouter = express.Router();

postRouter.post('/', async (req, res) => {
  try {
    // save to db
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id || 10,
    });
    // get post data from db
    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [
        {
          model: Image,
        },
        {
          model: Comment,
        },
        {
          model: User,
        },
      ],
    });
    console.log('포스트가 생성되었습니다.post josn객체와 ADD_POST_SUCCESS를 반환합다');
    res.status(201).json(fullPost);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

postRouter.post('/:postId/comment', async (req, res) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });
    if (!post) {
      return res.status(403).send('존재하지 않는 게시글입니다.');
    }
    const comment = await Comment.create({
      content: req.body.content,
      PostId: req.params.postId,
    });
    res.status(201).json(comment);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

postRouter.post('/api', (req, res) => {
  res.send('Hello, api');
});

postRouter.post('/api/posts', (req, res) => {
  res.json([
    {
      id: 1,
      conetnet: 'foo',
    },
    {
      id: 2,
      conetnet: 'bar',
    },
    {
      id: 3,
      conetnet: 'boo',
    },
    {
      id: 4,
      conetnet: 'tae',
    },
  ]);
});

module.exports = postRouter;
