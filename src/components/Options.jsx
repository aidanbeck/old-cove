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
    let playerHasGivenItem = world.inventory.includes(path.givenItem);
    let optionLimitHit = path.limit <= 0;
    if (playerHasGivenItem || optionLimitHit) { // cross out the element.
      lockedOptionsJSX[lockedOptionsJSX.length] = <div key={index} className={optionClass + " locked"}><strike>{path.buttonPrompt}</strike></div>;
      return;
    }

    /* Creates options that are normal */
    let playerDoesntNeedItem = path.requiredItem == '';
    if (playerDoesntNeedItem) {
      return <div key={index} className={optionClass} onClick={() => handleChange("option", index)}>{path.buttonPrompt}</div>
    }

    /* Creates options with requirements. */
    let playerHasNeededItem = world.inventory.includes(path.requiredItem);
    if (playerHasNeededItem) { 
      return <div key={index} className={optionClass} onClick={() => handleChange("option", index)}><span>Use {path.requiredItem.name}.</span><hr/> {path.buttonPrompt}</div>;
    } else { // player doesn't have a required item, they should come back.
      lockedOptionsJSX[lockedOptionsJSX.length] = <div key={index} className={optionClass + " locked"}><span>Requires {path.requiredItem.name}.</span><hr/> {path.buttonPrompt}</div>;
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