export const initialState = {
  mainPost: [],
}

const postReducer = (state = initialState, action) => {
  switch (action) {
    case 'LOG_IN':
      return {
        ...state,
        user: {
          lsLoggedIn: true,
        },
      }
    default:
      return { ...state }
  }
}

export default postReducer
