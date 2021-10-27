import { HYDRATE } from 'next-redux-wrapper'
const initialState = {
  user: {
    isLoggedIn: false,
    user: null,
    signUpdata: {},
    loginData: {},
  },
  post: {
    mainPost: [],
  },
}

export const loginAction = (data) => {
  return {
    type: 'LOG_IN',
    data,
  }
}

export const logoutAction = (data) => {
  return {
    type: 'LOG_IN',
    data,
  }
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      console.log(HYDRATE)
      return { ...state, ...action.payload }
    case 'LOG_IN':
      return {
        ...state,
        user: {
          ...state.user,
          isLoggedIn: true,
          user: action.data,
        },
      }
    case 'LOG_OUT':
      return {
        ...state,
        user: {
          ...state.user,
          isLoggedIn: false,
          user: null,
        },
      }
    default:
      return rootReducer
  }
}

export default rootReducer
