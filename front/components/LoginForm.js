import React, { useCallback } from "react";
import { Form, Button } from "antd";
import Link from "next/link";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import useInput from "../hooks/useInput";
import { loginRequestAction } from "../reducers/user";

// * 이 부분은 고려하지 말자, garbage collection에서 함수를 제외 시켜서 메모리 남용이 큼
//   const buttonStyle = useMemo(() => {
//     marginTop: 50;
//   }, []);

// * 함수 안에 넣으면 onChange마다 re-rendering되니까 넣지말것
const FormWrapper = styled(Form)`
  padding: 10px;
`;

const ButtonWapper = styled.div`
  margin-top: 10px;
`;

// component에 props를 넘겨주는 함수는 useCallback을 사용할 것
const LoginForm = () => {
  const dispatch = useDispatch();
  const { logInLoading } = useSelector((state) => {
    return state.user;
  });
  const [email, onChangeEmail] = useInput("");
  const [password, onChangePassword] = useInput("");

  const onSubmitForm = useCallback(() => {
    // ant design에서 onFinish는 이미 preventDefault가 적용되어있음 작성 x
    // e.preventDefault()
    dispatch(loginRequestAction({ email, password }));
  }, [email, password]);

  return (
    <FormWrapper onFinish={onSubmitForm}>
      <div>
        <label htmlFor="user-email">이메일</label>
        <br />
        <input
          name="user-email"
          type="email"
          value={email}
          onChange={onChangeEmail}
        />
      </div>
      <div>
        <label htmlFor="user-password">비밀번호</label>
        <br />
        <input
          name="user-password"
          type="password"
          value={password}
          onChange={onChangePassword}
        />
      </div>
      <div>
        <ButtonWapper>
          <Button type="primary" htmlType="submit" loading={logInLoading}>
            로그인
          </Button>
          <Link href="/signup">
            <a>
              <Button>회원가입</Button>
            </a>
          </Link>
        </ButtonWapper>
      </div>
    </FormWrapper>
  );
};

export default LoginForm;
