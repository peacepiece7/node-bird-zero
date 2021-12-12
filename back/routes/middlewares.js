// ref 1
exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  console.log('로그인 상태여야 필요합니다!');
  res.status(401).send('로그인이 필요합니다.');
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  }

  console.log('로그아웃 상태여야 합니다!');
  res.status(401).send('로그인하지 않은 사용자만 접근 가능합니다.');
};

exports.loginMiddlewareTest = (req, res, next) => {
  next();
};

// 1. next(err)
// next(err) => next에 인자가 주어질 경우, 해당 라우터의 마지막으로 가서 에러를 처리함

// next()
// 다음 미들웨어로 넘어감

// 라우터의 마지막에 직접 에러를 처리하고싶을 경우 아래와 같이 작성
// 주로 에러 페이지가 따로 있을 경우 이렇게 함
// ex1 controller .app.use(localMiddleware)
// ex2 templete engin. app.use((err,req,res,next) => { res.render('errorPage.pug') })
// ex3 error message. app.use((err,req,res,next) => { res.state(401).send(errorMessage)) })
// ex4 redirect. app.use((err,req,res,next) => { res.redirect("/", { message : errorMessage})) })
