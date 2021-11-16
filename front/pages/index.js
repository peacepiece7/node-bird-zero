import React from "react";

import Head from "next/head";

import { useSelector } from "react-redux";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";
import AppLayout from "../components/AppLayout";

const Home = () => {
  const { isLoggedIn } = useSelector((state) => {
    return state.user;
  });
  const { mainPosts } = useSelector((state) => state.post);
  console.log("isLoggedIn", isLoggedIn, "mainPosts", mainPosts);

  return (
    <>
      <Head>
        <title>index | Node Bird</title>
      </Head>
      <AppLayout>
        <PostForm />
        {mainPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </AppLayout>
    </>
  );
};

export default Home;
