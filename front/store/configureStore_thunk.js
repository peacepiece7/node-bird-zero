//! version 6로 고정
import { applyMiddleware, createStore, compose } from "redux";
import { createWrapper } from "next-redux-wrapper";

// composeWithDevTools도 devTools middleware를 사용
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";

import reducer from "../reducers";

const configureStore = (context) => {
  console.log("context", context);

  // ! 이 middleware thunk 예시 코드임
  const loggerMiddleware =
    ({ getState, dispatch }) =>
    (next) =>
    (action) => {
      // 3단 고차함수로 작성 할 수 있음
      // dispatch()를 next인자로 받아서, dispatch(action)을 수행하는 미들웨어로 redux에서 제공해줌
      // 아래 코드는 함수
      // console.log("getState log :", getState);
      // console.log("dispatch log :", dispatch);
      // console.log("next log :", next);

      // 내가 요청한 action (loginAction, logoutAction ...)
      // console.log("action log :", action);

      // dispatch()을 인자로 받아서, dispatch(action)을 수행함
      next(action);
    };
  const middlewares = [loggerMiddleware, thunkMiddleware];

  // prettier-ignore
  const enhancer = process.env.NODE_ENV === 'production' 
  ? compose(applyMiddleware(...middlewares)) 
  : composeWithDevTools(applyMiddleware(...middlewares))
  const store = createStore(reducer, enhancer);
  return store;
};

const wrapper = createWrapper(configureStore, {
  debug: process.NODE_ENV === "development",
});

export default wrapper;
