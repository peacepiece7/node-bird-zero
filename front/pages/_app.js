// ref 1
import React from "react";
import propTypes from "prop-types";
import "antd/dist/antd.css";
// ref 2
import Head from "next/head";
import wrapper from "../store/configureStore";

const NodeBird = ({ Component }) => {
  console.log(process.env.NODE_ENV);
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Node Bird</title>
      </Head>
      <Component />
    </>
  );
};

NodeBird.propTypes = {
  Component: propTypes.elementType.isRequired,
};

export default wrapper.withRedux(NodeBird);

// 1. 공통으로 적용해야하는 파일은 _app.js에 작성 (Dependency Injection)

// 2. Head 수정 (page마다 head가 다르다면, 해당 page마다 Head를 따로 작성
