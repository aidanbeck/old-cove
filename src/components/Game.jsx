import { Outlet, Link } from "react-router-dom";
import Information from './Information';
import Options from './Options';

import world from '../scripts/room';

import '../styles/play.css';

function Game() {

  let paths = world.currentRoom.paths;

  return (
    <div id="playScreen">
      <h1><Link id="backToTitle" to='/'>Old Cove</Link></h1>
      <Information world={world}/>
      <Options options={paths}/>
    </div>
  )
}

export default Game;