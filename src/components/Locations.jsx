function Locations(props) {

  let locationsJSX = props.locations.map( (location, index) => {

    if (location == props.currentLocation) {
      return <div key={index} className="location currentLocation"  onClick={() => props.handleChange("location", location)}>{location}</div>
    }

    return <div key={index} className="location" onClick={() => props.handleChange("location", location)}>{location}</div>
  });

  return (
    <div id="locations">
      {locationsJSX}
    </div>
    );
}

export default Locations;