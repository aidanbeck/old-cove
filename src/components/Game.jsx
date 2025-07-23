import { Outlet, Link } from "react-router-dom";
import Information from './Information';
import Options from './Options';

import '../styles/play.css';

const choices = [
  "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, totam!",
  "Lorem ipsum dolor sit.",
  "Lorem ipsum dolor sit amet consectetur.",
  "Lorem ipsum dolor sit amet.",
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, nemo animi."
]

function Game() {
  return (
    <div id="playScreen">
      <h1><Link id="backToTitle" to='/'>Old Cove</Link></h1>
      <Information />
      <Options options={choices}/>
    </div>
  )
}

export default Game;