class Item {
    constructor(name, paragraphs=["This item doesn't have a description."]) {
        this.name = name;
        this.paragraphs = paragraphs;
    }
}

class Paragraph {
    constructor(text) {
        this.addAlteration("default", text);
    }
    addAlteration(signal, text) {
        this[signal] = text;
    }
    static getAlteration(paragraph, signals) { // should be retooled as a world function, usable by anything with alterations.
        for (let signal of signals) {
            if (signal in paragraph) { // if corresponding alteration exists
                return paragraph[signal]; // !!! does not account for competing alterations
            }
        }
        return paragraph["default"];
    }
}

class Path {
    constructor(buttonPrompt="prompt", targetKey='', paragraphs=[], signals=[], requiredItems=[], givenItems=[], takenItems=[]) {
        this.addAlteration("default", buttonPrompt, targetKey, paragraphs, signals, requiredItems, givenItems, takenItems);
    }
    addAlteration(signal, buttonPrompt="prompt", targetKey='', paragraphs=[], signals=[], requiredItems=[], givenItems=[], takenItems=[]) {
        this[signal] = {};
        this[signal].buttonPrompt = buttonPrompt;
        this[signal].targetKey = targetKey; // key of the room button moves to
        this[signal].paragraphs = paragraphs;
        this[signal].signals = signals;
        this[signal].requiredItems = requiredItems;
        this[signal].givenItems = givenItems;
        this[signal].takenItems = takenItems;
    }
}

class Room {
    constructor(givenLocation = '', paragraphs=[], paths=[]) {
        this.addAlteration("default", givenLocation, paragraphs, paths);
    }
    addAlteration(signal, givenLocation = '', paragraphs=[], paths=[]) {
        this[signal] = {};
        this[signal].givenLocation = givenLocation;
        this[signal].paragraphs = paragraphs;
        this[signal].paths = paths;
    }
}

class World {
    constructor(rooms = {}, items={}, signals=[], inventory=[], locations=[], position) {

        //STATIC
        this.rooms = rooms; // object of rooms objects. Not an array, the keys are used to identify each room.
        this.items = items; // object of item objects. Keys are used to identify each item.

        //DYNAMIC
        this.signals = signals; // array of state-changing signal strings. 
        this.inventory = inventory; // array of item key strings.
        this.locations = locations; // a list of titles/ids the user has collected and can revisit
        this.lastLocation = ''; // this is the last *collected* id/title the player *visited*. It exists to highlight their most recently visited location.
        this.positon = position; // the targetKey of the room the user is in
        this.positionRoom; // a reference to the room object the user is currently in.
        this.moveTo(position); // updates positionRoom and adds location if it is needed
    }

    describePath(path) {
        if (path.paragraphs.length == 0) { return; } // don't describe if path has no description.

        let returnRoom = path.targetKey; // room returned to after description

        let continuePath = new Path(returnRoom, "Continue.");
        this.rooms["description-path"] = new Room(path.paragraphs, [continuePath]); // create a new room with the paragraphs and a simple continue.
        
        this.moveTo("description-path");

        //this is messy, return to clean up if I have time.
        //could be more clean, but I have a deadline.
    }

    describeItem(item) {
        
        let returnKey = this.position;

        if (this.position == "description-item") { // if user is already reading an item,
            returnKey = this.positionRoom.paths[0].targetKey; // don't return to that item, return to what that item is returning to
        }

        // otherwise it's the same hacky method as before.
        let continuePath = new Path(returnKey, "...");
        this.rooms["description-item"] = new Room(item.paragraphs, [continuePath]);
        this.moveTo("description-item");
    }

    hasItem(item) {
        return this.items.includes(item);
    }
    giveItem(item) {
        if (this.hasItem(item)) { return; } // prevents having the same item twice. Needed?
        this.items.push(item);
    }

    hasLocation(location) {
        return this.locations.includes(location);
    }
    giveLocation(key) {

        if (key == '') { return; } // blocks empty location strings

        this.lastLocation = key;

        if (this.hasLocation(key)) { return; } // blocks duplicate location strings

        this.locations[this.locations.length] = key;
    }

    /* takes a path's alterations and applies their values to their target rooms. */
    /* this is used to make changes to the world when an option is selected. */
    implementAlteration(alteration) {
        let room = this.rooms[alteration.targetKey];

        if (alteration.pathOrDesc == "path") {
            room.paths[alteration.pathIndex] = alteration.newPath;
        }
        if (alteration.pathOrDesc == "desc") {
            room.paragraphs = alteration.newParagraphs;
        }
    }

    moveTo(key) {
        this.position = key;
        this.positionRoom = this.rooms[key];
        this.giveLocation(this.positionRoom.givenLocation);
    }
    isValidPath(pathIndex) { // user and path meet all requirements to select the path
        let path = this.positionRoom.paths[pathIndex];

        // Get Conditionals
        let playerHasNeededItem = path.requiredItem == '' || this.hasItem(path.requiredItem);
        let playerHasGivenItem = this.hasItem(path.givenItem);
        let limitHit = path.limit <= 0;

        if (playerHasNeededItem && !playerHasGivenItem && !limitHit) {
            return true;
        }
        
        return false;
    }
    choosePath(index) {
        let path = this.positionRoom.paths[index];
        let pathHasItemToGive = path.givenItem != '';

        if (this.isValidPath(index)) {
            if (pathHasItemToGive) { this.giveItem(path.givenItem); }

            // apply alternates
            for (let alteration of path.alterations) {
                this.implementAlteration(alteration);
            }

            path.limit--; //deecrement limit to track how many times path can be taken.

            // take the required item (if supposed to)
            if (path.requiredItem != '' && path.takesItem) {
                let itemIndex = this.items.indexOf(path.requiredItem);
                this.items.splice(itemIndex,1);
            }

            if (path.paragraphs.length > 0) {
                this.describePath(path); // describe action of path, then return to room once continue pressed.
            } else {
                this.moveTo(path.targetKey); // move without description.
            }
            
        }
    }
}
export { Item, Paragraph, Path, Room, World };