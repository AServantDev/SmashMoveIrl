import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { PlayersContext, GameContext } from "../../App";
import Button from "../Button/Button";
import Players from "../Players/Players";

const GamePage = (props) => {
  const { players } = useContext(PlayersContext);
  const { chooseMoves, activePlayer, loseScore, pickedMoves } = useContext(
    GameContext
  );
  console.log(players[activePlayer]);

  if (players.length < 2) {
    return (
      <div>
        You have to add at least 2 players before start!!
        <Link to="/">Let's go!</Link>
      </div>
    );
  } else {
    return (
      <div>
        <div>It's your turn {players[activePlayer].player}</div>
        <div className="players">
          <Players />
        </div>
        <Button method={chooseMoves} content="Pick a move!"></Button>
        {pickedMoves.length !== 0 && (
          <div>
            <div>
              Your move is {pickedMoves[pickedMoves.length - 1].character},
              {pickedMoves[pickedMoves.length - 1].move}
            </div>
            <Button method={loseScore} content="No one guessed?"></Button>
          </div>
        )}
      </div>
    );
  }
};

export default GamePage;
