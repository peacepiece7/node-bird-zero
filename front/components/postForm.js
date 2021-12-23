import React, { useCallback, useEffect, useRef } from "react";
import { Form, Input, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { ADD_POST_REQUEST, UPLOAD_IMAGES_REQUEST } from "../reducers/post";
import useInput from "../hooks/useInput";

const PostForm = () => {
  const dispatch = useDispatch();
  const { imagePaths, addPostDone } = useSelector((state) => state.post);
  const imageInput = useRef();
  const [text, onChangeText, setText] = useInput("");

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const onSubmit = useCallback(() => {
    dispatch({
      type: ADD_POST_REQUEST,
      data: text,
    });
  }, [text]);

  useEffect(() => {
    if (addPostDone) {
      setText("");
    }
  }, [addPostDone]);

  const onChangeImages = useCallback((e) => {
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, (f) => {
      imageFormData.append("image", f);
    });
    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageFormData,
    });
  });
  console.log("imagePath : ", imagePaths);

  return (
    <div>
      <Form
        style={{ margin: "10px 0 20px" }}
        encType="multipart/form-data"
        onFinish={onSubmit}
      >
        <Input.TextArea
          value={text}
          onChange={onChangeText}
          maxLength={140}
          placeholder="어떤 신기한 일이 있었나요?"
        />
        <div>
          <input
            type="file"
            name="image"
            multiple
            hidden
            ref={imageInput}
            onChange={onChangeImages}
          />
          <Button onClick={onClickImageUpload}>이미지 업로드</Button>
          <Button type="primary" style={{ float: "right" }} htmlType="submit">
            짹짹
          </Button>
        </div>
      </Form>
      <div>
        {imagePaths.map((v) => (
          <div key={v} style={{ display: "inline-block" }}>
            <img
              src={`http://localhost:3065/${v}`}
              style={{ width: "200px" }}
              alt={v}
            />
            <div>
              <Button>제거</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostForm;
