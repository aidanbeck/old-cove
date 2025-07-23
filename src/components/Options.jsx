function Options(props) {

  let world = props.world;
  let options = world.currentRoom.paths;

  let optionsJSX = options.map( (option, index) => {

    let playerHasGivenItem = world.inventory.includes(option.giveItem);
    if (playerHasGivenItem) { // player already has the item. cross out the element.
      return <div key={index} className="option locked"><strike>{option.prompt}</strike></div>;
    }

    let playerDoesntNeedItem = option.require == '';
    if (playerDoesntNeedItem) { // normal path
      return <div key={index} className="option" onClick={() => props.handleChange("option", index)}>{option.prompt}</div>
    }

    let playerHasNeededItem = world.inventory.includes(option.require);
    if (playerHasNeededItem) { // player doesn't have a required item, they should come back.
      return <div key={index} className="option" onClick={() => props.handleChange("option", index)}><span>{option.require}</span><hr/> {option.prompt}</div>;
    } else {
      return <div key={index} className="option locked"><span>Requires {option.require}</span><hr/> {option.prompt}</div>;
    }

    

    
  });

  return (
    <div id="options">
      {optionsJSX}
    </div>
  );
}

export default Options;