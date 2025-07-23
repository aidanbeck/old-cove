import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Game from './components/Game';
import Title from './components/Title';

import './App.css';
import './styles/responsive.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="" element={<Title />}/>
        <Route path="/play" element={<Game />}/>
      </Routes>
    </Router>
  )
}

export default App;