export const initialState = {
  logInLoading: false, // 로그인 시도 중
  logInDone: false,
  logInError: null,
  logOutLoading: false, // 로그아웃 시도 중
  logOutDone: false,
  logOutError: null,
  signUpLoading: false,
  signUpDone: false,
  SignUpError: null,
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
// DUMMY DATA
const dummyUser = (data) => {
  return {
    ...data,
    nickname: "zerocho",
    id: 1,
    Posts: [],
    Followings: [],
    Followers: [],
  };
};
// REDUCER
const reducer = (state, { type, error, data } = {}) => {
  switch (type) {
    // LOG IN CASE
    case LOG_IN_REQUEST: {
      return {
        ...state,
        logInLoading: true,
        logInError: null,
        logInDone: false,
      };
    }
    case LOG_IN_SUCCESS: {
      return {
        ...state,
        logInLoading: false,
        logInDone: true,
        me: dummyUser(data),
      };
    }
    case LOG_IN_FAILURE: {
      return {
        ...state,
        logInLoading: false,
        logInError: error,
      };
    }
    // LOG OUT CASE
    case LOG_OUT_REQUEST: {
      return {
        ...state,
        logOutLoading: true,
        logOutDone: false,
        logOutError: null,
        me: null,
      };
    }
    case LOG_OUT_SUCCESS: {
      return {
        ...state,
        logOutLoading: false,
        logOutDone: true,
        me: null,
      };
    }
    case LOG_OUT_FAILURE: {
      return {
        ...state,
        logOutLoading: false,
        logOutError: error,
        me: null,
      };
    }
    // SIGN UP CASE
    case SIGN_UP_REQUEST: {
      return {
        ...state,
        signUpLoading: true,
        signUpDone: false,
        signUpError: null,
        me: null,
      };
    }
    case SIGN_UP_SUCCESS: {
      return {
        ...state,
        signUpLoading: false,
        signUpDone: true,
        me: null,
      };
    }
    case SIGN_UP_FAILURE: {
      return {
        ...state,
        signUpLoading: false,
        signUpError: error,
        me: null,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default reducer;
