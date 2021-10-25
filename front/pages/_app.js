// **
// 공통으로 적용해야하는 파일은 _app.js에 작성합니다. (Dependency Injection)
// ref) Head 수정 (page마다 head가 다르다면, 해당 page마다 Head를 따로 작성합니다.)
// **
import propTypes from "prop-types";
import "antd/dist/antd.css";
import Head from "next/head";

const NodeBird = ({ Component }) => {
  return (
    <>
      <Head>
        <meta charSet='utf-8'></meta>
        <title>Node Bird</title>
      </Head>
      <Component></Component>
    </>
  );
};

NodeBird.propTypes = {
  Component: propTypes.elementType.isRequired,
};
export default NodeBird;
