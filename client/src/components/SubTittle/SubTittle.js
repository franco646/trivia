import React from "react";
import PropTypes from "prop-types";

const SubTittle = ({ children, className, testId }) => {
  return (
    <h2 className={`subtitle ${className}`} data-testid={testId}>
      {children}
    </h2>
  );
};

SubTittle.defaultProps = {
  children: null,
  className: "",
  testId: "",
};

SubTittle.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  testId: PropTypes.string,
};

export default SubTittle;
