import React, { useState } from "react";
import PropTypes from "prop-types";

import Card from "../../components/Card/Card";
import Box from "../../components/Box/Box";
import Tittle from "../../components/Tittle/Tittle";
import Subtittle from "../../components/SubTittle/SubTittle";
import NameSelector from "../../components/NameSelector/NameSelector";
import AnswerSelector from "../../components/AnswerSelector/AnswerSelector";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

import styles from "./Home.module.scss";

const Home = ({ onPlay, categories }) => {
  const [userName, setUserName] = useState("Usuario anonimo");
  const [subtittle, setSubtittle] = useState("Ingrese su nombre");
  const [showCategories, setShowCategories] = useState(false);
  const [loading, setLoading] = useState(false);

  const changeNameHandler = (e) => {
    setUserName(e.target.value);
  };

  const clickPlayHandler = () => {
    setShowCategories(true);
    setSubtittle("Seleccione una categoria");
  };

  const selectCategoryHandler = (index) => {
    setLoading(true);
    const selectedCategory = categories[index];
    onPlay(userName, selectedCategory);
  };

  return !loading ? (
    <Card className={styles.Card} testId="home">
      <Box className={styles.CardContent}>
        <Tittle className={styles.Tittle}>TRIVIA</Tittle>
        <Subtittle className={styles.Subtittle} testId="label">
          {subtittle}
        </Subtittle>
        {showCategories ? (
          <AnswerSelector
            onSelect={selectCategoryHandler}
            answers={categories.map((category) => {
              return category.name;
            })}
          />
        ) : (
          <NameSelector
            onPlay={clickPlayHandler}
            onChangeName={changeNameHandler}
          />
        )}
      </Box>
    </Card>
  ) : (
    <LoadingSpinner />
  );
};

Home.propTypes = {
  onPlay: PropTypes.func,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
    })
  ),
};

export default Home;
