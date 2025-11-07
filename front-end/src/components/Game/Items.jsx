import '../../styles/sidebars.css';

function Items(props) {

    let { items, inventoryItems, selectedItem, handleChange } = props;

    let itemsJSX = inventoryItems.map( (item, index) => {
        
        if (item == selectedItem) {
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