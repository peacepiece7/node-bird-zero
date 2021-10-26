import React from 'react'
import Head from 'next/head'
import AppLayout from '../components/AppLayout'
import NicknameEditForm from '../components/NicknameEditForm'
import FollowList from '../components/FollowList'

const Profile = () => {
  const followerList = [{ nickname: 'ZeroCho' }, { nickname: 'babo' }, { nickname: 'john' }]
  const followingList = [{ nickname: 'OneCho' }, { nickname: 'chenzhae' }, { nickname: 'ellie' }]
  return (
    <>
      <Head>
        <title>내 프로필 | NodeBird</title>
      </Head>
      <AppLayout>
        <NicknameEditForm></NicknameEditForm>
        <FollowList header="팔로잉 목록" data={followingList} />
        <FollowList header="팔로워 목록" data={followerList} />
      </AppLayout>
    </>
  )
}

export default Profile
