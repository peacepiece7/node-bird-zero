import React, { useCallback, useState } from 'react'
import { Button, Card, Avatar, Popover } from 'antd'
import { useSelector } from 'react-redux'

import { RetweetOutlined, HeartOutlined, HeartTwoTone, MessageOutlined, EllipsisOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'
import post from '../reducers/post'

import PostImages from './PostImages'

// array안의 jsx는 반드시 key를 입력해줘야 함
const PostCard = ({ post }) => {
  const [liked, setLiked] = useState(false)
  const [commentFormOpened, setCommentFormOpened] = useState(false)
  // Optional chaning 아니면 &&
  const id = useSelector((state) => state.user.me?.id)
  const onToggleLike = useCallback(() => {
    setLiked((prev) => !prev)
  })
  const onToggleComment = useCallback(() => {
    setCommentFormOpened((prev) => !prev)
  })
  return (
    <div>
      <Card
        cover={post.Images[0] && <PostImages images={post.Images}></PostImages>}
        actions={[
          <RetweetOutlined key="retweet"></RetweetOutlined>,
          liked ? (
            <HeartTwoTone twoToneColor="#eb2f96" key="toToneHeart" onClick={onToggleLike}></HeartTwoTone>
          ) : (
            <HeartOutlined key="heart" onClick={onToggleLike}></HeartOutlined>
          ),
          <MessageOutlined key="comment" onClick={onToggleComment}></MessageOutlined>,
          <Popover
            key="more"
            content={
              <Button.Group>
                {id && post.User.id === id ? (
                  <>
                    <Button>수정</Button>
                    <Button type="danger">삭제</Button>
                  </>
                ) : (
                  <Button>신고</Button>
                )}
              </Button.Group>
            }
          >
            <EllipsisOutlined></EllipsisOutlined>
          </Popover>,
        ]}
      >
        <Card.Meta avatar={<Avatar>{post.User.nickname[0]}</Avatar>} description={post.content} title={post.User.nickname}></Card.Meta>
      </Card>
      {commentFormOpened && <div>댓글 부분</div>}
      {/* <CommentForm></CommentForm>
      <Comments></Comments> */}
    </div>
  )
}
PostCard.propTypes = {
  // post : ProTypes.object.isRequired 를 아래와 같이 자세히 정의
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    content: PropTypes.string,
    createdAt: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
}
export default PostCard
