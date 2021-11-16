import React from "react";

import Head from "next/head";

import { useSelector } from "react-redux";
import PostForm from "../components/postForm";
import PostCard from "../components/postCard";
import AppLayout from "../components/AppLayout";

const Home = () => {
  const { me } = useSelector((state) => {
    return state.user;
  });
  const { mainPosts } = useSelector((state) => state.post);
  console.log("isLoggedIn", me, "mainPosts", mainPosts);

  return (
    <>
      <Head>
        <title>index | Node Bird</title>
      </Head>
      <AppLayout>
        {me && <PostForm />}
        {mainPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </AppLayout>
    </>
  );
};

export default Home;
