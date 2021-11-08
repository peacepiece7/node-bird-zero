import React, { useCallback } from 'react'
import { Form, Input, Button } from 'antd'
import useInput from '../hooks/useInput'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

const CommentForm = ({ post }) => {
  const id = useSelector((state) => state.user.me?.id)

  const [commentText, onChangeCommentText] = useInput(' ')
  const onSubmitComment = useCallback(() => {}, [commentText])
  console.log(commentText, post, id)
  return (
    <Form onFinish={onSubmitComment}>
      <Form.Item>
        <Input.TextArea
          value={commentText}
          onChange={onChangeCommentText}
          rows={4}
        ></Input.TextArea>
        <Button type="primary" htmlType="submit">
          QQ삐약
        </Button>
      </Form.Item>
    </Form>
  )
}

CommentForm.propTypes = {
  post: PropTypes.object.isRequired,
}

export default CommentForm
