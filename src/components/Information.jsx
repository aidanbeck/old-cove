import Locations from './Locations';
import Description from './Description';
import Items from './Items';

let items = [
    "🔑 golden key",
    "🪓 dull axe",
    "🔨 rusty hammer", 
    "🩹 bandage",
    "🔦 torch", 
    "📧 sealed letter" 
]

function Information(props) {
    let world = props.world;
    let room = world.currentRoom;

    return (
        <div id="information">
            <Locations locations={world.locations} currentLocation={world.currentId}/>
            <Description description={room.description}/>
            <Items items={world.inventory}/>
        </div>
    );
}

export default Information;