import React, { useEffect } from "react";
import Head from "next/head";
import { END } from "redux-saga";
import { useDispatch, useSelector } from "react-redux";

import PostForm from "../components/postForm";
import PostCard from "../components/postCard";
import AppLayout from "../components/AppLayout";
import { LOAD_POSTS_REQUEST } from "../reducers/post";
import { LOAD_USER_REQUEST } from "../reducers/user";
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
export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  context.store.dispatch({
    type: LOAD_USER_REQUEST,
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
