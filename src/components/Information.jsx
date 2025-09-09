import Locations from './Locations';
import Description from './Description';
import Items from './Items';

function Information(props) {

    let { handleChange, world } = props;
    let { locations, selectedLocation, selectedItem, items, inventory} = world;
    let paragraphs = world.getParagraphs();
    
    return (
        <div id="information">
            <Locations locations={locations} currentLocation={selectedLocation} handleChange={handleChange}/>
            <Description paragraphs={paragraphs}/>
            <Items items={items} inventory={inventory} selectedItem={selectedItem} handleChange={handleChange}/>
        </div>
    );
}

export default Information;