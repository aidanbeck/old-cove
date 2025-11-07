import Choice from './Choice';
import '../../styles/choices.css';

function Choices(props) {

    let { paths, items, lastPosition, playerHasItems, playerHasSignals, handleChange } = props;

    let buttonPromptsJSX = paths.map( (path, index) => {
        

        let prompt = path.buttonPrompt;

        let requiredItemStrings = getItemStrings(path.requiredItems, items);
        let takenItemStrings = getItemStrings(path.takenItems, items);

        let crossedOut = 
        ( playerHasItems(path.givenItems) && path.givenItems.length > 0 ) // already has given items
        || ( playerHasSignals(path.givenSignals) && path.givenSignals.length > 0 )  // already has given signals
        || ( !playerHasSignals(path.takenSignals) && path.takenSignals.length > 0); // doesn't have taken signals

        // fade out if player does not have required/taken items.
        let faded = !playerHasItems(path.requiredItems) || !playerHasItems(path.takenItems) || crossedOut;
        
        // widen if option is the last of an odd number.
        let wide = paths.length % 2 !== 0 && index == paths.length - 1;

        // rewind if path's targetKey is the player's last position
        let rewind = (lastPosition == path.targetRoomKey && lastPosition != '');

        return <Choice 
            key={index}
            index={index}
            prompt={prompt}
            requiredItems={requiredItemStrings}
            takenItems={takenItemStrings}
            faded={faded}
            crossedOut={crossedOut}
            wide={wide}
            rewind={rewind}
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