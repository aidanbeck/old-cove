import Locations from './Locations';
import Description from './Description';
import Items from './Items';

function Information(props) {

    let { handleChange, world } = props;
    let { locations, lastLocation, items, inventory} = world;
    let paragraphs = world.getCurrentParagraphs();
    
    return (
        <div id="information">
            <Locations locations={locations} currentLocation={lastLocation} handleChange={handleChange}/>
            <Description paragraphs={paragraphs}/>
            <Items items={items} inventory={inventory} paragraphs={paragraphs} handleChange={handleChange}/>
            {/* items might need world items too, not just inventory */}
        </div>
    );
}

export default Information;