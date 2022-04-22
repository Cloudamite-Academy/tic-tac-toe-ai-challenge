import axios from "axios";
import React, { useCallback, useContext, useState } from "react";
import { getNextMove, PLAYER_NAME } from "./ai";
import { gameMove, getNextTurn, isWinning, P1, P2 } from "./GameUtil";

const PLAYER_NAME_MIN = 3;
const PLAYER_NAME_MAX = 30;

export function isPlayerNameValid() : boolean {
  if(PLAYER_NAME.length < PLAYER_NAME_MIN || PLAYER_NAME.length > PLAYER_NAME_MAX){
    return false;
  }
  return true;
}

export type GameState = {
    playerName: string;
    board: string[][];
    turn: string; //P1 or P2
    round: number;
    winner: string;
    gameOver: boolean;
  };
  
type GameContext = {
    playerName: string;
    board: string[][];
    turn: string; //P1 or P2
    round: number;
    winner: string;
    gameOver: boolean;
    nextMove: (col: number, row: number, player: string) => void;
    resetGame: () => void;
  };

type NextMoveRequest = {
  playerName: string;
  type: string;
  board: string [][];
};

//const URL = "http://127.0.0.1:8787/api/nextmove"
const URL = "https://tic-tac-toe-ai.cloudamite.workers.dev/api/nextmove"
  // isable warning for redecalaration
// eslint-disable-next-line 
const GameContext = React.createContext<Partial<GameContext>>({});

export const useGameContext = () => useContext(GameContext);

type GameContextProps = {
    children: React.ReactNode;
};

export const GameContextProvider: React.FunctionComponent<GameContextProps> = ({
    children
  }) => {

    let grid_gameover : string [][] = [['X', 'X', 'O'], ['X', 'X', 'X'], ['X', 'X', 'X']];
    let grid : string [][] = [['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9']];
    const playerName = PLAYER_NAME;
    const [turn, setTurn] = useState("");
    const [board, setBoard] = useState(grid_gameover);
    const [round, setRound] = useState(0);
    const [winner, setWinner] = useState("");
    const [gameOver, setGameOver] = useState(false);
    
    const nextMove = useCallback((row: number, col: number, player : string) => {
        board[row][col] = player;
        setBoard(board);        
        if(isWinning(board,P1)){
          setWinner(P1);
          setGameOver(true);
        }else if( round < 8){
          setRound(round +1);
          setTurn(getNextTurn(turn));
        } else {
          //P2 wins with tie
          let request : NextMoveRequest = {playerName: playerName, type: "ai",board: board};
          let body: string = JSON.stringify(request);
          axios.post(URL, body)
          .then(response => {
             setWinner(P2);
            setGameOver(true);
          });
        }
    },[board,round,turn,playerName]);

    React.useEffect(() => {
      if(turn === P1 && !gameOver){
        let request : NextMoveRequest = {playerName: playerName, type: "ai", board: board};
        let body: string = JSON.stringify(request);
        axios.post(URL, body)
          .then(response => {
            const move = response.data;
            nextMove(move.row,move.col,P1);
          });
      }else if (turn === P2 && !gameOver){
        const move : gameMove = getNextMove(board,round);
        nextMove(move.row,move.col,P2);
      }
    }, [turn,gameOver,board,nextMove,playerName,round]);

    const resetGame = () => {
      setBoard(grid);
      setTurn(P1);
      setRound(0);
      setWinner("");
      setGameOver(false);
    };

    if(isPlayerNameValid() && turn !== P1 && turn !== P2){
      resetGame();
    }

  return (
    <GameContext.Provider
      value={{
        board,
        turn,
        round,
        winner,
        gameOver,
        nextMove,
        resetGame
      }}
    >
      {children}
    </GameContext.Provider>
  );
  }