import propTypes from "prop-types";
import Link from "next/link";
import { DatePicker, Menu, Input, Col, Row } from "antd";

// 24 = width 100%
// xs : mobile
// sm : tablet
// md : small desktop
// gutter : 간격

// _black의 보안 이슈로 ref='noreferrer noopener'작성
const AppLayout = (props) => {
  console.log(props.children);
  return (
    <div>
      <Menu mode='horizontal'>
        <Menu.Item>
          <Link href='/'>node bird</Link>
        </Menu.Item>
        <Menu.Item>
          <Link href='/profile'>profile</Link>
        </Menu.Item>
        <Menu.Item>
          <Input.Search enterButton style={{ verticalAlign: "middle" }}></Input.Search>
        </Menu.Item>
        <Menu.Item>
          <Link href='/signup'>sign up</Link>
        </Menu.Item>
      </Menu>
      <Row gutter={8}>
        <Col xs={24} md={6}>
          Left
        </Col>
        <Col xs={24} md={12}>
          {props.children}
        </Col>
        <Col xs={42} md={6}>
          <a href='https://www.zerocho.com' target='_blank' ref='noreferrer noopener'>
            made by taetae
          </a>
        </Col>
      </Row>

      <DatePicker></DatePicker>
    </div>
  );
};

// children은 type이 node임 (return안에 들어갈 수 있는 값)
AppLayout.propTypes = {
  children: propTypes.node.isRequired,
};

export default AppLayout;
