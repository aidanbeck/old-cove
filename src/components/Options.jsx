function Options(props) {

  let world = props.world;
  let options = world.currentRoom.paths;

  let optionsJSX = options.map( (option, index) => {

    let optionClass = "option";
    if (options.length % 2 !== 0 && index == 0) { //is the first option of an odd number of options
      optionClass = "option finalOption";
    }

    let playerHasGivenItem = world.inventory.includes(option.giveItem);
    if (playerHasGivenItem) { // player already has the item. cross out the element.
      return <div key={index} className={optionClass + " locked"}><strike>{option.prompt}</strike></div>;
    }

    let playerDoesntNeedItem = option.require == '';
    if (playerDoesntNeedItem) { // normal path
      return <div key={index} className={optionClass} onClick={() => props.handleChange("option", index)}>{option.prompt}</div>
    }

    let playerHasNeededItem = world.inventory.includes(option.require);
    if (playerHasNeededItem) { 
      return <div key={index} className={optionClass} onClick={() => props.handleChange("option", index)}><span>use {option.require.string}</span><hr/> {option.prompt}</div>;
    } else { // player doesn't have a required item, they should come back.
      return <div key={index} className={optionClass + " locked"}><span>Requires {option.require.string}</span><hr/> {option.prompt}</div>;
    }
    
  });

  return (
    <div id="options">
      {optionsJSX}
    </div>
  );
}

export default Options;