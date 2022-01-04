import React, { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import { useSelector } from "react-redux";
import Router from "next/router";
// TODO : useSWRInfinite이나, offset & concat으로 중복 데이터 없이 불러오도록 할 수 있음
import useSWR from "swr";
import axios from "axios";
import { END } from "redux-saga";
import AppLayout from "../components/AppLayout";
import NicknameEditForm from "../components/NicknameEditForm";
import FollowList from "../components/FollowList";
import wrapper from "../store/configureStore";

import { LOAD_MY_INFO_REQUEST } from "../reducers/user";
import { backURL } from "../config/config";

const fetcher = async (url) => {
  try {
    const result = await axios.get(url, { withCredentials: true }).then((response) => {
      return response.data;
    });
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// const fetcher = (url) => axios.get(url, { withCredentials: true }).then((result) => result.data);

const Profile = function () {
  const { me } = useSelector((state) => state.user);
  const [followersLimit, setFollowersLimit] = useState(3);
  const [FollowingsLimit, setFollowingsLimit] = useState(3);

  const { data: followersData, error: followerError } = useSWR(
    `${backURL}/user/followers?limit=${followersLimit}`,
    fetcher
  );
  const { data: followingsData, error: followingError } = useSWR(
    `${backURL}/user/followings?limit=${FollowingsLimit}`,
    fetcher
  );

  // useEffect(() => {
  //   disaptch({
  //     type: LOAD_FOLLOWERS_REQUEST,
  //   });
  // }, []);
  // useEffect(() => {
  //   disaptch({
  //     type: LOAD_FOLLOWINGS_REQUEST,
  //   });
  // }, []);
  const loadMoreFollowings = useCallback(() => {
    setFollowingsLimit((prev) => {
      return prev + 3;
    });
  }, []);

  const loadMoreFollowers = useCallback(() => {
    setFollowersLimit((prev) => {
      return prev + 3;
    });
  }, []);

  useEffect(() => {
    if (!(me && me.id)) {
      Router.push("/");
    }
  }, [me && me.id]);

  // return이 hooks위에 있어서 hooks실행 횟수가 매번 다르면 에러가 남
  if (followerError || followingError) {
    console.error(followerError || followingError);
    return <div>팔로잉/팔로워 로딩 중 에러가 발생합니다</div>;
  }
  if (!me) {
    return <div>내 정보 로딩중...</div>;
  }
  return (
    <div>
      <Head>
        <title>내 프로필 | NodeBird</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList
          header="팔로잉 목록"
          data={followingsData}
          onClickMore={loadMoreFollowings}
          loading={!followingsData && !followingError}
        />
        <FollowList
          header="팔로워 목록"
          data={followersData}
          onClickMore={loadMoreFollowers}
          loading={!followersData && !followerError}
        />
      </AppLayout>
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  console.log("getServerSideProps start");
  console.log(context.req.headers);
  const cookie = context.req ? context.req.headers.cookie : "";
  axios.defaults.headers.Cookie = "";
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  context.store.dispatch(END);
  console.log("getServerSideProps end");
  await context.store.sagaTask.toPromise();
});

export default Profile;
