const express = require("express");
const cors = require("cors");
const db = require("./models");

const userRouter = require("./routes/user");
const postRouter = require("./routes/post");

// ref 1
db.sequelize
  .sync()
  .then(() => {
    console.log("Model 작성 완료 🟢");
    console.log("db 연결 성공 🟢");
  })
  .catch(console.log);

const app = express();

app.use(
  cors({
    origin: "*",
  })
);
// ref 2
app.use(express.json());
// ref 3
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use("/user", userRouter);
app.use("/post", postRouter);

app.listen(3065, () => {
  console.log("Listen : 3065 port");
});

// 1. npx requelize db:create
// 2.
// front에서 받아온 데이터를 request.body에 넣어주는 미들웨어
// front에서 json형식 데이터 요청을 보낼 떄 req.body에 넣어줌
// 3. form type="submit"을 req.body에 넣어줌 (form tpye="submit"이 urlencoded형식임)
