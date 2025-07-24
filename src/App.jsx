import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Title from './components/Title';
import About from './components/About';
import Game from './components/Game';

import './App.css';
import './styles/responsive.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="" element={<Title />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/play" element={<Game />}/>
      </Routes>
    </Router>
  )
}

export default App;