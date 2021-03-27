import React from "react";
import PropTypes from "prop-types";

import Input from "../Input/Input";
import Button from "../Button/Button";
import Box from "../Box/Box";

import styles from "./NameSelector.module.scss";

const NameSelector = ({ onPlay, onChangeName }) => {
  return (
    <Box className={styles.NameSelector} testId="name-selector">
      <Input type="text" onChange={onChangeName} testId="name-input" />
      <Button onClick={onPlay} className="is-primary" testId="play-button">
        Jugar!
      </Button>
    </Box>
  );
};

NameSelector.defaultProps = {
  onPlay: null,
  onChangeName: null,
};

NameSelector.propTypes = {
  onPlay: PropTypes.func,
  onChangeName: PropTypes.func,
};

export default NameSelector;
