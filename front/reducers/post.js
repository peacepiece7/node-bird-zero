import { nanoid } from "nanoid";

export const initialState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: "제로초",
      },
      content: "첫 번째 게시글",
      Images: [
        {
          src: "https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?udate=20180726",
        },
        {
          src: "https://gimg.gilbut.co.kr/book/BN001958/rn_view_BN001958.jpg",
        },
        {
          src: "https://gimg.gilbut.co.kr/book/BN001998/rn_view_BN001998.jpg",
        },
      ],
      Comments: [
        {
          User: {
            nickname: "nero",
          },
          content: "우와 개정판이 나왔군요~",
        },
        {
          User: {
            nickname: "hero",
          },
          content: "얼른 사고싶어요~",
        },
      ],
    },
  ],
  imagePaths: [],
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
};
export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";
export const ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE";
// ADD POST ACTIONS
export const addPostRequest = (data) => {
  return {
    type: ADD_POST_REQUEST,
    data,
  };
};
export const addPostSuccess = (data) => {
  return {
    type: ADD_POST_SUCCESS,
    data,
  };
};
export const addPostFailure = (data) => {
  return {
    type: ADD_POST_FAILURE,
    data,
  };
};
// ADD COMMENT ACTIONS
export const addCommentRequest = (data) => {
  return {
    type: ADD_COMMENT_REQUEST,
    data,
  };
};
export const addCommentSuccess = (data) => {
  return {
    type: ADD_COMMENT_SUCCESS,
    data,
  };
};
export const addCommentFailure = (data) => {
  return {
    type: ADD_COMMENT_FAILURE,
    data,
  };
};
// DUMMY DATA
const dummyPost = (data) => {
  console.log("DUMMY POST", data);
  return {
    id: nanoid(),
    content: data,
    User: {
      id: 1,
      nickname: "제로초",
    },
    Images: [],
    Comments: [],
  };
};
const dummyComment = (data) => {
  return {
    id: nanoid(),
    content: data,
    USer: {
      id: nanoid(),
      nickname: "taetae",
    },
  };
};
// REDUCER
const post = (state = initialState, { type, error, data } = {}) => {
  switch (type) {
    // ADD POST CASES
    case ADD_POST_REQUEST: {
      return {
        ...state,
        addPostLoading: true,
        addPostDone: false,
        addPostError: null,
      };
    }
    case ADD_POST_SUCCESS: {
      return {
        ...state,
        mainPosts: [dummyPost(data), ...state.mainPosts],
        addPostLoading: false,
        addPostDone: true,
      };
    }
    case ADD_POST_FAILURE: {
      return {
        ...state,
        addPostLoading: false,
        addPostError: error,
      };
    }
    // ADD COMMENT CASES
    case ADD_COMMENT_REQUEST: {
      return {
        ...state,
        addCommentLoading: true,
        addCommentDone: false,
        addCommentError: null,
      };
    }
    case ADD_COMMENT_SUCCESS: {
      return {
        ...state,
        mainPosts: [dummyComment(data), ...state.mainPosts],
        addCommentLoading: false,
        addCommentDone: true,
      };
    }
    case ADD_COMMENT_FAILURE: {
      return {
        ...state,
        addCommentLoading: false,
        addCommentError: error,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default post;
