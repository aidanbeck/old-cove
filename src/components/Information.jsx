import Locations from './Locations';
import Description from './Description';
import Items from './Items';

function Information() {
    return (
        <div id="information">
            <Locations />
            <Description />
            <Items />
        </div>
    );
}

export default Information;