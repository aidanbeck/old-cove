class SaveData {
    constructor(key = "save", world) {

        this.key = key;

        this.data = {
            position: world.position,
            inventory: world.inventory,
            locations: world.locations,
            signals: world.signals,
            dateCreated: new Date(),
            dateUpdated: new Date()
        }

        if (saveExists(key)) {
            this.data = loadData(key, world).data;
            console.log(`save "${key}" already exists. Data:`, this.data);
        }

    }

    update(world) {

        /*
            path & item descriptions are currently janky. Eventually they will be handled differently.
            For now, this blocker ensures that their jankiness will not break saves.
        */
        if (world.position == "description-path" || world.position == "description-item") { return; }

        this.position = world.position;
        this.inventory = world.inventory;
        this.locations = world.locations;
        this.signals = world.signals;
        this.dateUpdated = new Date();

        this.save(); // every time?
    }

    save() {
        let saveString = JSON.stringify(this);
        localStorage.setItem(this.key, saveString);
        console.log(`saved to "${this.key}".`);
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

    let dataString = localStorage.getItem(key);
    let data = JSON.parse(dataString);

    world.position = data.position;
    world.inventory = data.inventory;
    world.locations = data.locations;
    world.signals = data.signals;

    console.log(`loaded save: ${key}.`);

    return data;
}

export default SaveData;