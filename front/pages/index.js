import React, { useEffect } from "react";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";

import PostForm from "../components/postForm";
import PostCard from "../components/postCard";
import AppLayout from "../components/AppLayout";
import { LOAD_POSTS_REQUEST } from "../reducers/post";
import { LOAD_USER_REQUEST } from "../reducers/user";

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

  useEffect(() => {
    dispatch({
      type: LOAD_POSTS_REQUEST,
    });
    dispatch({
      type: LOAD_USER_REQUEST,
    });
  }, []);

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

export default Home;
