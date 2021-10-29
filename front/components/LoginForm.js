import React, { useCallback } from 'react'
import { Form, Button } from 'antd'
import Link from 'next/link'
import styled from 'styled-components'
import propTypes from 'prop-types'

import { useDispatch } from 'react-redux'
import useInput from '../hooks/useInput'
import { loginAction } from '../reducers/user'

// * 이 부분은 고려하지 말자, garbage collection에서 함수를 제외 시켜서 메모리 남용이 큼
//   const buttonStyle = useMemo(() => {
//     marginTop: 50;
//   }, []);

// * 함수 안에 넣으면 onChange마다 re-rendering되니까 넣지말것
const FormWrapper = styled(Form)`
  padding: 10px;
`
// component에 props를 넘겨주는 함수는 useCallback을 사용할 것
const LoginForm = () => {
  // custom hooks를 이용한 중복 제거
  const [id, onChangeId] = useInput('')
  const [password, onChangePassword] = useInput('')

  const dispatch = useDispatch()
  // * styles
  const ButtonWapper = styled.div`
    margin-top: 10px;
  `

  const onSubmitForm = useCallback(() => {
    // ant design에서 onFinish는 이미 preventDefault가 적용되어있음 작성 x
    // e.preventDefault()
    dispatch(loginAction({ id, password }))
  }, [id, password])

  return (
    <FormWrapper onFinish={onSubmitForm}>
      <div>
        <label htmlFor="user-id">아이디</label>
        <br />
        <input name="user-id" type="email" value={id} onChange={onChangeId}></input>
      </div>
      <div>
        <label htmlFor="user-password">비밀번호</label>
        <br />
        <input name="user-password" type="password" value={password} onChange={onChangePassword}></input>
      </div>
      <div>
        <ButtonWapper>
          <Button type="primary" htmlType="submit" loading={false}>
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
  )
}

LoginForm.propTypes = {
  setIsLoggedIn: propTypes.func,
}

export default LoginForm
