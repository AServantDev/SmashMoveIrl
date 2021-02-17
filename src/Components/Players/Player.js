import React, { useContext } from "react";
import { Card, CardBody, CardText, CardTitle } from "reactstrap";
import { GameContext, PlayersContext } from "../../App";
import Button from "../Button/Button";
import "./Players.css";

export default function Player(props) {
  const { isStarted, addScore, activePlayer } = useContext(GameContext);
  const { players } = useContext(PlayersContext);
  console.log(isStarted);
  return (
    <div className=" player">
      <Card className="card">
        <CardBody>
          <CardTitle tag="h5">{props.player}</CardTitle>
          <CardText className="list-group-item">Score: {props.score}</CardText>
        </CardBody>
        {isStarted && players[activePlayer].id !== props.id && (
          <Button content="Score!" method={() => addScore(props.id)}></Button>
        )}
      </Card>
    </div>
  );
}
