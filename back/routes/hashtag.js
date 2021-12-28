const express = require('express');
const { Post, Hashtag, Image, Comment, User } = require('../models');
const { Op } = require('sequelize');

const router = express.Router();

router.get('/:tag', async (req, res, next) => {
  try {
    const where = {};
    if (parseInt(req.query.lastId, 10)) {
      // 초기 로딩이 아닐 떄
      // lastId보다 작은 거 10개를 불러와라(limit : 10)
      where.id = { [Op.lt]: parseInt(req.query.lastId, 10) };
      // 21 20 19 18.. 7 6 5 4 3 2 1
    }
    // ref 1
    const posts = await Post.findAll({
      where,
      limit: 10,
      include: [
        {
          model: Hashtag,
          where: { name: decodeURIComponent(req.params.tag) },
        },
        {
          model: User,
          attributes: ['id', 'nickname'],
        },
        {
          model: Image,
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
