// to make a "give item" option, make the option link to the room it's in. Have it give an item. Make a description of the user picking it up.

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
    constructor(title = "untitled", description = ['blank'], paths = []) {
        this.title = title; // key & location text
        this.description = description; // array of paragraphs
        this.paths = paths; //array of path objects
    }
}

class World {
    constructor(rooms = {}, currentId, locations=[], inventory=[]) {
        this.rooms = rooms;
        this.currentId = currentId;
        this.locations = locations;
        this.inventory = inventory;

        this.currentRoom = rooms[currentId];
    }
    moveTo(id) {
        this.currentId = id;
        this.currentRoom = this.rooms[id];
        console.log(id+"abc");
    }
    hasItem(item) {
        if (this.inventory.includes(item)) {
            return true;
        }
        return false;
    }
    choosePath(index) {
        let path = this.currentRoom.paths[index];


        let hasNeededItem = path.require == '' || this.hasItem(path.require);
        let hasGivenItem = this.hasItem(path.giveItem);

        if (hasNeededItem && !hasGivenItem) {
            this.moveTo(path.toId);
        }
    }
}

let paths = [
    new Path("lighthouse", "go to lighthouse", '', 'axe'),
    new Path("town", "go to town"),
    new Path("cave", "go to cave")
]

let rooms = {
    "sandy beach": new Room("sandy beach", "the beach is sandy", paths),
    "lighthouse": new Room("lighthouse", "the lighthouse shines bright")
}

let gameWorld = new World(rooms, "sandy beach", [], ['axe']);


// Testing
gameWorld.choosePath(0);
console.log(gameWorld.currentRoom);
