import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";

import Trivia from "../Trivia/Trivia";

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

describe("<Trivia />", () => {
  it("should show loading spinner", () => {
    const { getByTestId } = render(<Trivia />);

    expect(getByTestId("loading-spinner")).toBeInTheDocument();
  });

  it("should show question and anwers", () => {
    const { getByTestId } = render(<Trivia questions={questions} />);

    expect(getByTestId("question-card")).toBeInTheDocument();
    expect(getByTestId("question-card").textContent).toBe("test-question-1");
    expect(getByTestId("answer-selector")).toBeInTheDocument();
  });

  it("should change question when an answer is selected", async () => {
    const { getByTestId, getByText } = render(<Trivia questions={questions} />);

    fireEvent.click(getByText("test-answer-1"));
    await waitFor(() =>
      expect(getByTestId("question-card").textContent).toBe("test-question-2")
    );
  });

  it("should show the current question counter and change it when an answer is selected", () => {
    const { getByTestId, getByText } = render(
      <Trivia questions={questions} category="geography" />
    );

    expect(getByTestId("counter").textContent).toBe("geography 1/2");
    fireEvent.click(getByText("test-answer-1"));
    expect(getByTestId("counter").textContent).toBe("geography 2/2");
  });

  it("should change the question automatically when the time is up", async () => {
    const { getByTestId, getByText } = render(
      <Trivia questions={questions} timeLimit={1} />
    );

    expect(getByTestId("question-card").textContent).toBe("test-question-1");
    await waitFor(() => getByText("test-question-2"), { timeout: 3000 });
    expect(getByTestId("question-card").textContent).toBe("test-question-2");
  });

  it("should call onFinishGame function when the counter exceeds the number of questions", async () => {
    const onFinishGame = jest.fn();
    const { getByText, getByTestId } = render(
      <Trivia questions={questions} onFinishGame={onFinishGame} />
    );
    fireEvent.click(getByText("test-answer-1"));
    fireEvent.click(getByText("test-answer-1"));
    await waitFor(() => expect(onFinishGame).toHaveBeenCalledTimes(1), {
      timeout: 3000,
    });
    expect(onFinishGame).toHaveBeenCalledWith(2); //number of corrects answers
    expect(getByTestId("loading-spinner")).toBeInTheDocument();
  });
});
