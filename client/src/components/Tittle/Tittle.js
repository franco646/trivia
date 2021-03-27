import React from "react";
import PropTypes from "prop-types";

const Tittle = ({ className, children }) => {
  return <h1 className={`tittle ${className}`}>{children}</h1>;
};

Tittle.defaultProps = {
  children: null,
  className: "",
};

Tittle.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Tittle;
