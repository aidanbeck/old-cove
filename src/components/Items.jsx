function Items(props) {

    let { items, handleChange } = props;

    let itemsJSX = items.map( (item, index) => {
        return <div key={index} className="item" onClick={() => handleChange("item", item)}>{item.string}</div>
    });

    return (
        <div id="items">
            {itemsJSX}
        </div>
    );
}

export default Items;