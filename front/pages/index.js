import React from "react";

import Head from "next/head";

import { useSelector } from "react-redux";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";
import AppLayout from "../components/AppLayout";

const Home = () => {
  const { me } = useSelector((state) => {
    return state.user;
  });
  const { mainPosts } = useSelector((state) => state.post);

  return (
    <div>
      <Head>
        <title>index | Node Bird</title>
      </Head>
      <AppLayout>
        {me && <PostForm />}
        {mainPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </AppLayout>
    </div>
  );
};

export default Home;
