import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import ProgressBar from "../../components/ProgressBar/ProgressBar";
import Card from "../../components/Card/Card";
import Box from "../../components/Box/Box";
import Subtittle from "../../components/SubTittle/SubTittle";
import AnswerSelector from "../../components/AnswerSelector/AnswerSelector";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

import styles from "./Trivia.module.scss";

const Trivia = ({ questions, category, timeLimit, onFinishGame }) => {
  const [loading, setLoading] = useState(true);
  const [actualQuestion, setActualQuestion] = useState(null);
  const [timer, setTimer] = useState(timeLimit);
  const [counter, setCounter] = useState(1);
  const [correctsAnswers, setCorrectsAnswers] = useState(0);

  let timeOut;

  useEffect(() => {
    if (questions) {
      if (counter > questions.length) {
        setLoading(true);
        return onFinishGame(correctsAnswers);
      }
      if (timer <= 0) {
        return nextAnswer();
      }
      setActualQuestion(questions[counter - 1]);
      setLoading(false);
      timeOut = timer > 0 && setInterval(() => setTimer(timer - 1), 1000);
      return () => clearInterval(timeOut);
    }
  }, [questions, timer]);

  const selectedAnswerHandler = (index) => {
    if (index === actualQuestion.correctAnswer) {
      setCorrectsAnswers(correctsAnswers + 1);
    }
    nextAnswer();
  };

  const nextAnswer = () => {
    setCounter(counter + 1);
    setTimer(timeLimit);
  };

  return !loading ? (
    <Card className={styles.Card} testId="trivia">
      <ProgressBar
        className={styles.ProgressBar}
        value={(100 / timeLimit) * timer}
      />
      <Subtittle className={styles.Scoreboard} testId="counter">
        {category} {counter}/{questions.length}
      </Subtittle>
      <Box className={styles.CardContent}>
        <Box className={styles.QuestionCard} testId="question-card">
          <Subtittle className={styles.QuestionText}>
            {actualQuestion.question}
          </Subtittle>
        </Box>
        <AnswerSelector
          answers={actualQuestion.answers}
          onSelect={selectedAnswerHandler}
        />
      </Box>
    </Card>
  ) : (
    <LoadingSpinner />
  );
};

Trivia.defaultProps = {
  timeLimit: 15,
};

Trivia.propTypes = {
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      question: PropTypes.string,
      answers: PropTypes.arrayOf(PropTypes.string),
      correctAnswer: PropTypes.number,
    })
  ),
  category: PropTypes.string,
  timeLimit: PropTypes.number,
  onFinishGame: PropTypes.func,
};

export default Trivia;
