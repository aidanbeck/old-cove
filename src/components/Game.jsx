import { Outlet, Link } from "react-router-dom";
import Information from './Information';
import Options from './Options';

import '../styles/play.css';

function Game() {
  return (
    <div id="playScreen">
      <h1><Link id="backToTitle" to='/'>Old Cove</Link></h1>
      <Information />
      <Options />
    </div>
  )
}

export default Game;