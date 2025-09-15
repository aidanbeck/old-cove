class SaveData {
    constructor(title = "save", world) {

        this.title = title;

        this.data = {
            position: world.position,
            inventory: world.inventory,
            signals: world.signals,
            dateCreated: new Date(),
            dateUpdated: new Date()
        }

        if (saveExists(title)) {
            console.log(`save "${title}" already exists. Loading...`);
            this.data = loadData(title, world).data;
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
        this.signals = world.signals;
        this.dateUpdated = new Date();

        this.save(); // every time?
    }

    save() {
        let saveString = JSON.stringify(this);
        localStorage.setItem(this.title, saveString);
        console.log(`saved to "${this.title}":`, saveString);
    }
}

function saveExists(title = "") {
    let data = localStorage.getItem(title);
    if (data) {
        return true;
    }
    return false;
}

function loadData(title = "", world) {

    let dataString = localStorage.getItem(title);
    let data = JSON.parse(dataString);

    world.position = data["position"];
    world.inventory = data["inventory"];
    world.signals = data.signals; // test if . notation works

    console.log(`loaded save: ${title}.`);

    return data;
}

export default SaveData;