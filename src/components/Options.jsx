function Options(props) {

  let { world, handleChange } = props;
  let paths = world.getCurrentPaths();

  let lockedOptionsJSX = []; // jsx for unselectable options.
  let optionsJSX = paths.map( (path, index) => {

    /* This block lets css handle an odd number of options by adding the 'finalOption' class */
    let optionClass = "option"; // Set the default class to 'option'
    if (paths.length % 2 !== 0 && index == 0) { // if this is the first of an odd number of options,
      optionClass = "option finalOption"; // add the 'finalOption' class.
    }

    /* Creates options that are crossed out */
    let playerHasAllGivenItems = world.playerHasItems(path.givenItems);
    // !!! I should add another way for elements to be crossed out, emulating the "limit" feature, but with signals!
    if (playerHasAllGivenItems && path.givenItems.length > 0) { // cross out the element.
      lockedOptionsJSX[lockedOptionsJSX.length] = <div key={index} className={optionClass + " locked"}><strike>{path.buttonPrompt}</strike></div>;
      return;
    }

    /* Creates options that are normal */
    let playerDoesntNeedItem = path.requiredItems.length == 0 && path.takenItems.length == 0;
    if (playerDoesntNeedItem) {
      return <div key={index} className={optionClass} onClick={() => handleChange("option", index)}>{path.buttonPrompt}</div>
    }

    /* Creates options with requirements. */
    let playerHasAllRequiredItems = world.playerHasItems(path.requiredItems);
    let playerHasAllTakenItems = world.playerHasItems(path.takenItems);
    if (playerHasAllRequiredItems && playerHasAllTakenItems) { // player has everything needed
      return <div key={index} className={optionClass} onClick={() => handleChange("option", index)}><span>Use {path.requiredItems[0]}.</span><hr/> {path.buttonPrompt}</div>;
    } else { // player doesn't have a required item, they should come back.
      lockedOptionsJSX[lockedOptionsJSX.length] = <div key={index} className={optionClass + " locked"}><span>Requires {path.requiredItems[0]}.</span><hr/> {path.buttonPrompt}</div>;
      return;
    }
    // !!! this displays path.requiredItems[0] for testing, but it should not in release! This block needs to account for multiple items, some required and some taken
    // it also needs to use the item key to get the actual item!
    
  });

  return (
    <div id="options">
      {optionsJSX}
      {lockedOptionsJSX}
    </div>
  );
}

export default Options;