import React from "react";
import { render } from "@testing-library/react";

import PositionsTable from "../PositionsTable/PositionsTable";

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

describe("<PositionsTable />", () => {
  it("should show loading spinner", () => {
    const onFetchPlayers = jest.fn();
    const { getByTestId } = render(
      <PositionsTable onFetchPlayers={onFetchPlayers} />
    );

    expect(getByTestId("loading-spinner")).toBeInTheDocument();
  });

  it("should fetch players", () => {
    const onFetchPlayers = jest.fn();
    render(<PositionsTable onFetchPlayers={onFetchPlayers} />);
    expect(onFetchPlayers).toHaveBeenCalledTimes(1);
  });

  it("should include the category in the title", () => {
    const { getByText } = render(
      <PositionsTable players={players} category="geography" />
    );

    expect(getByText("geography")).toBeInTheDocument();
  });

  it("should convert the list to an array and map the table", () => {
    const { getByTestId } = render(<PositionsTable players={players} />);

    expect(getByTestId("table-body").childNodes).toHaveLength(2);
  });

  it("should find the index of the current player and add the selected class", () => {
    const { getByTestId } = render(
      <PositionsTable players={players} playerId="def" />
    );

    expect(getByTestId("table-body").childNodes[1].className).toBe(
      "is-selected"
    );
  });
});
