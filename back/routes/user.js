const express = require("express");
const bcrypt = require("bcrypt");
// ref 1
const { User } = require("../models/index");

const userRouter = express.Router();

userRouter.post("/", async (req, res, next) => {
  try {
    console.log("@@@@@@@@@@@@@@@@@@request body : ", req.body);
    const exUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (exUser) {
      // ref 2
      return res.status(403).send("already used id");
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
    res.status(201).send("ok");
  } catch (err) {
    // ref 4
    console.log(err);
    next(err); // status 500
  }
});

module.exports = userRouter;

// 1. db = require("../models/index"); db.User랑 같은 distructuring assignment
// 2. res는 html, buffer(bibary), code(state), header를 보낼 수 있음
// 3. async는 create이 끝나기 전에 res.json()이 실행되는 걸 방지
// 4.
// status 200 성공
// status 201 잘 생성 됨
