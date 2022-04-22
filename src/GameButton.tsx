import React from 'react';
import { P1, P2 } from './GameUtil';

interface Props {
    text: string;
    row: number;
    col: number;
}

const GameButton: React.FunctionComponent<Props> = (props) => {
  let buttonName = "gameButton";
  if(props.text === P1){
    buttonName = "gameButtonP1"
  }else if(props.text === P2){
    buttonName = "gameButtonP2";
  }
    return (
        <button className={buttonName}></button>
        );
    
  }

  export default GameButton;