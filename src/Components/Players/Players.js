import React, { useState, useContext } from "react";
import { PlayersContext } from "../../App";
import Player from "./Player";
import "./Players.css";

export default function Players() {
  const { players } = useContext(PlayersContext);

  return players.map((player) => {
    return (
      <div>
        <Player
          key={players.indexOf(player.name)}
          id={player.id}
          score={player.score}
          player={player.player}
        />
      </div>
    );
  });
}
