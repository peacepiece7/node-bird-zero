import React, { useEffect } from "react";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";

import PostForm from "../components/PostForm";
import PostCard from "../components/postCard";
import AppLayout from "../components/AppLayout";
import { LOAD_POST_REQUEST } from "../reducers/post";
import { LOAD_USER_REQUEST } from "../reducers/user";

const Home = () => {
  const { me } = useSelector((state) => state.user);
  const { mainPosts, hasMorePosts, loadPostLoading } = useSelector((state) => {
    return state.post;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: LOAD_POST_REQUEST,
    });
    dispatch({
      type: LOAD_USER_REQUEST,
    });
  }, []);

  function onScroll() {
    const scrolledY = window.scrollY;
    const viewPortHeight = document.documentElement.clientHeight;
    const totalHeight = document.documentElement.scrollHeight;
    if (
      scrolledY + viewPortHeight >= totalHeight - 500 &&
      hasMorePosts !== loadPostLoading
    ) {
      dispatch({
        type: LOAD_POST_REQUEST,
      });
    }
  }
  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  });

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
