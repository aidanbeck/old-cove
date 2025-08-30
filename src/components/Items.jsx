function Items(props) {

    let { items, inventory, paragraphs, handleChange } = props;

    let itemsJSX = inventory.map( (item, index) => {

        if (item.paragraphs == paragraphs) { // This compares the item's description to the room's description to determine if it is the current item. Not great!
            return <div key={index} className="item currentItem" onClick={() => handleChange("item", item)}>{items[item].name}</div>
        }

        return <div key={index} className="item" onClick={() => handleChange("item", item)}>{items[item].name}</div>
    });

    return (
        <div id="items">
            {itemsJSX}
        </div>
    );
}

export default Items;