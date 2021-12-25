const express = require('express');
const { Post, User, Image, Comment } = require('../models');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const where = {};
    // ref 1
    const posts = await Post.findAll({
      where,
      limit: 10,
      order: [
        ['createdAt', 'DESC'],
        [Comment, 'createdAt', 'DESC'],
      ],
      include: [
        {
          model: User,
          attributes: ['id', 'nickname'],
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
        {
          model: User,
          as: 'Likers',
          attributes: ['id'],
        },
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
      ],
    });
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

// 1. limit offset의 문제점
// await Post.findAll({ limit : 10, offset : 0, order : [["createAt", "DESC"]]}) => limit = 10개, offset = 1~10까지 , order = 최신순 ascent
// 20, 19 18 ... 3, 2, 1
// 개시글이 삭제되거나 추가되면 인댁스가 꼬여버림
// 대신 lastId방식을 사용 (마지막으로 가지고 온 아이디를 인덱스로 사용)
