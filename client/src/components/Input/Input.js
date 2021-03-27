import React from "react";
import PropTypes from "prop-types";

const Input = ({ type, placeholder, className, onChange, testId }) => {
  return (
    <input
      data-testid={testId}
      className={`input ${className}`}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

Input.defaultProps = {
  testId: "",
  className: "",
  type: "text",
  label: "",
  placeholder: "",
  onChange: null,
};

Input.propTypes = {
  testId: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};

export default Input;
