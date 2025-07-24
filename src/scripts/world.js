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
    constructor(toId, prompt, description=[], giveItem='', require='', takesItem=false, alters=[], limit = Infinity) {
        this.toId = toId; // key/title of the room path goes to
        this.prompt = prompt; // text that shows in option
        this.require = require; // item required to select option
        this.description = description; // paragraphs shown on screen when option selected
        this.giveItem = giveItem; // item that is given when selected, and item that if had, hides this option.
        this.alters = alters; // an array of AlterPath's and AlterDesc's
        this.limit = limit; // how many times the option can be made
        this.takesItem = takesItem; // determines if the path takes the item.
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
        let returnRoom = path.toId;

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
        let optionLimitHit = path.limit <= 0;

        if (playerHasNeededItem && !playerHasGivenItem && !optionLimitHit) {
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

            path.limit--; //deecrement limit to keep track of how many times path has been taken.
            if (path.requires != '' && path.takesItem) { //take the item if a player has it
                let itemIndex = this.inventory.indexOf(path.requires);
                this.inventory.splice(itemIndex,1);
            }

            if (path.description.length > 0) {
                this.describeOption(path); // describe action of path, then return to room once continue pressed.
            } else {
                this.moveTo(path.toId);
            }
            

            
        }
    }
}
export { AlterPath, AlterDesc, Item, Path, Room, World };