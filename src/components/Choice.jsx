
function ItemList({items, entryWord}) {

    if (items.length == 0) {
        entryWord = "";
    }

    return (
        <span>
            {/* <hr/> */}
            {entryWord}
            {items}
            {/* <hr/> */}
        </span>
    );
    // !!! needs commas between requirements and a period to end it.
}

function Choice(props) {

    let { prompt, requiredItems, takenItems, givenItems, faded, crossedOut, wide, handleChange } = props;


    let promptJSX = <div>{prompt}</div>
    crossedOut && (promptJSX = <div style={{ textDecoration: 'line-through' }}>{prompt}</div>);

    let classes = "option";
    wide && (classes += " finalOption");
    faded && (classes += " locked");


    /*
        Button Format:

        Uses required item 1
             required item 2
        Takes taken item 1
              taken item 2
        Button Prompt
        Gives given item 1
              given item 2
    */

    /*
        Alternate Format:

        XXX Button Prompt

        Icons are the first character of each required or taken item
        It doesn't differentiate between the two, so wording would have to suffice
        but this could look a lot cleaner.
    */

    // TODO use handleChange on click
    // might need to recieve index as a prop to know what self is when clicked

    return (
        <div id="choice" className={classes}>
            <ItemList items={requiredItems} entryWord="Requires "/>
            <ItemList items={takenItems} entryWord="Use "/>
            {promptJSX}          
        </div>
    );
}

export default Choice;