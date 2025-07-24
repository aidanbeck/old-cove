import { Outlet, Link } from "react-router-dom";
import { useState } from 'react';
import Information from './Information';
import Options from './Options';
import world from '../scripts/story';
import '../styles/play.css';

function Game() {

  const [worldState, setWorldData] = useState(world);

  const handleChange = (type, value) => {

    // am I understanding best practice? this feels hacky.
    // maybe I should have had a handleChange or handleClick function within each component.
    // will change if time allows.
    
    if (type == "option") {
      world.choosePath(value);
    }

    if (type == "location") {
      world.moveTo(value);
    }

    if (type == "item") {
      world.describeItem(value);
    }
    
    setWorldData( {...world } );
  }

  return (
    <div id="playScreen">
      <h1><Link id="backToTitle" to='/'>Old Cove</Link></h1>
      <Information world={worldState} handleChange={handleChange}/>
      <Options world={worldState} handleChange={handleChange}/>
    </div>
  )
}

export default Game;