import React, { useCallback } from 'react'
import { Card, Avatar, Button } from 'antd'
import propTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { logoutRequestAction } from '../reducers/user'

const UserProfile = () => {
  const dispatch = useDispatch()
  const { me, isLoggingOut } = useSelector((state) => state.user)

  const onLogOut = useCallback(() => {
    dispatch(logoutRequestAction({}))
  }, [])
  return (
    <Card
      // prettier-ignore
      actions={[
        <div key="twit">짹<br />0</div>,
        <div key="followings">following<br />0</div>,
        <div key="follower">follower<br />0</div>,]}
    >
      <Card.Meta avatar={<Avatar>{me?.nickname[0]}</Avatar>} title="ACTION"></Card.Meta>
      <Button onClick={onLogOut} loading={isLoggingOut}>
        로그아웃
      </Button>
    </Card>
  )
}

UserProfile.propTypes = {
  setIsLoggedIn: propTypes.func,
}

export default UserProfile
