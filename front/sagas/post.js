import { all, delay, fork, put, takeLatest, call } from "redux-saga/effects";
import axios from "axios";

import {
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  LOAD_POST_FAILURE,
  LOAD_POST_REQUEST,
  LOAD_POST_SUCCESS,
  REMOVE_POST_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
  LIKE_POST_REQUEST,
  LIKE_POST_FAILURE,
  LIKE_POST_SUCCESS,
  UNLIKE_POST_REQUEST,
  UNLIKE_POST_FAILURE,
  UNLIKE_POST_SUCCESS,
  UPLOAD_IMAGES_REQUEST,
  UPLOAD_IMAGES_SUCCESS,
  UPLOAD_IMAGES_FAILURE,
} from "../reducers/post";
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from "../reducers/user";

// LOAD POST
function loadPostAPI() {
  return axios.get("/posts");
}
function* loadPost(action) {
  try {
    const result = yield call(loadPostAPI, action.data);
    yield delay(1000);
    yield put({
      type: LOAD_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_POST_FAILURE,
      error: err.response.data,
    });
  }
}

// ADD POST
function addPostAPI(data) {
  return axios.post("/post", data);
}
function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data);
    yield put({
      type: ADD_POST_SUCCESS,
      data: result.data,
    });
    yield put({
      type: ADD_POST_TO_ME,
      data: result.data.id,
    });
  } catch (err) {
    yield put({
      type: ADD_POST_FAILURE,
      error: err.response.data,
    });
  }
}

// REMOVE POST
function removePostAPI(data) {
  return axios.delete(`/post/${data}`);
}
function* removePost(action) {
  try {
    const result = yield call(removePostAPI, action.data);
    yield delay(1000);
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: result.data,
    });
    yield put({
      type: REMOVE_POST_OF_ME,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: REMOVE_POST_FAILURE,
      error: err.response.data,
    });
  }
}

// ADD COMMENT
function addCommentAPI(data) {
  return axios.post(`/post/${data.postId}/comment`, data, {
    withCredentials: true,
  });
}
function* addComment(action) {
  try {
    const result = yield call(addCommentAPI, action.data);
    console.log("add comment backend로 부터 받은 데이터, ", result.data);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: ADD_COMMENT_FAILURE,
      error: err.response.data,
    });
  }
}
// LIKE POST
function likePostAPI(data) {
  return axios.patch(`/post/${data}/like`, {
    withCredentials: true,
  });
}
function* likePost(action) {
  try {
    const result = yield call(likePostAPI, action.data);
    yield put({
      type: LIKE_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LIKE_POST_FAILURE,
      error: err.response.data,
    });
  }
}
// UNLIKE POST
function UnlikeAPI(data) {
  return axios.delete(`/post/${data}/unlike`, {
    withCredentials: true,
  });
}
function* unlikePost(action) {
  try {
    const result = yield call(UnlikeAPI, action.data);
    console.log("UN LIKE RESULT", result);

    yield put({
      type: UNLIKE_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.log(err.response.data);
    yield put({
      type: UNLIKE_POST_FAILURE,
      error: err.response.data,
    });
  }
}

// UPLOAD IMAGES
function uploadImagesAPI(data) {
  // data {name : data} 이런 식으로 감싸면 json됨 mulipart form으로 그대로 보내야함
  return axios.post("/post/images", data);
}
function* uploadImages(action) {
  try {
    const result = yield call(uploadImagesAPI, action.data);
    yield put({
      type: UPLOAD_IMAGES_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: UPLOAD_IMAGES_FAILURE,
      error: err.response.data,
    });
  }
}

// WATHCS
function* watchLoadPost() {
  yield takeLatest(LOAD_POST_REQUEST, loadPost);
}
function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}
function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

function* watchLikePost() {
  yield takeLatest(LIKE_POST_REQUEST, likePost);
}
function* watchUnlikePost() {
  yield takeLatest(UNLIKE_POST_REQUEST, unlikePost);
}
function* watchUploadImages() {
  yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages);
}

export default function* postSaga() {
  yield all([
    fork(watchLoadPost),
    fork(watchAddPost),
    fork(watchRemovePost),
    fork(watchAddComment),
    fork(watchLikePost),
    fork(watchUnlikePost),
    fork(watchUploadImages),
  ]);
}
