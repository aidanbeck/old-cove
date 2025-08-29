function Items(props) {

    let { items, paragraphs, handleChange } = props;

    // let itemsJSX = items.map( (item, index) => {

    //     if (item.paragraphs == paragraphs) { // This compares the item's description to the room's description to determine if it is the current item. Not great!
    //         return <div key={index} className="item currentItem" onClick={() => handleChange("item", item)}>{item.name}</div>
    //     }

    //     return <div key={index} className="item" onClick={() => handleChange("item", item)}>{item.name}</div>
    // });

    return (
        <div id="items">
            {/* {itemsJSX} */}
        </div>
    );
}

export default Items;