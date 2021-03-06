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
  singlePost: null,
  hasMorePosts: true, // false일 경우 post를 가져오지 않음 (scroll event)
  imagePaths: [],
  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: null,
  loadPostLoading: false,
  loadPostDone: false,
  loadPostError: null,
  addPostsLoading: false,
  addPostsDone: false,
  addPostsError: null,
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
  likePostLoading: false,
  likePostDone: false,
  likePostError: null,
  unlikePostLoading: false,
  unlikePostDone: false,
  unlikePostError: null,
  uploadImagesLoading: false,
  uploadImagesDone: false,
  uploadImagesError: null,
  retweetLoading: false,
  retweetDone: false,
  retweetError: null,
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

export const LOAD_USER_POSTS_REQUEST = "LOAD_USER_POSTS_REQUEST";
export const LOAD_USER_POSTS_SUCCESS = "LOAD_USER_POSTS_SUCCESS";
export const LOAD_USER_POSTS_FAILURE = "LOAD_USER_POSTS_FAILURE";

export const LOAD_HASHTAG_POSTS_REQUEST = "LOAD_HASHTAG_POSTS_REQUEST";
export const LOAD_HASHTAG_POSTS_SUCCESS = "LOAD_HASHTAG_POSTS_SUCCESS";
export const LOAD_HASHTAG_POSTS_FAILURE = "LOAD_HASHTAG_POSTS_FAILURE";

export const LOAD_POSTS_REQUEST = "LOAD_POSTS_REQUEST";
export const LOAD_POSTS_SUCCESS = "LOAD_POSTS_SUCCESS";
export const LOAD_POSTS_FAILURE = "LOAD_POSTS_FAILURE";

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

export const LIKE_POST_REQUEST = "LIKE_POST_REQUEST";
export const LIKE_POST_SUCCESS = "LIKE_POST_SUCCESS";
export const LIKE_POST_FAILURE = "LIKE_POST_FAILURE";

export const UNLIKE_POST_REQUEST = "UNLIKE_POST_REQUEST";
export const UNLIKE_POST_SUCCESS = "UNLIKE_POST_SUCCESS";
export const UNLIKE_POST_FAILURE = "UNLIKE_POST_FAILURE";

export const UPLOAD_IMAGES_REQUEST = "UPLOAD_IMAGES_REQUEST";
export const UPLOAD_IMAGES_SUCCESS = "UPLOAD_IMAGES_SUCCESS";
export const UPLOAD_IMAGES_FAILURE = "UPLOAD_IMAGES_FAILURE";

export const RETWEET_REQUEST = "RETWEET_REQUEST";
export const RETWEET_SUCCESS = "RETWEET_SUCCESS";
export const RETWEET_FAILURE = "RETWEET_FAILURE";

export const REMOVE_IMAGE = "REMOVE_IMAGE";

