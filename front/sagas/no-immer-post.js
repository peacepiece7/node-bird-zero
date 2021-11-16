// immer가 있고 없고 차이를 위해 남겨둔 파일

import { all, delay, fork, put, takeLatest } from "redux-saga/effects";
// import { nanoid } from "nanoid";
// import axios from "axios";

// function addPostAPI(data) {
//   return axios.post("/api/posts", data);
// }

function* addPost(action) {
  try {
    // const result = yield call(addPostAPI, action.data)
    yield delay(1000);
    yield put({
      type: "ADD_POST_SUCCESS",
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: "ADD_POST_FAILURE",
      data: err.response.data,
    });
  }
}

function* watchAddPost() {
  yield takeLatest("ADD_POST_REQUEST", addPost);
}

export default function* postSaga() {
  yield all([fork(watchAddPost)]);
}
