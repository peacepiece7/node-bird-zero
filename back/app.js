const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');
const dotenv = require('dotenv');
const hpp = require('hpp');
const helmet = require('helmet');

const userRouter = require('./routes/user');
const postsRouter = require('./routes/posts');
const postRouter = require('./routes/post');
const hashtagRouter = require('./routes/hashtag');

const db = require('./models');
const passportConfig = require('./passport');

dotenv.config();

const app = express();
// ref 1
db.sequelize
  .sync()
  .then(() => {
    console.log('db 연결 성공');
  })
  .catch(console.error);
passportConfig();
if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
  app.use(hpp());
  app.use(helmet());
  app.use(
    cors({
      // Access-Control-Allow-Origin
      origin: ['http://greenbean.info'],
      // origin: true,
      // 이걸 true로 해야 cookie가 전달이 됨 (front axios도 인자로 withCredentials : true )
      // Access-Control-Allow-Credentials
      credentials: true,
    })
  );
} else {
  app.use(morgan('dev'));
  app.use(
    cors({
      // Access-Control-Allow-Origin
      origin: true,
      // origin: true,
      // 이걸 true로 해야 cookie가 전달이 됨 (front axios도 인자로 withCredentials : true )
      // Access-Control-Allow-Credentials
      credentials: true,
    })
  );
}

// ref 4
app.use('/', express.static(path.join(__dirname, 'uploads')));
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
      // js접근 차단
      httpOnly: true,
      // https가 적용되어 있지 않다면 false
      secure: false,
      // .을 안 붙이면 구형 브라우저에서 작동 안 될 수도 있음
      domain: process.env.NODE_ENV === 'production' && '.greenbean.info',
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
app.use('/posts', postsRouter);
app.use('/hashtag', hashtagRouter);

// error page (test middleware)
// app.use((err, req, res, next) => { } });

const PORT = 80;
app.listen(PORT, () => {
  console.log(`Listen port : ${PORT}`);
});

// 1. npx requelize db:create

// 2. --
// front에서 받아온 데이터를 request.body에 넣어주는 미들웨어
// front에서 json형식 데이터 요청을 보낼 떄 req.body에 넣어줌
//    --

// 3. form type="submit"을 req.body에 넣어줌 (form tpye="submit"이 urlencoded형식임)

// 4.
// 4-1 os별 경로 차이 \uploads, /uploads 떄문에 __dirname + 'uploads'를 하지 않음
// 4-2 app.use('/')여기서 '/'가 "http://localhost:3065/" <- 이 부분이 됨
