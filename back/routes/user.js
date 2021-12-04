const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
// ref 1
const { User, Post } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const userRouter = express.Router();

// SIGN UP
userRouter.post('/', async (req, res, next) => {
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
        console.log('fullIserWithoutpassword,', fullUserWithoutPassword);
        return res.status(200).json(fullUserWithoutPassword);
        // res.setHeader("Cookie", "f43tr3rasd")도 passport.login에서 보내줌
      } catch (error) {
        console.log('error : userRouter.post');
        console.log(error);
      }
    });
  })(req, res, next);
});

userRouter.post('/logout', (req, res) => {
  console.log('LOGOUT 여기에 req.user가 나와야 함', req.user);
  req.logout();
  req.session.destroy();
  res.status(201).send('로그아웃 되었습니다.');
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
