import { Outlet, Link } from "react-router-dom";
import { useState } from 'react';
import Information from './Information';
import Options from './Options';
import world from '../scripts/room';
import '../styles/play.css';

function Game() {

  const [worldState, setWorldData] = useState(world);

  const handleChange = (e) => {

    // This is a little hacky, could I somehow return just what changes? or have choosePath() change the state of worldData instead of world?
    world.choosePath(e);
    setWorldData( (prevData) => ({...world }) );
  }

  let paths = worldState.currentRoom.paths;

  return (
    <div id="playScreen">
      <h1><Link id="backToTitle" to='/'>Old Cove</Link></h1>
      <Information world={worldState}/>
      <Options options={paths} handleChange={handleChange}/>
    </div>
  )
}

export default Game;