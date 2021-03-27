import React, { useState } from "react";
import { Switch, Route, useHistory, Redirect } from "react-router-dom";

import Home from "./pages/Home/Home";
import Trivia from "./pages/Trivia/Trivia";
import PositionsTable from "./pages/PositionsTable/PositionsTable";

import "./App.scss";

const App = () => {
  const [userName, setUserName] = useState(null);
  const [category, setCategory] = useState(null);
  const [questions, setQuestions] = useState(null);
  const [players, setPlayers] = useState(null);
  const [playerId, setPlayerId] = useState(null);

  const history = useHistory();

  const categories = [
    { name: "Geografia", value: "geography" },
    { name: "Historia", value: "history" },
    { name: "Ciencia", value: "science" },
    { name: "Entretenimiento", value: "entertainment" },
  ];
  const tableHeaders = ["Posición", "Nombre", "Preguntas correctas"];
  const numberOfQuestions = 20;
  const timeLimit = 15; // time in seconds
  const BASE_URL = "http://localhost:3000";

  const playHandler = async (selectedName, selectedCategory) => {
    const response = await fetch(
      `${BASE_URL}/questions/${selectedCategory.value}?limit=${numberOfQuestions}`
    );
    const fetchedQuestions = await response.json();
    setUserName(selectedName);
    setCategory(selectedCategory);
    setQuestions(fetchedQuestions.questions);
    history.push("/trivia");
  };

  const finishGameHandler = async (correctsAnswers) => {
    const response = await fetch(`${BASE_URL}/player`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: userName,
        category: category.value,
        correctAnswers: correctsAnswers,
      }),
    });
    const savedPlayer = await response.json();
    setPlayerId(savedPlayer.player._id);
    history.push("/positions");
  };

  const fetchPlayersHandler = async () => {
    const response = await fetch(`${BASE_URL}/players/${category.value}`);
    const fetchedPlayers = await response.json();
    const sortedPlayers = fetchedPlayers.players.sort(
      (a, b) => parseFloat(b.correctAnswers) - parseFloat(a.correctAnswers)
    );
    setPlayers(sortedPlayers);
  };

  return (
    <Switch>
      <Route exact path="/">
        <Home onPlay={playHandler} categories={categories} />
      </Route>
      <Route path="/trivia">
        {userName && category ? (
          <Trivia
            onFinishGame={finishGameHandler}
            category={category.name}
            questions={questions}
            timeLimit={timeLimit}
          />
        ) : (
          <Redirect to="/" />
        )}
      </Route>
      <Route path="/positions">
        {category ? (
          <PositionsTable
            playerId={playerId}
            category={category.name}
            tableHeaders={tableHeaders}
            players={players}
            onFetchPlayers={fetchPlayersHandler}
          />
        ) : (
          <Redirect to="/" />
        )}
      </Route>
    </Switch>
  );
};

export default App;
