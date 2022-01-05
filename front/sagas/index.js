import { all, fork } from "redux-saga/effects";
import axios from "axios";
import { backURL, devBackURL } from "../config/config";

import postSaga from "./post";
import userSaga from "./user";

// axios.defaults.baseURL = "http://localhost:3065";
axios.defaults.baseURL = process.env.NODE_ENV === "production" ? backURL : devBackURL;

axios.defaults.withCredentials = true;

function* rootSaga() {
  yield all([fork(postSaga), fork(userSaga)]);
}

export default rootSaga;

// call = sync
// fork = async(non-blocking)
