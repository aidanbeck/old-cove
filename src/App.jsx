import { useState } from 'react';
import './App.css';

function App() {
  return (
    <>
      <h1>Old Cove</h1>
      <div id="information">
        <div id="locations">
          <div class="location">the lighthouse</div>
          <div class="location">a sandy beach</div>
          <div class="location">ocean vista</div>
          <div class="location">ol' reliable</div>
        </div>
        <div id="description">Description</div>
        <div id="items">
          <div class="item">🔑 golden key</div>
          <div class="item">🪓 dull axe</div> 
          <div class="item">🔨 rusty hammer</div> 
          <div class="item">🩹 bandage</div> 
          <div class="item">🔦 torch</div> 
          <div class="item">📧 sealed letter</div> 
        </div>
      </div>
      
      <div id="options">
        <div class="option">Option 1</div>
        <div class="option">Option 2</div>

        <div class="option">Option 3</div>
        <div class="option">Option 4</div>
      </div>
      
    </>
  )
}

export default App;