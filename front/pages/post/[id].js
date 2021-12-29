// dynamic routing next8부터
// 그 전엔 express로 처리했음

import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import axios from "axios";
import { END } from "redux-saga";
import Head from "next/head";
import wrapper from "../../store/configureStore";

import AppLayout from "../../components/AppLayout";
import PostCard from "../../components/postCard";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import { LOAD_POST_REQUEST } from "../../reducers/post";

const Post = () => {
  const router = useRouter();
  const { id } = router.query;
  const { singlePost } = useSelector((state) => state.post);

  // if (router.isFallback) {
  //   return <div>...Loading</div>;
  // }
  return (
    <AppLayout>
      <Head>
        <title>{singlePost.User.nickname}님의 글</title>
        <meta name="description" content={singlePost.content} />
        <meta property="og:title" content={`${singlePost.User.nickanem}님의 게시글`} />
        <meta
          property="og:image"
          content={singlePost.Images[0] ? singlePost.Images[0] : "https://nodebird.com/favicon.ico"}
        />
        <meta property="og:url" content={`https://nodebird.com/post/${id}`} />
      </Head>
      <PostCard post={singlePost} />
    </AppLayout>
  );
};

// export async function getStaticPaths() {
//   return {
//     paths: [{ params: { id: "70" } }, { params: { id: "71" } }],
//     fallback: true,
//   };
// }
// params가 없는 페이지는 state.post.singleState를 가져오질 못함..

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : "";
  console.log(context);
  axios.defaults.headers.Cookie = "";
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  context.store.dispatch({
    type: LOAD_POST_REQUEST,
    data: context.params.id,
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
  return { props: {} };
});

// export const getStaticProps = wrapper.getStaticProps(async (context) => {
//   const cookie = context.req ? context.req.headers.cookie : "";
//   axios.defaults.headers.Cookie = "";
//   if (context.req && cookie) {
//     axios.defaults.headers.Cookie = cookie;
//   }
//   context.store.dispatch({
//     type: LOAD_MY_INFO_REQUEST,
//   });
//   context.store.dispatch({
//     type: LOAD_POST_REQUEST,
//     data: context.params.id,
//   });
//   context.store.dispatch(END);
//   await context.store.sagaTask.toPromise();
//   return { props: {} };
// });

export default Post;
