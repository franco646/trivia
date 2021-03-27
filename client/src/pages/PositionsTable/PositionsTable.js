import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import Card from "../../components/Card/Card";
import Tittle from "../../components/Tittle/Tittle";
import Box from "../../components/Box/Box";
import Table from "../../components/Table/Table";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

import styles from "./PositionsTable.module.scss";

const PositionsTable = ({
  onFetchPlayers,
  players,
  tableHeaders,
  category,
  playerId,
}) => {
  const [loading, setLoading] = useState(true);
  const [tableContents, setTableContents] = useState(null);
  const [playerIndex, setPlayerIndex] = useState(null);

  useEffect(() => {
    if (!players) {
      return onFetchPlayers();
    }
    const playersToArray = players.map((player, index) => {
      return [index + 1, player.name, player.correctAnswers];
    });
    const currentPlayerIndex = players.findIndex((player) => {
      return player._id === playerId;
    });
    setPlayerIndex(currentPlayerIndex);
    setTableContents(playersToArray);
    setLoading(false);
  }, [players]);

  return !loading ? (
    <Card className={styles.Card} testId="positions-table">
      <Box className={styles.CardContent}>
        <Tittle className={styles.Tittle}>{category}</Tittle>
        <Table
          selectedRow={playerIndex}
          className={styles.Table}
          headers={tableHeaders}
          contents={tableContents}
        />
      </Box>
    </Card>
  ) : (
    <LoadingSpinner />
  );
};

PositionsTable.propTypes = {
  onFetchPlayers: PropTypes.func,
  players: PropTypes.array,
  tableHeaders: PropTypes.array,
  category: PropTypes.string,
  playerId: PropTypes.string,
};

export default PositionsTable;
