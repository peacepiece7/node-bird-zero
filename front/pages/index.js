import React, { useEffect } from "react";
import Head from "next/head";
import { END } from "redux-saga";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import PostForm from "../components/postForm";
import PostCard from "../components/postCard";
import AppLayout from "../components/AppLayout";
import { LOAD_POSTS_REQUEST } from "../reducers/post";
import { LOAD_MY_INFO_REQUEST } from "../reducers/user";
import wrapper from "../store/configureStore";

const Home = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { mainPosts, hasMorePosts, loadPostsLoading, retweetError } = useSelector((state) => {
    return state.post;
  });

  useEffect(() => {
    if (retweetError) {
      // eslint-disable-next-line no-alert
      alert(retweetError);
    }
  }, [retweetError]);

  // useEffect(() => {
  //   dispatch({
  //     type: LOAD_POSTS_REQUEST,
  //   });
  //   dispatch({
  //     type: LOAD_USER_REQUEST,
  //   });
  // }, []);

  useEffect(() => {
    function onScroll() {
      if (window.pageYOffset + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
        if (hasMorePosts && !loadPostsLoading) {
          const lastId = mainPosts[mainPosts.length - 1]?.id;
          dispatch({
            type: LOAD_POSTS_REQUEST,
            lastId,
          });
        }
      }
    }
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [hasMorePosts, loadPostsLoading, mainPosts]);
  return (
    <div>
      <Head>
        <title>index | Node Bird</title>
      </Head>
      <AppLayout>
        {me && <PostForm />}
        {me && mainPosts.map((post) => <PostCard key={post.id} post={post} />)}
      </AppLayout>
    </div>
  );
};

// getInitialProps; next 8ver
// index.js를 먼저 그리기 전에 먼저 index.js를 감싸는 wrapper를 실행, 필요한 정보를 context에 저장하고, index.js를 화면에 그릴떄
// context.store에 저장된 정보를 불러와서 화면을 그림

// 실행 결과를 HYDRATE로 보냄

// front server에서 실행되기 떄문에 브라우저가 개입하지 않는 부분임 (front (request) -> back, back (res) => front )
// axios.get("back-end url") => 브라우저가 자동으로 header에 cookie를 넣어서 보냄
// front -> back-end는 browse가 개입하지 않기떄문에 option : { set-cookie : ..} 이런식으로 작성해야 함
export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : "";
  // * 서버가 하나라서 쿠기가 공유되는 문제
  axios.defaults.headers.Cookie = "";
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  context.store.dispatch({
    type: LOAD_POSTS_REQUEST,
  });
  // REQUEST가 SUCCESS가 될 떄 까지 기다려줌
  context.store.dispatch(END);
  console.log("@ ssr dispatch done @");
  await context.store.sagaTask.toPromise();
});

export default Home;
