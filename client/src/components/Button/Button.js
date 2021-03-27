import React from "react";
import PropTypes from "prop-types";

import "./Button.scss";

const Button = ({ children, className, onClick, testId }) => {
  return (
    <button
      className={`button ${className}`}
      onClick={onClick}
      data-testid={testId}
    >
      {children}
    </button>
  );
};

Button.defaultProps = {
  children: null,
  className: "",
  onClick: null,
  testId: "",
};

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func,
  testId: PropTypes.string,
};

export default Button;
