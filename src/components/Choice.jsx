
function itemIcons(itemStrings) {

    if (itemStrings.length < 1) { return ""; }

    let iconString = "";

    for (let itemString of itemStrings) {
        iconString += Array.from(itemString)[0]; // huh? itemString.charAt(0) doesn't work.
    }

    return iconString;
}


// ⏮  other contenders: ↩◀⮜

function Choice(props) {

    let { index, prompt, requiredItems, takenItems, faded, crossedOut, wide, rewind, handleChange } = props;


    let promptJSX = <span>{prompt}</span>
    let icons = itemIcons(requiredItems) + itemIcons(takenItems);
    let classes = "option";

    crossedOut && (promptJSX = <span style={{ textDecoration: 'line-through' }}>{prompt}</span>);
    wide && (classes += " finalOption");
    faded && (classes += " locked");
    rewind && (icons += " ⏮ ");

    return (
        <div id="choice" className={classes} onClick={() => handleChange("option", index)}>
            {icons} {promptJSX}          
        </div>
    );
}

export default Choice;