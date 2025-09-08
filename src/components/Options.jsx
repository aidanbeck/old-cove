function Options(props) {

  let { world, handleChange } = props;
  let paths = world.getPaths();

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


    /* Create string of requirements */
    let requiredItemStrings = [];
    for (let item of path.requiredItems) {
      requiredItemStrings.push(world.items[item].name);
    }
    for (let item of path.takenItems) {
      requiredItemStrings.push(world.items[item].name);
    }
    let requirementsList = [];
    for (let i = 0; i < requiredItemStrings.length; i++) {
      requirementsList.push(requiredItemStrings[i]);
      let isLastItem = i == requiredItemStrings.length - 1;
      let isOnlyItem = requiredItemStrings.length == 1;
      if (!isLastItem && !isOnlyItem ) { // if item isn't the last, and isn't the only
        requirementsList.push(", ");
      }
    }


    /* Creates options with requirements. */
    let playerHasAllRequiredItems = world.playerHasItems(path.requiredItems);
    let playerHasAllTakenItems = world.playerHasItems(path.takenItems);
    if (playerHasAllRequiredItems && playerHasAllTakenItems) { // player has everything needed
      return <div key={index} className={optionClass} onClick={() => handleChange("option", index)}><span>Use {requirementsList}.</span><hr/> {path.buttonPrompt}</div>;
    } else { // player doesn't have a required item, they should come back.
      lockedOptionsJSX[lockedOptionsJSX.length] = <div key={index} className={optionClass + " locked"}><span>Requires {requirementsList}.</span><hr/> {path.buttonPrompt}</div>;
      return;
    }
    
  });

  return (
    <div id="options">
      {optionsJSX}
      {lockedOptionsJSX}
    </div>
  );
}

export default Options;