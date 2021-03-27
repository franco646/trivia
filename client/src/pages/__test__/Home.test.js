import React from "react";
import { render, fireEvent } from "@testing-library/react";

import Home from "../Home/Home";

const categories = [
  { name: "Geografia", value: "geography" },
  { name: "Historia", value: "history" },
  { name: "Deportes", value: "sports" },
  { name: "Entretenimiento", value: "entertainment" },
];

describe("<Home />", () => {
  it("should render <NameSelector/> and show message", () => {
    const { getByTestId } = render(<Home />);
    expect(getByTestId("name-selector")).toBeInTheDocument();
    expect(getByTestId("label").textContent).toContain("Ingrese su nombre");
  });

  it("should render <AnswerSelector/> and change the message when play is clicked", () => {
    const { getByTestId, queryByTestId } = render(
      <Home categories={categories} />
    );

    fireEvent.click(getByTestId("play-button"));

    expect(queryByTestId("name-selector")).not.toBeInTheDocument();
    expect(getByTestId("answer-selector")).toBeInTheDocument();
    expect(getByTestId("label").textContent).toContain(
      "Seleccione una categoria"
    );
  });

  it("should call onPlay function with parameters when category is selected", () => {
    const onPlay = jest.fn();
    const { getByTestId, getByText } = render(
      <Home categories={categories} onPlay={onPlay} />
    );

    fireEvent.change(getByTestId("name-input"), {
      target: { value: "test user" },
    });
    fireEvent.click(getByTestId("play-button"));
    fireEvent.click(getByText(/Geografia/i));

    expect(onPlay).toHaveBeenCalledTimes(1);
    expect(onPlay).toHaveBeenCalledWith("test user", {
      name: "Geografia",
      value: "geography",
    });
  });
});
