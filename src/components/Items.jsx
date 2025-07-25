function Items(props) {

    let { items, description, handleChange } = props;

    let itemsJSX = items.map( (item, index) => {

        if (item.description == description) { // This compares the item's description to the room's description to determine if it is the current item. Not great!
            return <div key={index} className="item currentItem" onClick={() => handleChange("item", item)}>{item.string}</div>
        }

        return <div key={index} className="item" onClick={() => handleChange("item", item)}>{item.string}</div>
    });

    return (
        <div id="items">
            {itemsJSX}
        </div>
    );
}

export default Items;