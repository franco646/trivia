import React from "react";
import PropTypes from "prop-types";

import style from "./ProgressBar.module.scss";

const ProgressBar = ({ value, className }) => {
  return (
    <progress
      className={`progress ${style.ProgressBar} ${className}`}
      max="100"
      value={value}
    />
  );
};

ProgressBar.defaultProps = {
  value: 0,
  className: "",
};

ProgressBar.propTypes = {
  value: PropTypes.number,
  className: PropTypes.string,
};

export default ProgressBar;
