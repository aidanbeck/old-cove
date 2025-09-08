import Locations from './Locations';
import Description from './Description';
import Items from './Items';

function Information(props) {

    let { handleChange, world } = props;
    let { locations, lastLocation, items, inventory} = world;
    let paragraphs = world.getParagraphs();
    
    return (
        <div id="information">
            <Locations locations={locations} currentLocation={lastLocation} handleChange={handleChange}/>
            <Description paragraphs={paragraphs}/>
            <Items items={items} inventory={inventory} paragraphs={paragraphs} handleChange={handleChange}/>
        </div>
    );
}

export default Information;