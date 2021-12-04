const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { Post } = require('../models');

const postRouter = express.Router();

postRouter.post('/', async (req, res) => {
  try {
    console.log(req);
    console.log('req.user are', req.user);
    console.log('req.body.content are', req.body.content);
    // const post = await Post.create({
    //   content: req.body.data, // will be changed
    //   UserId: req.user.id,
    // });
    const post = {
      content: 'dummy post obejct',
      userId: 11,
      id: 222,
    };
    console.log('포스트가 생성되었습니다.post josn객체와 ADD_POST_SUCCESS를 반환합다');
    res.status(201).json(post);
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
