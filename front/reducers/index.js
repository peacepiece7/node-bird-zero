import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "redux";

// 여기 이름이 userState면, useSelector((state) => state.userState)
import user from "./user";
import post from "./post";

// combinReducers({index, user, post})
// combinReducers에서 initialState(user, post) initState를 합쳐 줌
// index reducer에는 HYDRATE(SSR을 위한)을 추가

const rootReducer = combineReducers({
  index: (state, action) => {
    state = {};
    switch (action.type) {
      case HYDRATE:
        console.log("HYDRATE", action);
        return { ...state, ...action.payload };
      default:
        // 여기에 spread operator를 쓰면 초기값은 새로운 객체(shallow copy)(변경됨), 그냥 보내면 reference가 같은 객체(변경되지 않음)
        return state;
    }
  },
  user,
  post,
});

export default rootReducer;
