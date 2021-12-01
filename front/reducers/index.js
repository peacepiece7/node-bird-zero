import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "redux";

import user from "./user";
import post from "./post";

// combinReducers({index, user, post})
// combinReducers에서 initialState(user, post) initState를 합쳐 줌
// index reducer에는 HYDRATE(SSR을 위한)을 추가

const rootReducer = combineReducers({
  index: (state = {}, { type, payload } = {}) => {
    switch (type) {
      case HYDRATE:
        console.log("HYDRATE", payload);
        return { ...state, ...payload };
      default:
        // 여기에 spread operator를 쓰면 초기값은 새로운 객체(shallow copy)(변경됨), 그냥 보내면 reference가 같은 객체(변경되지 않음)
        return state;
    }
  },
  // ref 3
  user,
  post,
});

export default rootReducer;

// ref 3
// useSelector((state) => state.user)
// import user as usetState from "../user"면
// useSelector((state) => state.usetState)
