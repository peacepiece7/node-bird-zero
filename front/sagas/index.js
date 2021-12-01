import { all, fork } from "redux-saga/effects";
import axios from "axios";

import postSaga from "./post";
import userSaga from "./user";

axios.defaults.baseURL = "http://localhost:3065";

function* rootSaga() {
  yield all([fork(postSaga), fork(userSaga)]);
}

export default rootSaga;

// call = sync
// fork = async(non-blocking)
