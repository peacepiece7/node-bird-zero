import React, { useState } from 'react'
import propTypes from 'prop-types'
import Link from 'next/link'
import { Menu, Input, Col, Row } from 'antd'
import styled from 'styled-components'

import LoginForm from '../components/LoginForm'
import UserProfile from '../components/UserProfile'

// 함수를 캐싱 = useCallback
// 값을 캐싱 = useMemo

// 24 = width 100%
// xs : mobile
// sm : tablet
// md : small desktop
// gutter : 간격

// _black의 보안 이슈로 ref='noreferrer noopener'작성 referrer(참조 주소), opener(오픈한 사람)정보를 삭제함
// https://ko.wikipedia.org/wiki/HTTP_%EB%A6%AC%ED%8D%BC%EB%9F%AC
const AppLayout = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const SearchInput = styled(Input.Search)`
    vertical-align: middle;
  `

  return (
    <div>
      <Menu key="node-bird" mode="horizontal">
        <Menu.Item>
          <Link href="/">node bird</Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/profile">profile</Link>
        </Menu.Item>
        <Menu.Item>
          <SearchInput enterButton></SearchInput>
        </Menu.Item>
        <Menu.Item>
          <Link href="/signup">sign up</Link>
        </Menu.Item>
      </Menu>
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {isLoggedIn ? <UserProfile setIsLoggedIn={setIsLoggedIn} /> : <LoginForm setIsLoggedIn={setIsLoggedIn} />}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={42} md={6}>
          <a href="https://www.zerocho.com" target="_blank" rel="noreferrer noopener">
            made by taetae
          </a>
        </Col>
      </Row>
    </div>
  )
}

// children은 type이 node임 (return안에 들어갈 수 있는 값)
AppLayout.propTypes = {
  children: propTypes.node.isRequired,
}

export default AppLayout