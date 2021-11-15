import React, { useCallback } from 'react'
import { Card, Avatar, Button } from 'antd'
import propTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { logoutRequestAction } from '../reducers/user'

const UserProfile = () => {
  const dispatch = useDispatch()
  const { me, logOutLoading } = useSelector((state) => state.user)

  const onLogOut = useCallback(() => {
    dispatch(logoutRequestAction({}))
  }, [])
  return (
    <Card
      // prettier-ignore
      actions={[
        <div key="twit">짹<br />{me.Posts.length}</div>,
        <div key="followings">following<br />{me.Followings.length}</div>,
        <div key="follower">follower<br />{me.Followers.length}</div>,]}
    >
      <Card.Meta avatar={<Avatar>{me?.nickname[0]}</Avatar>} title="ACTION"></Card.Meta>
      <Button onClick={onLogOut} loading={logOutLoading}>
        로그아웃
      </Button>
    </Card>
  )
}

UserProfile.propTypes = {
  setIsLoggedIn: propTypes.func,
}

export default UserProfile
