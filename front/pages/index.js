import React from 'react'

import { useSelector } from 'react-redux'
import AppLayout from '../components/AppLayout'
import Head from 'next/head'

import PostForm from '../components/postForm'
import PostCard from '../components/postCard'

const Home = () => {
  const { isLoggedIn } = useSelector((state) => {
    console.log(state)
    return state.user
  })
  const { mainPosts } = useSelector((state) => state.post)
  console.log('isLoggedIn', isLoggedIn, 'mainPosts', mainPosts)

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
  )
}

export default Home
