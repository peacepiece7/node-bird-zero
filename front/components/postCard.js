/* eslint-disable no-alert */
import React, { useCallback, useState } from "react";
import { Button, Card, Avatar, Popover, List, Comment } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import moment from "moment";

import { RetweetOutlined, HeartOutlined, HeartTwoTone, MessageOutlined, EllipsisOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

import PostImages from "./PostImages";
import FollowButton from "./FollowButton";
import CommentForm from "./CommentForm";
import PostCardContent from "./PostCardContent";
import { REMOVE_POST_REQUEST, UNLIKE_POST_REQUEST, LIKE_POST_REQUEST, RETWEET_REQUEST } from "../reducers/post";

// moment써보고 dayjs도 써보기 (dayjs는 엄청 가벼움)
// ref 3
moment.locale("ko");

// ref 1
const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const { removePostLoading } = useSelector((state) => state.post);
  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const id = useSelector((state) => state.user.me?.id);

  const onUnlike = useCallback(() => {
    if (!id) {
      return alert("로그인이 필요한 작업니다.");
    }
    return dispatch({
      type: UNLIKE_POST_REQUEST,
      data: post.id,
    });
  }, [id]);

  const onLike = useCallback(() => {
    if (!id) {
      return alert("로그인이 필요한 작업니다.");
    }
    return dispatch({
      type: LIKE_POST_REQUEST,
      data: post.id,
    });
  }, []);
  const onToggleComment = useCallback(() => {
    setCommentFormOpened((prev) => !prev);
  }, [id]);

  const onRemovePost = useCallback(() => {
    if (!id) {
      return alert("로그인이 필요한 작업니다.");
    }
    return dispatch({
      type: REMOVE_POST_REQUEST,
      data: post.id,
    });
  }, [id]);

  const onRetweet = useCallback(() => {
    if (!id) {
      return alert("로그인이 필요한 작업니다.");
    }
    return dispatch({
      type: RETWEET_REQUEST,
      data: post.id,
    });
  }, [id]);

  const liked = post.Likers.find((v) => v.id === id);
  return (
    <div style={{ marginBottom: 20 }}>
      <Card
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <RetweetOutlined key="retweet" onClick={onRetweet} />,
          liked ? (
            <HeartTwoTone twoToneColor="#eb2f96" key="heart" onClick={onUnlike} />
          ) : (
            <HeartOutlined key="heart" onClick={onLike} />
          ),
          <MessageOutlined key="comment" onClick={onToggleComment} />,
          <Popover
            key="more"
            content={
              <Button.Group>
                {id && post.User.id === id ? (
                  <>
                    <Button>수정</Button>
                    <Button type="danger" loading={removePostLoading} onClick={onRemovePost}>
                      삭제
                    </Button>
                  </>
                ) : (
                  <Button>신고</Button>
                )}
              </Button.Group>
            }
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
        title={post.RetweetId ? `${post.User.nickname}님이 리트윗하셨습니다.` : null}
        extra={id && <FollowButton post={post} />}
      >
        {post.RetweetId && post.Retweet ? (
          <Card cover={post.Retweet.Images[0] && <PostImages images={post.Retweet.Images} />}>
            <div style={{ float: "right" }}>{moment(post.createdAt).format("YYYY.MM.DD")}</div>
            <Card.Meta
              avatar={
                <Link href={`/user/${post.Retweet.User.id}`}>
                  <a>
                    <Avatar>{post.Retweet.User.nickname[0]}</Avatar>
                  </a>
                </Link>
              }
              title={post.Retweet.User.nickname}
              description={<PostCardContent postData={post.Retweet.content} />}
            />
          </Card>
        ) : (
          <>
            <div style={{ float: "right" }}>{moment(post.createdAt).format("YYYY.MM.DD")}</div>
            <Card.Meta
              avatar={
                <Link href={`/user/${post.User.id}`}>
                  <a>
                    <Avatar>{post.User.nickname[0]}</Avatar>
                  </a>
                </Link>
              }
              title={post.User.nickname}
              description={<PostCardContent postData={post.content} />}
            />
          </>
        )}
      </Card>
      {commentFormOpened && (
        <div>
          <CommentForm post={post} />
          <List
            header={`${post.Comments.length}개의 댓글`}
            itemLayout="horizontal"
            dataSource={post.Comments}
            renderItem={(item) => (
              <li>
                <Comment
                  author={item.User.nickname}
                  avatar={
                    <Link href={`/user/${item.User.id}`}>
                      <a>
                        <Avatar>{item.User.nickname[0]}</Avatar>
                      </a>
                    </Link>
                  }
                  content={item.content}
                />
              </li>
            )}
          />
        </div>
      )}
    </div>
  );
};
PostCard.propTypes = {
  // ref 2 prop types method
  post: PropTypes.shape({
    Likers: PropTypes.arrayOf(PropTypes.object),
    id: PropTypes.number,
    User: PropTypes.object,
    UserId: PropTypes.number,
    content: PropTypes.string,
    createdAt: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object),
    Comments: PropTypes.arrayOf(PropTypes.any),
    RetweetId: PropTypes.number,
    Retweet: PropTypes.objectOf(PropTypes.any),
  }).isRequired,
};
export default PostCard;

// 1. array안의 jsx는 반드시 key를 입력해줘야 함

// 2. post : PropTypes.object.isRequired
// 위와 같이 작성 시 그다지 타입을 명시하는 의미가 없음

// 3.
// <Card.Meta>위에 moment사용한 코드 있음
// {new Date().getFullYear() + new Date.getMonth + new Date.getDate()} <-- 이런 거 자동으로 만들어주는 포멧이 있음
// moment().subtract, add, calender, format ... 등등 다양함