// ADD POST ACTIONS
export const addPostsRequest = (data) => {
  return {
    type: ADD_POST_REQUEST,
    data,
  };
};
export const addPostsSuccess = (data) => {
  return {
    type: ADD_POST_SUCCESS,
    data,
  };
};
export const addPostsFailure = (data) => {
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
const postReducer = (state = initialState, { type, error, data } = {}) => {
  // eslint-disable-next-line consistent-return
  return produce(state, (draft) => {
    switch (type) {
      // LOAD POST CASES (SINGLE POST)
      case LOAD_POST_REQUEST:
        draft.loadPostLoading = true;
        draft.loadPostDone = false;
        draft.loadPostError = null;
        break;
      case LOAD_POST_SUCCESS:
        console.log("LOAD_POST_SUCCESS", data);
        draft.loadPostLoading = false;
        draft.loadPostDone = true;
        draft.singlePost = data;
        break;
      case LOAD_POST_FAILURE:
        draft.loadPostLoading = false;
        draft.loadPostError = error;
        break;
      // LOAD USER, LOAD HASH TAG, LOAD POSTS
      case LOAD_USER_POSTS_REQUEST:
      case LOAD_HASHTAG_POSTS_REQUEST:
      case LOAD_POSTS_REQUEST:
        draft.loadPostsLoading = true;
        draft.loadPostsDone = false;
        draft.loadPostsError = null;
        break;
      case LOAD_USER_POSTS_SUCCESS:
      case LOAD_HASHTAG_POSTS_SUCCESS:
      case LOAD_POSTS_SUCCESS:
        console.log("MAIN POSTS, REDUCER :", data);
        // draft.mainPosts = data.concat(draft.mainPosts);
        draft.loadPostsLoading = false;
        draft.loadPostsDone = true;
        draft.mainPosts = draft.mainPosts.concat(data);
        draft.hasMorePosts = data.length === 10;
        break;
      case LOAD_USER_POSTS_FAILURE:
      case LOAD_HASHTAG_POSTS_FAILURE:
      case LOAD_POSTS_FAILURE:
        console.log("MAIN POSTS, REDUCER :", error);
        draft.loadPostsLoading = false;
        draft.loadPostsError = error;
        break;

      // ref 2
      // REMOVE IMAGE CASE
      case REMOVE_IMAGE:
        draft.imagePaths = draft.imagePaths.filter((v, i) => i !== data);
        break;
      // LIKE POST CASES
      case LIKE_POST_REQUEST:
        draft.likePostLoading = true;
        draft.likePostDone = false;
        draft.likePostError = null;
        break;
      case LIKE_POST_SUCCESS: {
        const post = draft.mainPosts.find((v) => v.id === data.PostId);
        post.Likers.push({ id: data.UserId });
        draft.likePostLoading = false;
        draft.likePostDone = true;
        break;
      }
      case LIKE_POST_FAILURE:
        draft.likePostLoading = false;
        draft.likePostError = error;
        break;
      // UNLIKE POST CASES
      case UNLIKE_POST_REQUEST:
        draft.unlikePostLoading = true;
        draft.unlikePostDone = false;
        draft.unlikePostError = null;
        break;
      case UNLIKE_POST_SUCCESS: {
        const post = draft.mainPosts.find((v) => v.id === data.PostId);
        // splice로 써야 의미상 맞다고 함
        post.Likers = post.Likers.filter((v) => v.id !== data.UserId);
        draft.unlikePostLoading = false;
        draft.unlikePostDone = true;
        break;
      }
      case UNLIKE_POST_FAILURE:
        draft.unlikePostLoading = false;
        draft.unlikePostError = error;
        break;

      // ADD POST CASES
      case ADD_POST_REQUEST:
        draft.addPostsLoading = true;
        draft.addPostsDone = false;
        draft.addPostsError = null;
        break;
      case ADD_POST_SUCCESS:
        draft.mainPosts.unshift(data);
        draft.addPostsLoading = false;
        draft.addPostsDone = true;
        draft.imagePaths = [];
        break;
      case ADD_POST_FAILURE:
        draft.addPostsLoading = false;
        draft.addPostsError = error;
        break;
      // REMOVE POST CASES
      case REMOVE_POST_REQUEST:
        draft.removePostLoading = true;
        draft.removePostDone = false;
        draft.removePostError = null;
        break;
      case REMOVE_POST_SUCCESS: {
        draft.mainPosts = draft.mainPosts.filter((v) => {
          return v.id !== parseInt(data.postId, 10);
        });
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
        post.Comments.unshift(data);
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        break;
      }
      case ADD_COMMENT_FAILURE:
        draft.addCommentLoading = false;
        draft.addCommentError = error;
        break;
      // REMOVE POST CASES
      case UPLOAD_IMAGES_REQUEST:
        draft.uploadImagesLoading = true;
        draft.uploadImagesDone = false;
        draft.uploadImagesError = null;
        break;
      case UPLOAD_IMAGES_SUCCESS: {
        draft.imagePaths = draft.imagePaths.concat(data);
        draft.uploadImagesLoading = false;
        draft.uploadImagesDone = true;
        break;
      }
      case UPLOAD_IMAGES_FAILURE:
        draft.uploadImagesLoading = false;
        draft.uploadImagesError = error;
        break;
      // RETWEET CASES
      case RETWEET_REQUEST:
        draft.retweetLoading = true;
        draft.retweetDone = false;
        draft.retweetError = null;
        break;
      case RETWEET_SUCCESS: {
        draft.mainPosts.unshift(data);
        draft.retweetLoading = false;
        draft.retweetDone = true;
        break;
      }
      case RETWEET_FAILURE:
        draft.retweetLoading = false;
        draft.retweetError = error;
        break;
      default:
        return draft;
    }
  });
};

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

// 2. 동기 액션이라서 request, success, failture가 없음
// 동기인 이유, 백엔드와 통신하지 않고 제거 백엔드와 통신하게 되면 req,suc,fail이 필요
// back-end에 저장된 이미지는 삭제하지 않음 (image는 자산이기 떄문에)
