import '../../styles/sidebars.css';

function Locations(props) {

  let { locations, currentLocation, handleChange } = props;

  let locationsJSX = locations.map( (location, index) => {

    if (location == currentLocation) {
      return <div key={index} className="location currentLocation" onClick={() => handleChange("location", location)}>{location}</div>
    }

    return <div key={index} className="location" onClick={() => handleChange("location", location)}>{location}</div>
  });

  return (
    <div id="locations">
      {locationsJSX}
    </div>
    );
}

export default Locations;