import React from "react";
import { Router } from "react-router-dom";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { rest } from "msw";
import { setupServer } from "msw/node";

import App from "./App";

const BASE_URL = 'http://localhost:8080';
const questions = [
  {
    answers: [
      "test-answer-1",
      "test-answer-2",
      "test-answer-3",
      "test-answer-4",
    ],
    category: "geography",
    correctAnswer: 0,
    question: "test-question-1",
  },
  {
    answers: [
      "test-answer-1",
      "test-answer-2",
      "test-answer-3",
      "test-answer-4",
    ],
    category: "geography",
    correctAnswer: 0,
    question: "test-question-2",
  },
];

const players = [
  {
    category: "geography",
    correctAnswers: 0,
    name: "usuario-test-1",
    _id: "abc",
  },
  {
    category: "geography",
    correctAnswers: 5,
    name: "usuario-test-2",
    _id: "def",
  },
];

const server = setupServer(
  rest.get(`${BASE_URL}/questions/:category`, (req, res, ctx) => {
    return res(ctx.json({ questions }));
  }),
  rest.post(`${BASE_URL}/player`, (req, res, ctx) => {
    return res(ctx.json({ player: players[0] }));
  }),
  rest.get(`${BASE_URL}/players/:category`, (req, res, ctx) => {
    return res(ctx.json({ players }));
  })
);

describe("<App />", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("should fetch questions", async () => {
    const history = createMemoryHistory();
    history.push("/");
    const { getByTestId, getAllByTestId } = render(
      <Router history={history}>
        <App />
      </Router>
    );

    expect(getByTestId("home")).toBeInTheDocument();
    fireEvent.click(getByTestId("play-button"));
    fireEvent.click(getAllByTestId("answer-button")[0]); // select category
    await waitFor(() => expect(getByTestId("trivia")).toBeInTheDocument());
    expect(getByTestId("question-card").textContent).toBe("test-question-1");
  });

  it("should save the user at the end of the game and show the ordered table of positions with the current player selected", async () => {
    const history = createMemoryHistory();
    history.push("/");
    const { getByTestId, getAllByTestId } = render(
      <Router history={history}>
        <App />
      </Router>
    );

    expect(getByTestId("home")).toBeInTheDocument();
    fireEvent.click(getByTestId("play-button"));
    fireEvent.click(getAllByTestId("answer-button")[0]); // select category
    await waitFor(() => expect(getByTestId("trivia")).toBeInTheDocument());
    fireEvent.click(getAllByTestId("answer-button")[0]); // next question
    fireEvent.click(getAllByTestId("answer-button")[0]); // next question. finish game.
    await waitFor(
      () => expect(getByTestId("positions-table")).toBeInTheDocument(),
      { timeout: 3000 }
    );
    expect(getByTestId("table-body").childNodes[0].textContent).toBe(
      "1usuario-test-25"
    ); // position/userName/correctsAnswers
    expect(getByTestId("table-body").childNodes[1].textContent).toBe(
      "2usuario-test-10"
    ); // position/userName/correctsAnswers
    expect(getByTestId("table-body").childNodes[1].className).toBe(
      "is-selected"
    ); // current player
  });
});
