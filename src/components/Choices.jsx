import Choice from './Choice';

function Choices(props) {

    let { paths, items, playerHasItems, playerHasSignals, handleChange } = props;

    let buttonPromptsJSX = paths.map( (path, index) => {
        

        let prompt = path.buttonPrompt;

        let requiredItemStrings = getItemStrings(path.requiredItems, items);
        let takenItemStrings = getItemStrings(path.takenItems, items);

        // fade out if player does not have required/taken items.
        let faded = !playerHasItems(path.requiredItems) || !playerHasItems(path.takenItems);

        let crossedOut = 
        playerHasItems(path.givenItems)
        || playerHasSignals(path.givenSignals)
        || !playerHasSignals(path.takenSignals);
        
        // already has given items
        // already has given signals
        // doesn't have taken signals
        // needs a hasItems & hasSignals function !!

        let wide = paths.length % 2 !== 0 && index == paths.length - 1; // widen if option is the last of an odd number.

        return <Choice 
            key={index}
            prompt={prompt}
            requiredItems={requiredItemStrings}
            takenItems={takenItemStrings}
            faded={faded}
            crossedOut={crossedOut}
            wide={wide}
            handleChange={handleChange}
        />
    });

    return (
        // <div id="choices">
        <div id="options">
            {buttonPromptsJSX}
        </div>
    );
    
}

function getItemStrings(itemList, worldItems) {
    return itemList.map( ( item ) => {
        return worldItems[item].name;
    });
}

export default Choices;