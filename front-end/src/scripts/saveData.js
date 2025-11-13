class SaveData {
    constructor(key = "save", world) {

        let user = JSON.parse(localStorage.getItem("DATA"));

        // console.log(user);
        // console.log("USER");

        if (user.position == null) { user.position = world.position.roomKey; }
        if (user.inventoryItems == null) { user.inventoryItems = world.inventoryItems; }
        if (user.locations == null) { user.locations = world.locations; }
        if (user.signals == null) { user.signals = world.signals; }
        
        this.key = key;

        this.data = {
            position: user.position,
            inventory: user.inventoryItems,
            locations: user.locations,
            signals: user.signals,
            dateCreated: new Date(),
            dateUpdated: new Date()
        }

        if (saveExists(key)) {
            //this.data = loadData(key, world);
            //console.log(`save "${key}" already exists. Data:`, this.data);
        }

    }

    update(world) {

        /*
            path & item descriptions are currently janky. Eventually they will be handled differently.
            For now, this blocker ensures that their jankiness will not break saves.
        */
        if (world.position == "description-path" || world.position == "description-item") { return; }

        this.data.position = world.position;
        this.data.inventoryItems = world.inventoryItems;
        this.data.locations = world.locations;
        this.data.signals = world.signals;
        this.data.dateUpdated = new Date();

        this.save(); // every time?
        updateUser(world);
    }

    save() {
        let saveString = JSON.stringify(this);
        localStorage.setItem(this.key, saveString);
        //console.log(`saved to "${this.key}" at ${this.data.dateUpdated}.`);
    }

    delete() {
        localStorage.removeItem(this.key);
    }
}

function saveExists(key = "") {
    let data = localStorage.getItem(key);
    if (data) {
        return true;
    }
    return false;
}

function loadData(key = "", world) {

    let saveString = localStorage.getItem(key);
    let data = JSON.parse(saveString).data;

    world.position = data.position;
    world.inventory = data.inventory;
    world.locations = data.locations;
    world.signals = data.signals;

    // console.log(`loaded save: ${key}.`);

    return data;
}

// Used within main gameplay loop, not here!
function updateUser(world) {

    let user = JSON.parse(localStorage.getItem("DATA"));

    if (world.position.roomKey != "description-path") {
        user.position = world.position.roomKey;
        user.inventoryItems = world.inventoryItems;
        user.locations = world.locations;
        user.signals = world.signals;
    }
    

    let apiURL = `/api/users/${user.name}`;

    let userJSON = JSON.stringify(user);

    // console.log(userJSON);

    fetch(apiURL, {
        method: 'PUT',
        headers: {
            'Authorization': user.password,
            'Content-Type': 'application/json',
        },
        body: userJSON,
    })

    .then(response => response.json()) // Parse the JSON response
    
    .then(data => {
        // console.log(data); // !!! is any response needed?
    }) // Handle the parsed data
    
    .catch(error => console.error('Error:', error)); // Handle any errors
}

export default SaveData;