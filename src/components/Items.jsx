function Items(props) {

    let itemsJSX = props.items.map( (item, index) => {
        return <div key={index} className="item" onClick={() => props.handleChange("item", item)}>{item.string}</div>
    });

    return (
        <div id="items">
            {itemsJSX}
        </div>
    );
}

export default Items;