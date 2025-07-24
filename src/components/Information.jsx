import Locations from './Locations';
import Description from './Description';
import Items from './Items';

function Information(props) {

    let { handleChange, world } = props;
    let { locations, lastLocation, inventory} = world;
    let description = world.currentRoom.description;

    return (
        <div id="information">
            <Locations locations={locations} currentLocation={lastLocation} handleChange={handleChange}/>
            <Description description={description}/>
            <Items items={inventory} handleChange={handleChange}/>
        </div>
    );
}

export default Information;