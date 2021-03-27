import React from "react";

import styles from "./LoadingSpinner.module.scss";

const LoadingSpinner = () => {
  return <div className={styles.Loader} data-testid="loading-spinner" />;
};

export default LoadingSpinner;
