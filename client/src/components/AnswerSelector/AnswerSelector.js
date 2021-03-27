import React from "react";
import PropTypes from "prop-types";

import Grid from "../Grid/Grid";
import Box from "../Box/Box";

import styles from "./AnswerSelector.module.scss";

const AnswerSelector = ({ answers, className, onSelect }) => {
  const elements = answers.map((answer, i) => {
    return (
      <Box
        className={styles.Box}
        onClick={() => onSelect(i)}
        testId="answer-button"
      >
        {answer}
      </Box>
    );
  });

  return elements ? (
    <Box className={className} testId="answer-selector">
      <Grid elements={elements} />
    </Box>
  ) : null;
};

AnswerSelector.defaultProps = {
  answers: [],
  className: "",
};

AnswerSelector.propTypes = {
  answers: PropTypes.array,
  className: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
};

export default AnswerSelector;
