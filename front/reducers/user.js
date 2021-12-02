import { produce } from "immer";

export const initialState = {
  followLoading: false, // 팔로우 시도중
  followDone: false,
  followError: null,
  unfollowLoading: false, // 언팔로우 시도중
  unfollowDone: false,
  unfollowError: null,
  logInLoading: false, // 로그인 시도 중
  logInDone: false,
  logInError: null,
  logOutLoading: false, // 로그아웃 시도 중
  logOutDone: false,
  logOutError: null,
  signUpLoading: false, // 회원가입 시도 중
  signUpDone: false,
  signUpError: null,
  changeNicknameLoading: false, // 닉네임 변경 시도 중
  changeNicknameDone: false,
  changeNicknameError: null,
  me: null,
  signUpData: {},
  loginData: {},
};
export const LOG_IN_REQUEST = "LOG_IN_REQUEST";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILURE = "LOG_IN_FAILURE";
export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST";
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE";
export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";
export const SIGN_UP_INIT = "SIGN_UP_INIT";
export const CHANGE_NICKNAME_REQUEST = "CHANGE_NICKNAME_REQUEST";
export const CHANGE_NICKNAME_SUCCESS = "CHANGE_NICKNAME_SUCCESS";
export const CHANGE_NICKNAME_FAILURE = "CHANGE_NICKNAME_FAILURE";
export const ADD_POST_TO_ME = "ADD_POST_TO_ME";
export const REMOVE_POST_OF_ME = "REMOVE_POST_OF_ME";
export const FOLLOW_REQUEST = "FOLLOW_REQUEST";
export const FOLLOW_SUCCESS = "FOLLOW_SUCCESS";
export const FOLLOW_FAILURE = "FOLLOW_FAILURE";
export const UNFOLLOW_REQUEST = "UNFOLLOW_REQUEST";
export const UNFOLLOW_SUCCESS = "UNFOLLOW_SUCCESS";
export const UNFOLLOW_FAILURE = "UNFOLLOW_FAILURE";

// LOG IN ACTIONS

