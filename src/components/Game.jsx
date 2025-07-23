import { Outlet, Link } from "react-router-dom";
import Information from './Information';
import Options from './Options';

function Game() {
  return (
    <>
      <h1><Link to='/'>Old Cove</Link></h1>
      <Information />
      <Options />
    </>
  )
}

export default Game;