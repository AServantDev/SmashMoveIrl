import { useState, createContext } from "react";
import Content from "./Components/Content/Content";
import GamePage from "./Components/GamePage/GamePage";
import _ from "lodash";
import { Router, Route, Switch } from "react-router-dom";
import history from "./history";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

export const PlayersContext = createContext();
export const GameContext = createContext();

function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [turn, setTurn] = useState(0);
  const [players, setPlayers] = useState([]);
  const [pickedMoves, setPickedMoves] = useState([]);
  const [activePlayer, setActivePlayer] = useState(0);

  const addPlayers = (data) => {
    setPlayers((oldPlayers) => {
      return [...oldPlayers, { player: data.name, score: 0, id: uuidv4() }];
    });
  };

  const startGame = () => {
    setIsStarted(!isStarted);
  };

  const addScore = (winnerId) => {
    // const playerWinner = _.find(players, ["id", currentPlayerId])
    const playerIndex = players.findIndex((element) => element.id === winnerId);
    const newArray = [...players];
    newArray[playerIndex] = {
      ...newArray[playerIndex],
      score: newArray[playerIndex].score + 1,
    };
    console.log(activePlayer);
    newArray[activePlayer] = {
      ...newArray[activePlayer],
      score: newArray[activePlayer].score + 1,
    };

    setPlayers(newArray);
    if (activePlayer === players.length - 1) {
      setActivePlayer(0);
    } else {
      setActivePlayer(activePlayer + 1);
    }

    console.log(players.length);
  };

  const loseScore = () => {
    const newArray = [...players];
    newArray[activePlayer] = {
      ...newArray[activePlayer],
      score: newArray[activePlayer].score - 1,
    };
    setPlayers(newArray);
    if (activePlayer === players.length - 1) {
      setActivePlayer(0);
    } else {
      setActivePlayer(activePlayer + 1);
    }
  };

  const moves = [
    "up-smash",
    "side-smash",
    "down-smash",
    "side-tilt",
    "down-tilt",
    "up-tilt",
    "side-taunt",
    "up-taunt",
    "down-taunt",
    "side-B",
    "up-B",
    "down-B",
    "neutral-B",
    "jab",
  ];

  const characters = [
    "Mario",
    "Donkey Kong",
    "Link",
    "Samus",
    "Samus Sombre",
    "Yoshi",
    "Kirby",
    "Fox",
    "Pikachu",
    "Luigi",
    "Ness",
    "Captain Falcon",
    "Rondoudou",
    "Peach",
    "Daisy",
    "Bowser",
    "Ice Climbers",
    "Sheik",
    "Zelda",
    "Dr. Mario",
    "Pichu",
    "Falco",
    "Marth",
    "Lucina",
    "Link Enfant",
    "Ganondorf",
    "Mewtwo",
    "Roy",
    "Chrom",
    "Mr. Game & Watch",
    "Meta Knight",
    "Pit",
    "Pit Maléfique",
    "Samus Sans Armure",
    "Wario",
    "Snake",
    "Ike",
    "Carapuce",
    "Herbizarre",
    "Dracaufeu",
    "Diddy",
    "Lucas",
    "Sonic",
    "Roi Dadidou",
    "Olimar",
    "Lucario",
    "R.O.B.",
    "Link Cartoon",
    "Wolf",
    "Villageois",
    "Mega-Man",
    "Entraineuse Wii-Fit",
    "Harmonie et Luma",
    "Little Mac",
    "Amphinobi",
    "Boxeur Mii",
    "Épéiste Mii",
    "Tireur Mii",
    "Palutena",
    "Pac-Man",
    "Daraen",
    "Shulk",
    "Bowser Jr.",
    "Duo Duck Hunt",
    "Ryu",
    "Ken",
    "Cloud",
    "Corrin",
    "Bayonetta",
    "Inkling",
    "Ridley",
    "Simon",
    "Richter",
    "King K. Rool",
    "Marie",
    "Félinferno",
    "Plante Piranha",
    "Joker",
    "Hero",
    "Banjo",
    "Séphiroth",
    "Steve",
    "Terry",
    "Min-Min",
    "Byleth",
  ];

  const getRandomMove = () => {
    const currentMove = {
      move: moves[Math.floor(Math.random() * (moves.length - 1))],
      character:
        characters[Math.floor(Math.random() * (characters.length - 1))],
    };
    console.log(currentMove);

    return currentMove;
  };

  const chooseMoves = () => {
    const move = getRandomMove();
    const alreadyPicked = pickedMoves.some((element) => {
      return _.isEqual(element, move);
    });
    if (!alreadyPicked) {
      setPickedMoves((oldPickedMoves) => [...oldPickedMoves, move]);  
    } else {
      console.log("DOUBLE");
      chooseMoves();
    }
  };

  return (
    <div className="App">
      <div className="logoSmash">
        <img alt="logo Smash" src="images/SmashLogo.png"></img>
      </div>
      <Router history={history}>
        <GameContext.Provider
          value={{
            chooseMoves,
            pickedMoves,
            isStarted,
            startGame,
            addScore,
            activePlayer,
            loseScore,
          }}
        >
          <PlayersContext.Provider value={{ players, addPlayers }}>
            <Route path="/" exact component={Content} />
            <Route path="/game" exact component={GamePage} />
          </PlayersContext.Provider>
        </GameContext.Provider>
      </Router>
    </div>
  );
}

export default App;
