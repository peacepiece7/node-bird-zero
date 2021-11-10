export const initialState = {
  isLoggedIn: false, // 로그인 시도 중
  isLoggingIn: false,
  isLoggingOut: false, // 로그아웃 시도 중
  me: null,
  signUpData: {},
  loginData: {},
}

export const loginRequestAction = (data) => {
  return {
    type: 'LOG_IN_REQUEST',
    data,
  }
}
export const loginSuccessAction = (data) => {
  return {
    type: 'LOG_IN_SUCCESS',
    data,
  }
}
export const loginFailureAction = (data) => {
  return {
    type: 'LOG_IN_FAILURE',
    data,
  }
}

export const logoutRequestAction = (data) => {
  return {
    type: 'LOG_OUT_REQUEST',
    data,
  }
}
export const logoutSuccessAction = (data) => {
  return {
    type: 'LOG_OUT_SUCCESS',
    data,
  }
}

export const logoutFailureAction = (data) => {
  return {
    type: 'LOG_OUT_FAILURE',
    data,
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // LOG IN CASE
    case 'LOG_IN_REQUEST': {
      return {
        ...state,
        isLoggingIn: true,
      }
    }
    case 'LOG_IN_SUCCESS': {
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: true,
        me: { ...action.data, nickname: 'zerocho' },
      }
    }
    case 'LOG_IN_FAILURE': {
      return {
        ...state,
        isLoggedIn: false,
        isLoggingIn: false,
      }
    }

    // LOG OUT CASE
    case 'LOG_OUT_REQUEST': {
      return {
        ...state,
        isLoggingOut: true,
        me: null,
      }
    }
    case 'LOG_OUT_SUCCESS': {
      return {
        ...state,
        isLoggingOut: false,
        isLoggedIn: false,
        me: null,
      }
    }
    case 'LOG_OUT_FAILURE': {
      return {
        ...state,
        isLoggingOut: false,
        isLoggedIn: false,
        me: null,
      }
    }

    // DEFAULT
    default: {
      return {
        ...state,
      }
    }
  }
}

export default reducer
