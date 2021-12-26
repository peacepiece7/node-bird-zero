import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "redux";

import user from "./user";
import post from "./post";

// * ref 1
// combinReducers({index, user, post})
// combinReducers에서 initialState(user, post) initState를 합쳐 줌
// index reducer에는 HYDRATE(SSR을 위한)을 추가

// * ref 2
// SSR시 index : {user : {}, post : {}}, user : {}, post : {} <-- 이런 state가 생성됨
// const rootReducerBeforeSSR = combineReducers({
//   index: (state = {}, { type, payload } = {}) => {
//     switch (type) {
//       case HYDRATE:
//         console.log("HYDRATE", payload);
//         return { ...state, ...payload };
//       default:
//         return state;
//     }
//   },
// * ref 3
// useSelector((state) => state.user)
// import user as usetState from "../user"면
// useSelector((state) => state.usetState)
//   user,
//   post,
// });

const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...action.payload };
    default: {
      const combinedReducer = combineReducers({
        user,
        post,
      });
      return combinedReducer(state, action);
    }
  }
};

export default rootReducer;
