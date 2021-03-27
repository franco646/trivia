import React from "react";
import PropTypes from "prop-types";

const Box = ({ children, className, onClick, testId }) => {
  return (
    <div className={`box ${className}`} onClick={onClick} data-testid={testId}>
      {children}
    </div>
  );
};

Box.defaultProps = {
  children: null,
  className: "",
  onClick: null,
  testId: "",
};

Box.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func,
  testId: PropTypes.string,
};

export default Box;
