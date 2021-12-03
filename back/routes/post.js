const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { Post } = require('../models');

const postRouter = express.Router();

postRouter.get('/', isLoggedIn, async (req, res) => {
  try {
    console.log('Request body content are :', req.body);
    console.log('Request parameter is :', req.params);
    const post = await Post.create({
      content: req.body.data, // will be changed
      UserId: req.user.id,
    });
    console.log('포스트가 생성되었습니다.post josn객체와 ADD_POST_SUCCESS를 반환합다');
    res.status(201).json(post);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

postRouter.get('/api', (req, res) => {
  res.send('Hello, api');
});

postRouter.get('/api/posts', (req, res) => {
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
