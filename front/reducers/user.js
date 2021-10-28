// reducer spliting을 하면 state의 deeps가 한 단계 낮아지니까 주의!

export const initialState = {
  isLoggedIn: false,
  user: null,
  signUpdata: {},
  loginData: {},
}

export const loginAction = (data) => {
  return {
    type: 'LOG_IN',
    data,
  }
}

export const logoutAction = (data) => {
  return {
    type: 'LOG_OUT',
    data,
  }
}

const userReducer = (state = initialState, action) => {
  switch (action) {
    case 'LOG_IN':
      return {
        ...state,
        isLoggedIn: true,
        user: action.data,
      }
    case 'LOG_OUT':
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      }
    default:
      return {
        ...state,
      }
  }
}

export default userReducer
