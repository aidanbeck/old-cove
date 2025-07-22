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
        <div id="description">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugit ex iusto qui maiores. Rerum consequuntur a, debitis quisquam modi nostrum excepturi magnam. Voluptatum ab numquam aut incidunt deserunt nemo reprehenderit.
        Suscipit accusamus atque odit doloremque laborum minus commodi tempora amet eveniet nulla quo numquam illo at facere dolorem sint inventore corrupti exercitationem, vel voluptate aperiam dolorum impedit temporibus officia? Aspernatur?
        Debitis, cumque ratione! Adipisci quam nulla rem dolorum commodi, facilis, quia et nisi recusandae harum deleniti accusamus provident, perferendis ullam repellendus temporibus. Nisi quaerat facere sit modi minima eius perspiciatis.</div>
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