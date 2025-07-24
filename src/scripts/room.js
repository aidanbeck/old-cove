// to make a "give item" option, make the option link to the room it's in. Have it give an item. Make a description of the user picking it up.
// can this edit a description of a room? can a room's description change if it has that item?

class Path {
    constructor(toId, prompt, description=[], require='', giveItem='') {
        this.toId = toId; // key/title of the room path goes to
        this.prompt = prompt; // text that shows in option
        this.require = require; // item required to select option
        this.description = description; // paragraphs shown on screen when option selected
        this.giveItem = giveItem; // item that is given when selected, and item that if had, hides this option.
    }
}

class Room {
    constructor(title = "untitled", description = ['blank'], paths = [], giveLocation='') {
        this.title = title; // key & location text
        this.description = description; // array of paragraphs
        this.paths = paths; //array of path objects
        this.giveLocation = giveLocation; // add key to location list
    }
}

class World {
    constructor(rooms = {}, currentId, locations=[], inventory=[]) {
        this.rooms = rooms;
        this.currentId = currentId;
        this.locations = locations;
        this.inventory = inventory;

        this.lastLocation = '';

        this.moveTo(currentId); // updates currentRoom and adds location if it is needed
    }

    hasItem(item) {
        if (this.inventory.includes(item)) {
            return true;
        }
        return false;
    }
    giveItem(item) {
        if (this.inventory.includes(item)) {
            return; // prevents having the same item twice. Needed?
        }
        this.inventory[this.inventory.length] = item;
    }

    hasLocation(location) {
        if (this.locations.includes(location)) {
            return true;
        }
        return false;
    }
    giveLocation(id) {

        if (id == '') {
            return; //prevents giving empty locations
        }

        this.lastLocation = id;

        if (this.locations.includes(id) || id == '') {
            return; // prevents having the same location twice,
        }
        this.locations[this.locations.length] = id;
    }

    moveTo(id) {
        this.currentId = id;
        this.currentRoom = this.rooms[id];
        this.giveLocation(this.currentRoom.giveLocation);
    }
    isValidOption(index) {
        let path = this.currentRoom.paths[index];

        // Get Conditionals
        let playerHasNeededItem = path.require == '' || this.hasItem(path.require);
        let playerHasGivenItem = this.hasItem(path.giveItem);

        if (playerHasNeededItem && !playerHasGivenItem) {
            return true;
        }
        return false;
    }
    choosePath(index) {
        let path = this.currentRoom.paths[index];
        let pathHasItemToGive = path.giveItem != '';

        if (this.isValidOption(index)) {
            if (pathHasItemToGive) { this.giveItem(path.giveItem); }
            this.moveTo(path.toId);
        }
    }
    
    
}


// Create World Data
let beachPaths = [
    new Path("lighthouse", "go to lighthouse"),
    new Path("town", "go to the town"),
    new Path("cave", "go to the cave")
]

let townPaths = [
    new Path ("sandy beach", "return to the beach.")
]

let lighthousePaths = [
    new Path("sandy beach", "return to the beach"),
    new Path("lighthouse", "take key", [], '', 'key'),
    new Path("the light", "destroy the barrel.", ['you break the barrel with the axe'], "🪓 dull axe")
]

let lightPaths = [
    new Path("lighthouse", "climb back down")
]

let cavePaths = [
    new Path("sandy beach", "exit the cave"),
    new Path ("storage room", "open locked door", [], 'key')
]

let storagePaths = [
    new Path("cave", "return to the cave"),
    new Path("storage room", "take axe", [], '', "🪓 dull axe")
]

let rooms = {
    "sandy beach": new Room("sandy beach", ["the beach is sandy"], beachPaths, ""),
    "town": new Room("town", ["everyone's moved on now."], townPaths, ""),
    "lighthouse": new Room("lighthouse", ["the lighthouse shines bright. There is a barrel blocking the way in."], lighthousePaths, "lighthouse"),
    "cave": new Room("cave", ["It's hard to see in here"], cavePaths, "cave"),
    "storage room": new Room('storage room', ["no one's been here for a long time"], storagePaths, ""),
    "the light": new Room ('the light', ["the view is beautiful."], lightPaths, "the light")
}

let gameWorld = new World(rooms, "sandy beach", [], ["📧 sealed letter"]);

export default gameWorld;

// Testing

// function logStatus() {
//     console.log(gameWorld.currentRoom.description, gameWorld.inventory);
// }
// logStatus();
// gameWorld.choosePath(1); logStatus();
// gameWorld.choosePath(0); logStatus();
// gameWorld.choosePath(0); logStatus();
// gameWorld.choosePath(1); logStatus();
// gameWorld.choosePath(0); logStatus();
// gameWorld.choosePath(2); logStatus();
// gameWorld.choosePath(1); logStatus();
// gameWorld.choosePath(1); logStatus();
// gameWorld.choosePath(0); logStatus();
// gameWorld.choosePath(0); logStatus();
// gameWorld.choosePath(0); logStatus();
// gameWorld.choosePath(2); logStatus();
