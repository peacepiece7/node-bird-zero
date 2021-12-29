import React, { useCallback } from "react";
import { Card, Avatar, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

import { LOG_OUT_REQUEST } from "../reducers/user";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { me, logOutLoading } = useSelector((state) => state.user);

  const onLogOut = useCallback(() => {
    dispatch({
      type: LOG_OUT_REQUEST,
    });
  }, []);

  return (
    <Card
      // prettier-ignore
      actions={[
        <div key="twit"><Link href={`/user/${me.id}`}><a>짹<br />{me.Posts.length}</a></Link></div>,
        <div key="followings"><Link href="/profile"><a>following<br />{me.Followings.length}</a></Link></div>,
        <div key="follower"><Link href="/profile"><a>follower<br />{me.Followers.length}</a></Link></div>,]}
    >
      <Card.Meta avatar={<Avatar>{me?.nickname[0]}</Avatar>} title={me?.nickname} />
      <Button htmlType="submit" onClick={onLogOut} loading={logOutLoading}>
        로그아웃
      </Button>
    </Card>
  );
};

export default UserProfile;
