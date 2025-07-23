import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Information from './components/Information';
import Options from './components/Options';

import './App.css';

function App() {
  return (
    <>
      <h1>Old Cove</h1>
      <Information />
      <Options />
    </>
  )
}

export default App;