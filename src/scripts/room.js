// to make a "give item" option, make the option link to the room it's in. Have it give an item. Make a description of the user picking it up.

// to make a titled locatin, set the giveLocation option to a key name of a room. That location will then send the player to that room. You can set multiple rooms to the same location
// so you could have lighthouse1, lighthouse2, but have them all give "lighthouse". This way it will show you that you're in a lighthouse.

// to make a choice influence the current room, set the starting path to the same room. set the alter path to the new room with a new description, and overwrite the og path.

// can this edit a description of a room? can a room's description change if it has that item?

class AlterPath { // used to change a path.
    constructor(roomId, pathIndex, pathObject) {
        this.roomId = roomId;
        this.pathOrDesc = "path";
        this.pathIndex = pathIndex;
        this.newPath = pathObject;
    }
}

class AlterDesc { // used to change a description.
    constructor(roomId, description=[]) {
        this.roomId = roomId;
        this.pathOrDesc = "desc";
        this.newDescription = description;
    }
}

class Item {
    constructor(string, description=["This item doesn't have a description."]) {
        this.string = string;
        this.description = description;
    }
}

class Path {
    constructor(toId, prompt, description=[], require='', giveItem='', alters=[]) {
        this.toId = toId; // key/title of the room path goes to
        this.prompt = prompt; // text that shows in option
        this.require = require; // item required to select option
        this.description = description; // paragraphs shown on screen when option selected
        this.giveItem = giveItem; // item that is given when selected, and item that if had, hides this option.
        this.alters = alters; // an array of AlterPath's and AlterDesc's
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

        this.rooms["description-room"] = new Room("description-room", []);
        
        this.moveTo(currentId); // updates currentRoom and adds location if it is needed
    }

    describeOption(path) {
        if (path.description.length == 0) {
            return; // don't describe if path has no description.
        }
        let returnRoom = this.currentId;

        let continuePath = new Path(returnRoom, "Continue.");
        this.rooms["description-option"] = new Room("description-option", path.description, [continuePath], ""); //create a new room with the description and a simple continue.
        
        this.moveTo("description-option");

        //this is messy, return to clean up if I have time.
        //could be more concise, but I have a deadline.
    }

    describeItem(item) {
        let returnRoom = this.currentId;
        let continuePath = new Path(returnRoom, "...");
        this.rooms["description-item"] = new Room("description-item", item.description, [continuePath], "");
        this.moveTo("description-item");
        
        //could combine with above
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

    implementAlter(alter) {
        let room = this.rooms[alter.roomId];

        if (alter.pathOrDesc == "path") {
            room.paths[alter.pathIndex] = alter.newPath;
        }
        if (alter.pathOrDesc == "desc") {
            room.description = alter.newDescription;
        }
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

            // apply alternates
            for (let alter of path.alters) {
                this.implementAlter(alter);
            }

            if (path.description.length > 0) {
                this.describeOption(path); // describe action of path, then return to room once continue pressed.
            } else {
                this.moveTo(path.toId);
            }
            

            
        }
    }
}

let axe = new Item("🪓 dull axe", ["You hold its wooden handle carefully to avoid splinters."]);
let key = new Item("🔑 golden key", ["It shines, but you can't make out your reflection."])

// Create World Data
let beachPaths = [
    new Path("lighthouse", "go to lighthouse"),
    new Path("town", "go to the town"),
    new Path("cave", "go to the cave")
]

let townPaths = [
    new Path ("sandy beach", "return to the beach.")
]

let lighthouseAlters = [
    new AlterDesc("lighthouse", ["The lighthouse shines bright. The barrel lies in fragments, revealing the door."]),
    new AlterPath("lighthouse", 2, new Path("the light", "enter the lighthouse."))
]


let lighthousePaths = [
    new Path("sandy beach", "return to the beach"),
    new Path("lighthouse", "take key", ["You take the key."], '', key),
    new Path("lighthouse", "destroy the barrel.", ['you break the barrel with the axe'], axe, '', lighthouseAlters)
]

let lightPaths = [
    new Path("lighthouse", "climb back down")
]

let cavePaths = [
    new Path("sandy beach", "exit the cave"),
    new Path ("storage room", "open locked door", [], key)
]

let storagePaths = [
    new Path("cave", "return to the cave"),
    new Path("storage room", "take axe", [], '', axe)
]

let rooms = {
    "sandy beach": new Room("sandy beach", ["the beach is sandy"], beachPaths, ""),
    "town": new Room("town", ["everyone's moved on now."], townPaths, ""),
    "lighthouse": new Room("lighthouse", ["the lighthouse shines bright. There is a barrel blocking the way in."], lighthousePaths, "lighthouse"),
    "cave": new Room("cave", ["It's hard to see in here"], cavePaths, "cave"),
    "storage room": new Room('storage room', ["no one's been here for a long time"], storagePaths, ""),
    "the light": new Room ('the light', ["the view is beautiful."], lightPaths, "the light")
}

let gameWorld = new World(rooms, "sandy beach", [], []);

export default gameWorld;
