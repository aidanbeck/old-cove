
function itemIcons(itemStrings) {

    if (itemStrings.length < 1) { return ""; }

    let iconString = "";

    for (let itemString of itemStrings) {
        iconString += Array.from(itemString)[0]; // huh? itemString.charAt(0) doesn't work.
    }

    return iconString;
}

function Choice(props) {

    let { index, prompt, requiredItems, takenItems, givenItems, faded, crossedOut, wide, handleChange } = props;


    let promptJSX = <span>{prompt}</span>
    crossedOut && (promptJSX = <span style={{ textDecoration: 'line-through' }}>{prompt}</span>);

    let classes = "option";
    wide && (classes += " finalOption");
    faded && (classes += " locked");

    let icons = itemIcons(requiredItems) + itemIcons(takenItems);

    return (
        <div id="choice" className={classes} onClick={() => handleChange("option", index)}>
            {icons} {promptJSX}          
        </div>
    );
}

export default Choice;