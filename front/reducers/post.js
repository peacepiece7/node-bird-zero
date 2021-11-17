import { nanoid } from "nanoid";
import { produce } from "immer";

// Curried produce로 immer사용
// https://immerjs.github.io/immer/curried-produce/

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
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
};
export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";
export const REMOVE_POST_REQUEST = "REMOVE_POST_REQUEST";
export const REMOVE_POST_SUCCESS = "REMOVE_POST_SUCCESS";
export const REMOVE_POST_FAILURE = "REMOVE_POST_FAILURE";
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
// REMOVE POST ACTIONS
export const removePostRequest = (data) => {
  return {
    type: REMOVE_POST_REQUEST,
    data,
  };
};
export const removePostSuccess = (data) => {
  return {
    type: REMOVE_POST_SUCCESS,
    data,
  };
};
export const removePostFailure = (data) => {
  return {
    type: REMOVE_POST_FAILURE,
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
  return {
    id: data.id,
    content: data.content,
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
    User: {
      id: nanoid(),
      nickname: "taetae",
    },
  };
};

// REDUCER
const postReducer = (state = initialState, { type, error, data } = {}) =>
  // eslint-disable-next-line consistent-return
  produce(state, (draft) => {
    switch (type) {
      // ADD POST CASES
      case ADD_POST_REQUEST:
        draft.addPostLoading = true;
        draft.addPostDone = false;
        draft.addPostError = null;
        break;

      case ADD_POST_SUCCESS:
        draft.mainPosts.unshift(dummyPost(data));
        draft.addPostLoading = false;
        draft.addPostDone = true;
        break;

      case ADD_POST_FAILURE:
        draft.addPostLoading = false;
        draft.addPostError = error;
        break;

      // REMOVE POST CASES
      case REMOVE_POST_REQUEST:
        draft.PostLoading = true;
        draft.PostDone = false;
        draft.PostError = null;
        break;

      case REMOVE_POST_SUCCESS: {
        draft.mainPosts = draft.mainPosts.filter((v) => v.id !== data.data);
        draft.PostLoading = false;
        draft.PostDone = true;
        break;
      }
      case REMOVE_POST_FAILURE:
        draft.removePostLoading = false;
        draft.removePostError = error;
        break;

      // ADD COMMENT CASES
      case ADD_COMMENT_REQUEST:
        draft.addCommentLoading = true;
        draft.addCommentDone = false;
        draft.addCommentError = null;
        break;

      // const postIndex = state.mainPosts.findIndex((v) => v.id === action.data.postId);
      // const post = { ...state.mainPosts[postIndex] };
      // post.Comments = [dummyComment(action.data.content), ...post.Comments];
      // const mainPosts = [...state.mainPosts];
      // mainPosts[postIndex] = post;
      // return {
      //   ...state,
      //   mainPosts,
      //   addCommentLoading: false,
      //   addCommentDone: true,
      // };
      case ADD_COMMENT_SUCCESS: {
        const post = draft.mainPosts.find((v) => v.id === data.postId);
        post.Comments.unshift(dummyComment(data.content));
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        break;
      }
      case ADD_COMMENT_FAILURE:
        draft.addCommentLoading = false;
        draft.addCommentError = error;
        break;
      default:
        return draft;
    }
  });

export default postReducer;
