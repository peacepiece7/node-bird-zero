import React, { useCallback } from 'react'
import { Card, Avatar, Button } from 'antd'
import propTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { logoutAction } from '../reducers/user'

const UserProfile = () => {
  const dispatch = useDispatch()
  const onLogOut = useCallback(() => {
    dispatch(logoutAction({}))
  }, [])
  return (
    <Card
      // prettier-ignore
      actions={[
        <div key="twit">짹<br />0</div>,
        <div key="followings">following<br />0</div>,
        <div key="follower">follower<br />0</div>,]}
    >
      <Card.Meta avatar={<Avatar>AC</Avatar>} title="ACTION"></Card.Meta>
      <Button onClick={onLogOut}>로그아웃</Button>
    </Card>
  )
}

UserProfile.propTypes = {
  setIsLoggedIn: propTypes.func,
}

export default UserProfile
