import React from "react";
import PropTypes from "prop-types";

const TextInput = function ({ text }) {
  return <div>{text}</div>;
};

TextInput.propTypes = {
  text: PropTypes.string.isRequired,
};

export default TextInput;