export const loginRequestAction = (data) => {
  return {
    type: LOG_IN_REQUEST,
    data,
  };
};
export const loginSuccessAction = (data) => {
  return {
    type: LOG_IN_SUCCESS,
    data,
  };
};
export const loginFailureAction = (data) => {
  return {
    type: LOG_IN_FAILURE,
    data,
  };
};
// LOG OUT ACTIONS
export const logoutRequestAction = (data) => {
  return {
    type: LOG_OUT_REQUEST,
    data,
  };
};
export const logoutSuccessAction = (data) => {
  return {
    type: LOG_OUT_SUCCESS,
    data,
  };
};
export const logoutFailureAction = (data) => {
  return {
    type: LOG_OUT_FAILURE,
    data,
  };
};
// SIGN UP ACTIONS
export const signUpRequestAction = (data) => {
  return {
    type: SIGN_UP_REQUEST,
    data,
  };
};
export const signUpSuccessAction = (data) => {
  return {
    type: SIGN_UP_SUCCESS,
    data,
  };
};
export const signUpFailureAction = (data) => {
  return {
    type: SIGN_UP_FAILURE,
    data,
  };
};
export const signUpInitAction = () => {
  return {
    type: SIGN_UP_INIT,
  };
};
// CHANGE NICKANME ACTIONS
export const changeNicknameRequestAction = (data) => {
  return {
    type: CHANGE_NICKNAME_REQUEST,
    data,
  };
};
export const changeNicknameSuccessAction = (data) => {
  return {
    type: CHANGE_NICKNAME_SUCCESS,
    data,
  };
};
export const changeNicknameFailureAction = (data) => {
  return {
    type: CHANGE_NICKNAME_FAILURE,
    data,
  };
};
// DUMMY DATA
const dummyUser = (data) => {
  return {
    ...data,
    nickname: "zerocho",
    id: 1,
    Posts: [{ id: 1 }],
    Followings: [
      { nickanme: "aa", id: "bbdsdf" },
      { nickanme: "aaa", id: "bbcx" },
      { nickanme: "abbba", id: "zzxcz" },
    ],
    Followers: [
      { nickanme: "aa", id: "bbdsdf" },
      { nickanme: "aaa", id: "bbcx" },
      { nickanme: "abbba", id: "zzxcz" },
    ],
  };
};
// REDUCER
const userReducer = (state = initialState, { type, error, data } = {}) =>
  // eslint-disable-next-line consistent-return
  produce(state, (draft) => {
    switch (type) {
      // FOLLOW CASE
      case FOLLOW_REQUEST:
        draft.followLoading = true;
        draft.followError = null;
        draft.followDone = false;
        break;
      case FOLLOW_SUCCESS:
        draft.followLoading = false;
        draft.me.Followings.push({ id: data });
        draft.followDone = true;
        break;
      case FOLLOW_FAILURE:
        draft.followLoading = false;
        draft.followError = error;
        break;
      // UNFOLLOW CASE
      case UNFOLLOW_REQUEST:
        draft.unfollowLoading = true;
        draft.unfollowError = null;
        draft.unfollowDone = false;
        break;
      case UNFOLLOW_SUCCESS:
        draft.unfollowLoading = false;
        draft.me.Followings = draft.me.Followings.filter((v) => v.id !== data);
        draft.unfollowDone = true;
        break;
      case UNFOLLOW_FAILURE:
        draft.unfollowLoading = false;
        draft.unfollowError = error;
        break;
      // LOG IN CASE
      case LOG_IN_REQUEST:
        draft.logInLoading = true;
        draft.logInError = null;
        draft.logInDone = false;
        break;
      case LOG_IN_SUCCESS:
        draft.logInLoading = false;
        draft.logInDone = true;
        draft.me = data;
        break;
      case LOG_IN_FAILURE:
        draft.logInLoading = false;
        draft.logInError = error;
        break;
      // LOG OUT CASE
      case LOG_OUT_REQUEST:
        draft.logOutLoading = true;
        draft.logOutDone = false;
        draft.logOutError = null;
        break;
      case LOG_OUT_SUCCESS:
        draft.logOutLoading = false;
        draft.logOutDone = true;
        draft.me = null;
        break;
      case LOG_OUT_FAILURE:
        draft.logOutLoading = true;
        draft.logOutError = error;
        draft.me = null;
        break;
      // SIGN UP CASE
      case SIGN_UP_REQUEST:
        draft.signUpLoading = true;
        draft.signUpDone = false;
        draft.signUpError = null;
        break;
      case SIGN_UP_SUCCESS:
        draft.signUpLoading = false;
        draft.signUpDone = true;
        break;
      case SIGN_UP_FAILURE:
        draft.signUpLoading = false;
        draft.signUpError = error;
        break;
      case SIGN_UP_INIT:
        draft.signUpLoading = false;
        draft.signUpDone = false;
        draft.signUpError = null;
        break;
      // CHANGE NICKNAME CASE
      case CHANGE_NICKNAME_REQUEST:
        draft.changeNicknameLoading = true;
        draft.changeNicknameDone = false;
        draft.changeNicknameError = null;
        break;
      case CHANGE_NICKNAME_SUCCESS:
        draft.changeNicknameLoading = false;
        draft.changeNicknameDone = true;
        break;
      case CHANGE_NICKNAME_FAILURE:
        draft.changeNicknameLoading = false;
        draft.changeNicknameError = error;
        break;
      case ADD_POST_TO_ME:
        draft.me.Posts.unshift({ id: data });
        break;
      case REMOVE_POST_OF_ME: {
        draft.me.Posts = draft.me.Posts.find((v) => v.id !== data.id);
        break;
      }
      default:
        return draft;
    }
  });

export default userReducer;
