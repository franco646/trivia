import React from "react";
import PropTypes from "prop-types";

const Card = ({ children, className, testId }) => {
  return (
    <div className={`card ${className}`} data-testid={testId}>
      {children}
    </div>
  );
};

Card.defaultProps = {
  children: null,
  className: "",
};

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Card;
