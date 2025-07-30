import Locations from './Locations';
import Description from './Description';
import Items from './Items';

function Information(props) {

    let { handleChange, world } = props;
    let { locations, lastLocation, items} = world;
    let paragraphs = world.positionRoom.paragraphs;

    return (
        <div id="information">
            <Locations locations={locations} currentLocation={lastLocation} handleChange={handleChange}/>
            <Description paragraphs={paragraphs}/>
            <Items items={items} paragraphs={paragraphs} handleChange={handleChange}/>
        </div>
    );
}

export default Information;