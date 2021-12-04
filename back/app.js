const express = require('express');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

const userRouter = require('./routes/user');
const postRouter = require('./routes/post');

const db = require('./models');
const passportConfig = require('./passport');

dotenv.config();
// ref 1
db.sequelize
  .sync()
  .then(() => {
    console.log('db 연결 성공');
  })
  .catch(console.error);
passportConfig();

const app = express();

app.use(
  cors({
    // Access-Control-Allow-Origin
    origin: '*',
    // Access-Control-Allow-Credentials
    credentials: true,
  })
);

// ref 2
app.use(express.json());

// ref 3
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      secure: false,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('Hello');
});
app.use('/user', userRouter);
app.use('/post', postRouter);

// error page (test middleware)
// app.use((err, req, res, next) => { } });

app.listen(3065, () => {
  console.log('Listen : 3065 port');
});

// 1. npx requelize db:create
// 2.
// front에서 받아온 데이터를 request.body에 넣어주는 미들웨어
// front에서 json형식 데이터 요청을 보낼 떄 req.body에 넣어줌
// 3. form type="submit"을 req.body에 넣어줌 (form tpye="submit"이 urlencoded형식임)
