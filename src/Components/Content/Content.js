import React, { useState, useContext } from "react";
import "./Content.css";
import AddPlayers from "../Players/AddPlayer";
import Players from "../Players/Players";
import Button from "../Button/Button";
import { GameContext, PlayersContext } from "../../App";
import { Link } from "react-router-dom";

const Content = () => {
  const { players } = useContext(PlayersContext);
  const {startGame} = useContext(GameContext)

  return (
    <div className="content">
      
      <div>
        <AddPlayers />
      </div>
      <div className="players">
        <Players />
      </div>
      {players.length >= 2 && <Link to='/game'><Button content="let's play!" method={startGame} /></Link>}
    </div>
  );
};

export default Content;
