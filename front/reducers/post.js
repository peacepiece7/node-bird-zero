import { produce } from "immer";

// * 성능 최적화 고려사항
// Curried produce로 immer사용
// https://immerjs.github.io/immer/curried-produce/
// dummy image => placeholder.com, lorempixel.com
// mainPosts 최소 1000개 이상으로 적용해보기

export const initialState = {
  mainPosts: [
    // {
    //   id: 1,
    //   User: {
    //     id: 1,
    //     nickname: "제로초",
    //   },
    //   content: "첫 번째 게시글",
    //   Images: [
    //     {
    //       src: "https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?udate=20180726",
    //     },
    //     {
    //       src: "https://gimg.gilbut.co.kr/book/BN001958/rn_view_BN001958.jpg",
    //     },
    //     {
    //       src: "https://gimg.gilbut.co.kr/book/BN001998/rn_view_BN001998.jpg",
    //     },
    //   ],
    //   Comments: [
    //     {
    //       User: {
    //         nickname: "nero",
    //       },
    //       content: "우와 개정판이 나왔군요~",
    //     },
    //     {
    //       User: {
    //         nickname: "hero",
    //       },
    //       content: "얼른 사고싶어요~",
    //     },
    //   ],
    // },
  ],
  hasMorePosts: true, // false일 경우 post를 가져오지 않음 (scroll event)
  imagePaths: [],
  loadPostLoading: false,
  loadPostDone: false,
  loadPostError: null,
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

// export const generateDummyPost = (number) => {
//   return Array(number)
//     .fill()
//     .map(() => {
//       return {
//         id: nanoid(),
//         User: {
//           id: nanoid(),
//           nickname: faker.name.findName(),
//         },
//         content: faker.lorem.paragraph(),
//         Images: [{ src: faker.image.image() }],
//         Comments: [
//           {
//             User: {
//               id: 1,
//               nickname: "zerocho",
//             },
//             content: faker.lorem.sentence(),
//           },
//         ],
//       };
//     });
// };

export const LOAD_POST_REQUEST = "LOAD_POST_REQUEST";
export const LOAD_POST_SUCCESS = "LOAD_POST_SUCCESS";
export const LOAD_POST_FAILURE = "LOAD_POST_FAILURE";

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

// const dummyPost = (data) => ({
//   id: data.id,
//   content: data.content,
//   User: {
//     id: 1,
//     nickname: "제로초",
//   },
//   Images: [],
//   Comments: [],
// });

// const dummyComment = (data) => ({
//   id: nanoid(), // postId
//   content: data,
//   User: {
//     id: 1,
//     nickname: "zerocho",
//   },
// });

// REDUCER
const postReducer = (state = initialState, { type, error, data } = {}) =>
  // eslint-disable-next-line consistent-return
  produce(state, (draft) => {
    switch (type) {
      // LOAD POST CASES
      case LOAD_POST_REQUEST:
        draft.loadPostLoading = true;
        draft.loadPostDone = false;
        draft.loadPostError = null;
        break;
      case LOAD_POST_SUCCESS:
        console.log("LOAD_POST_SUCCESS,", data);
        draft.mainPosts = data.concat(draft.mainPosts);
        draft.loadPostLoading = false;
        draft.loadPostDone = true;
        draft.hasMorePosts = draft.mainPosts.length < 50;
        break;
      case LOAD_POST_FAILURE:
        draft.loadPostLoading = false;
        draft.loadPostError = error;
        break;
      // ADD POST CASES
      case ADD_POST_REQUEST:
        draft.addPostLoading = true;
        draft.addPostDone = false;
        draft.addPostError = null;
        break;
      case ADD_POST_SUCCESS:
        console.log("최종적으로 mainPosts에 추가되는 데이터 : ", data);
        draft.mainPosts.unshift(data);
        draft.addPostLoading = false;
        draft.addPostDone = true;
        break;
      case ADD_POST_FAILURE:
        draft.addPostLoading = false;
        draft.addPostError = error;
        break;
      // REMOVE POST CASES
      case REMOVE_POST_REQUEST:
        draft.removePostLoading = true;
        draft.removePostDone = false;
        draft.removePostError = null;
        break;
      case REMOVE_POST_SUCCESS: {
        draft.mainPosts = draft.mainPosts.filter((v) => v.id !== data.data);
        draft.removePostLoading = false;
        draft.removePostDone = true;
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
      // ref 1
      case ADD_COMMENT_SUCCESS: {
        const post = draft.mainPosts.find((v) => v.id === data.PostId);
        post.Comments.unshift(data.content);
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

// 1. efore immer
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
