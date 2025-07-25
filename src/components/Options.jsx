function Options(props) {

  let { world, handleChange } = props;
  let options = world.currentRoom.paths;

  let lockedJSX = []; // jsx for unselectable options.
  let optionsJSX = options.map( (option, index) => {

    /* This block lets css handle an odd number of options by adding the 'finalOption' class */
    let optionClass = "option"; // Set the default class to 'option'
    if (options.length % 2 !== 0 && index == 0) { // if this is the first of an odd number of options,
      optionClass = "option finalOption"; // add the 'finalOption' class.
    }

    /* Creates options that are crossed out */
    let playerHasGivenItem = world.inventory.includes(option.giveItem);
    let optionLimitHit = option.limit <= 0;
    if (playerHasGivenItem || optionLimitHit) { // player already has the item. cross out the element.
      lockedJSX[lockedJSX.length] = <div key={index} className={optionClass + " locked"}><strike>{option.prompt}</strike></div>;
      return;
    }

    /* Creates options that are normal */
    let playerDoesntNeedItem = option.require == '';
    if (playerDoesntNeedItem) {
      return <div key={index} className={optionClass} onClick={() => handleChange("option", index)}>{option.prompt}</div>
    }

    /* Creates options with requirements. */
    let playerHasNeededItem = world.inventory.includes(option.require);
    if (playerHasNeededItem) { 
      return <div key={index} className={optionClass} onClick={() => handleChange("option", index)}><span>Use {option.require.string}.</span><hr/> {option.prompt}</div>;
    } else { // player doesn't have a required item, they should come back.
      lockedJSX[lockedJSX.length] = <div key={index} className={optionClass + " locked"}><span>Requires {option.require.string}.</span><hr/> {option.prompt}</div>;
      return;
    }
    
  });

  return (
    <div id="options">
      {optionsJSX}
      {lockedJSX}
    </div>
  );
}

export default Options;