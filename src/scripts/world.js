class AlterPath { // used to alter a path.
    constructor(targetKey, pathIndex, pathObject) {
        this.targetKey = targetKey;
        this.pathOrDesc = "path";
        this.pathIndex = pathIndex;
        this.newPath = pathObject;
    }
}

class AlterDesc { // used to alter a description.
    constructor(targetKey, paragraphs=[]) {
        this.targetKey = targetKey;
        this.pathOrDesc = "desc";
        this.newParagraphs = paragraphs;
    }
}

class Item {
    constructor(name, paragraphs=["This item doesn't have a description."]) {
        this.name = name;
        this.paragraphs = paragraphs;
    }
}

class Path {
    constructor(targetKey, buttonPrompt, paragraphs=[], givenItem='', requiredItem='', takesItem=false, alterations=[], limit = Infinity) {
        this.targetKey = targetKey; // key/title of the room path goes to
        this.buttonPrompt = buttonPrompt; // text that shows in option
        this.requiredItem = requiredItem; // item required to select option
        this.paragraphs = paragraphs; // paragraphs shown on screen when option selected
        this.givenItem = givenItem; // item that is given when selected, and item that if had, hides this option.
        this.alterations = alterations; // an array of AlterPath's and AlterDesc's
        this.limit = limit; // how many times the option can be made
        this.takesItem = takesItem; // determines if the path takes the item.
    }
}

class Room {
    constructor(paragraphs = ['blank'], paths = [], givenLocation='') {
        this.paragraphs = paragraphs; // array of paragraphs
        this.paths = paths; // array of path objects
        this.givenLocation = givenLocation; // id/title to be added to the location list
    }
}

class World {
    constructor(rooms = {}, position, locations=[], items=[]) {
        this.rooms = rooms; // object of rooms objects. Not an array, the keys are used to identify each room.
        this.positon = position; // the targetKey of the room the user is in
        this.locations = locations; // a list of titles/ids the user has collected and can revisit
        this.items = items; // item objects array

        this.lastLocation = ''; // this is the last *collected* id/title the player *visited*. It exists to highlight their most recently visited location.
        
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
        if (this.hasLocation(key)) { return; } // blocks duplicate location strings

        this.lastLocation = key;
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
export { AlterPath, AlterDesc, Item, Path, Room, World };