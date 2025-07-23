function Items(props) {

    let itemsJSX = props.items.map( (item, index) => {
        return <div key={index} className="item">{item}</div>
    });

    return (
        <div id="items">
            {itemsJSX}
        </div>
    );
}

export default Items;