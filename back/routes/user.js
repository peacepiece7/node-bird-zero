const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { Op } = require('sequelize');
// ref 1
const { User, Post, Comment, Image } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const userRouter = express.Router();

//

userRouter.get('/:userId', async (req, res, next) => {
  try {
    const fullUserWithoutPassword = await User.findOne({
      where: { id: req.params.userId },
      attributes: {
        exclude: ['password'],
      },
      include: [
        {
          model: Post,
          attributes: ['id'],
        },
        {
          model: User,
          as: 'Followings',
          attributes: ['id'],
        },
        {
          model: User,
          as: 'Followers',
          attributes: ['id'],
        },
      ],
    });
    if (fullUserWithoutPassword) {
      const data = fullUserWithoutPassword.toJSON();
      data.Posts = data.Posts.length; // 개인 정보 침해 예방
      data.Followers = data.Followers.length;
      data.Followings = data.Followings.length;
      res.status(200).json(data);
    } else {
      res.status(404).json('존재하지 않는 사용자입니다.');
    }
  } catch (error) {
    console.log(error);
  }
});

// GET USER
userRouter.get('/', async (req, res, next) => {
  // GET /user
  try {
    if (req.user) {
      const fullUserWithoutPassword = await User.findOne({
        where: { id: req.user.id },
        attributes: {
          exclude: ['password'],
        },
        include: [
          {
            model: Post,
            attributes: ['id'],
          },
          {
            model: User,
            as: 'Followings',
            attributes: ['id'],
          },
          {
            model: User,
            as: 'Followers',
            attributes: ['id'],
          },
        ],
      });
      res.status(200).json(fullUserWithoutPassword);
    } else {
      res.status(200).json(null);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// SIGN UP
userRouter.post('/', isNotLoggedIn, async (req, res, next) => {
  try {
    const exUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (exUser) {
      return res.status(403).send('이미 사용중이 이메일 입니다.');
    }
    // ref 4
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    await User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword,
    });
    res.status(201).send('ok'); // status 201, Created
  } catch (err) {
    console.log(err);
    next(err); // status 500, interal server error(비동기 에러), next로 에러를 넘김
  }
});

// EDIT USER
userRouter.patch('/nickname', isLoggedIn, async (req, res, next) => {
  try {
    await User.update(
      {
        nickename: req.body.nickname,
      },
      {
        where: { id: req.user.id },
      }
    );
    res.status(200).json({ nickname: req.body.nickname });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// LOGIN
// ref 2
// userRouter.post('/login', passport.authenticate('local', (error, user, info) => {
//   if(error){
//     console.error(error)
//   }
// }));
// ref 2-1
userRouter.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      return res.status(401).send(info.reason); // status 401, unauthorized
    }
    // ref 3
    return req.login(user, async (loginErr) => {
      try {
        if (loginErr) {
          console.log('@ Fail to passport login @');
          console.error(loginErr);
          return next(loginErr);
        }
        const fullUserWithoutPassword = await User.findOne({
          where: { id: user.id },
          // attributes : ['id', 'nickname', 'email'],
          attributes: {
            exclude: ['password'],
          },
          include: [
            {
              model: Post,
            },
            {
              model: User,
              as: 'Followings',
            },
            {
              model: User,
              as: 'Followers',
            },
          ],
        });
        // result 사용자 정보를 front로 넘김
        return res.status(200).json(fullUserWithoutPassword);
        // res.setHeader("Cookie", "f43tr3rasd")도 passport.login에서 보내줌
      } catch (error) {
        console.log('error : userRouter.post');
        console.log(error);
      }
    });
  })(req, res, next);
});

// LOGOUT
userRouter.post('/logout', isLoggedIn, (req, res) => {
  console.log('LOGOUT 여기에 req.user가 나와야 함', req.user);
  req.logout();
  req.session.destroy();
  res.status(201).send('로그아웃 되었습니다.');
});

// add follwer
userRouter.patch('/:userId/follow', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.params.userId } });
    if (!user) {
      return res.status(403).send('ㄴㄴㄴ');
    }
    // addFollower, 단수로 변경해주는지 확인
    await user.addFollowers(req.user.id);
    res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// DELETE FOLLOWER
userRouter.delete('/:userId/follow', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.params.userId } });
    if (!user) {
      return res.status(403).send('ㄴㄴㄴ');
    }
    await user.removeFollowers(req.user.id);
    res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// GET FOLLOWERS
userRouter.get('/followers', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    if (!user) {
      return res.status(403).send('ㄴㄴㄴ');
    }
    const followers = await user.getFollowers();
    res.status(200).json(followers);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// GET FOLLOWINGS
userRouter.get('/:userId/followings', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    if (!user) {
      return res.status(403).send('ㄴㄴㄴ');
    }

    const followings = getFollowings();
    res.status(200).json(followings);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

userRouter.get('/:userId/posts', async (req, res, next) => {
  try {
    const where = { UserId: req.params.userId };
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

module.exports = userRouter;

// 1. db = require("../models/index"); db.User랑 같은 distructuring assignment
// res는 html, buffer(bibary), code(state), header를 보낼 수 있음
// catch의 콜백 인자로 send의 입력 값을 가져올 수 있음, catch(err => console.log(err.response.data))

// 2. middleware extension
// express 기법 중 하나로 미들웨어를 확장하는 방법
// 주석처럼 작성하면 req,res,next를 쓸 수 없음

// 2-1
// passport.local.js에서 done(null, user)으로 보낸 user가 passport.authenticate의 두 번째 인자로 들어감
// passport.authenticate("local", (err, user, info) => {})

// 3
// local login이 아니라 passport에 로그인하는 메서드
// passport를 사용하면 local login, passport login 두 번 처리해줘야 함

// 4. async는 User.create이 끝나기 전에 res.json()이 실행되는 걸 방지, hasing하고 user.create실행하고
