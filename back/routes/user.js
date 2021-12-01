const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
// ref 1
const { User } = require('../models/index');

const userRouter = express.Router();

// ref 2
// userRouter.post('/login', passport.authenticate('local', (error, user, info) => {
//   if(error){
//     console.error(error)
//   }
// }));
userRouter.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return console.error(err);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }
    return req.login(user, async (loginErr) => {
      // ref 3
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }
      return res.json(user);
    });
  })(req, res, next);
});

userRouter.post('/', async (req, res, next) => {
  try {
    const exUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (exUser) {
      // ref 2
      return res.status(403).send('email already exists');
    }
    // ref 3
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    // .then((hashedPwd) => {
    //   console.log("Hashed Password is ", hashedPwd);
    //   return hashedPwd;
    // });
    // console.log(" sync Hashed Password is ", hashedPwd);
    await User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword,
    });
    res.status(201).send('ok');
  } catch (err) {
    // ref 4
    console.log(err);
    next(err); // status 500
  }
});

module.exports = userRouter;

// 1. db = require("../models/index"); db.User랑 같은 distructuring assignment
// res는 html, buffer(bibary), code(state), header를 보낼 수 있음
// catch의 콜백 인자로 send의 입력 값을 가져올 수 있음, catch(err => console.log(err.response.data))

// 2. middleware extension
// express 기법 중 하나로 미들웨어를 확장하는 방법

// 3. async는 create이 끝나기 전에 res.json()이 실행되는 걸 방지
// 4.
// status 200 성공
// status 201 잘 생성 됨
