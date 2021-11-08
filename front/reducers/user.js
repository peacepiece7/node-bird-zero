// reducer spliting을 하면 state의 deeps가 한 단계 낮아지니까 주의!
const dummyUser = {
  id: 1,
  nickname: '제로초',
  Posts: [],
  Followings: [],
  Followers: [],
}

export const initialState = {
  isLoggedIn: false,
  me: null,
  signUpData: {},
  loginData: {},
}

export const SIGN_UP = 'SIGN_UP'
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS'
export const LOG_IN = 'LOG_IN' // 액션의 이름
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS' // 액션의 이름
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE' // 액션의 이름
export const LOG_OUT = 'LOG_OUT'

export const signUpAction = (data) => {
  return {
    type: SIGN_UP,
    data,
  }
}

export const loginAction = (data) => {
  return {
    type: LOG_IN,
    data,
  }
}
export const logoutAction = (data) => {
  return {
    type: LOG_OUT,
    data,
  }
}
export const signUp = (data) => {
  return {
    type: SIGN_UP,
    data,
  }
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN: {
      return {
        ...state,
        isLoggedIn: true,
        me: dummyUser,
        loginData: action.data,
      }
    }
    case LOG_OUT: {
      return {
        ...state,
        isLoggedIn: false,
        me: null,
      }
    }
    case SIGN_UP: {
      return {
        ...state,
        signUpData: action.data,
      }
    }
    default: {
      return {
        ...state,
      }
    }
  }
}

export default user
