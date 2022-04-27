import React from 'react';
import { isPlayerNameValid } from './GameContext';


const PlayerName: React.FunctionComponent = () => {

    let showError : boolean = false;

    if(!isPlayerNameValid()){
        showError = true;
    }
 
    return(
        <div className='name-form'>
           <div className='pname'>
               {showError? (
                <p>Set Player name to start the game:<br></br>
                Player name must be between 3 and 30 characters</p>):(<p></p>)}
           </div>
        </div>
  );
}

export default PlayerName;