import React, { useEffect } from "react";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";

import AppLayout from "../components/AppLayout";
import NicknameEditForm from "../components/NicknameEditForm";
import FollowList from "../components/FollowList";
import {
  LOAD_FOLLOWERS_REQUEST,
  LOAD_FOLLOWINGS_REQUEST,
} from "../reducers/user";

const Profile = function () {
  const disaptch = useDispatch();
  const { me } = useSelector((state) => state.user);
  useEffect(() => {
    disaptch({
      type: LOAD_FOLLOWERS_REQUEST,
    });
  }, []);
  useEffect(() => {
    disaptch({
      type: LOAD_FOLLOWINGS_REQUEST,
    });
  }, []);
  return (
    <div>
      <Head>
        <title>내 프로필 | NodeBird</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList header="팔로잉 목록" data={me?.Followings} />
        <FollowList header="팔로워 목록" data={me?.Followers} />
      </AppLayout>
    </div>
  );
};

export default Profile;
