class Item {
    constructor(name, paragraphs=["This item doesn't have a description."]) { // takes strings for paragraphs input, not actual Paragraph classes
        this.name = name;
        this.paragraphs = [];
        for (let i = 0; i < paragraphs.length; i++) {
            this.paragraphs[i] = new Paragraph(paragraphs[i]); // does not currently allow for variant items- might add later.
        }
    }
}

class Paragraph {
    constructor(text) {
        this.addVariant("default", text);
    }
    addVariant(signal, text) {
        this[signal] = text;
    }
}

class Path {
    constructor(buttonPrompt="prompt", targetKey='', paragraphs=[], signals=[], requiredItems=[], givenItems=[], takenItems=[]) {
        this.addVariant("default", buttonPrompt, targetKey, paragraphs, signals, requiredItems, givenItems, takenItems);
    }
    addVariant(signal, buttonPrompt="prompt", targetKey='', paragraphs=[], signals=[], requiredItems=[], givenItems=[], takenItems=[]) {
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
        this.addVariant("default", givenLocation, paragraphs, paths);
    }
    addVariant(signal, givenLocation = '', paragraphs=[], paths=[]) {
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
        this.moveTo(position); // adds location if it is needed
    }

    getVariant(variants) { // retrieves the proper variant of a Room, Path, or Paragraph, determined by state signals
        for (let signal of this.signals) {
            if (signal in variants) { // if corresponding variant exists
                return variants[signal]; // !!! does not account for competing signals
            }
        }
        return variants["default"];
    }

    //getParagraphs
    //getPaths
    // these kind of exist already

    getRoom() { // get room variant of player's position
        let positionRoom = this.rooms[this.position]; // inhabited room
        let roomVariant = this.getVariant(positionRoom); // proper variant of inhabited room
        return roomVariant;
    }

    /*
        retrieves an array of strings
        corresponding to the paragraphs of the inhabited room.
        each paragraph is the variant determined by state signals.
        a "getter" for what paragraphs should be displayed on screen for external use.
    */
    getParagraphs() {

        let roomVariant = this.getRoom();
        let paragraphs = []; // correct variant of each paragraph

        for (let paragraph of roomVariant.paragraphs) {
            let paragraphVariant = this.getVariant(paragraph);
            paragraphs.push(paragraphVariant);
        }
        return paragraphs;
    }

    /*
        retrieves an array of paths
        corresponding to the paths of the inhabited room
        each path is the variant determined by state signals
        a "getter" for what paths should be displayed on screen for external use
    */
    getPaths() {
        let roomVariant = this.getRoom();
        let paths = []; // correct variant of each path

        for (let path of roomVariant.paths) {
            let pathVariant = this.getVariant(path);

            /* Don't return buttons with Empty keyword */
            let promptIsEmpty = pathVariant.buttonPrompt == "Empty" || pathVariant.buttonPrompt == "";
            if (promptIsEmpty) {
                continue;
            }

            paths.push(pathVariant);
        }
        return paths;
    }

    showPathParagraphs(path) { // recieve path variant (get via getPaths)

        if (path.paragraphs.length == 0) { return; } // don't describe if path has no description.

        let returnKey = path.targetKey; // room returned to after description
        let continuePath = new Path("Continue.", returnKey);
        this.rooms["description-path"] = new Room('', path.paragraphs, [continuePath]); // create a new room with the paragraphs and a simple continue.
        this.moveTo("description-path");

        //this is messy, return to clean up if I have time.
        //could be more clean, but I have a deadline.
    }

    showItemParagraphs(item) {

        item = this.items[item];
        let returnKey = this.position;

        if (this.position == "description-item") { // if user is already reading an item,
            returnKey = this.getPaths()[0].targetKey; // don't return to that item, return to what that item is returning to
        }
        

        // otherwise it's the same hacky method as before.
        let continuePath = new Path("...", returnKey);
        this.rooms["description-item"] = new Room('', item.paragraphs, [continuePath]);
        this.moveTo("description-item");
    }

    hasItem(itemKey) {
        return this.inventory.includes(itemKey);
    }
    giveItems(items) {
        for (let itemKey of items) {
            if (this.hasItem(itemKey)) { return; } // prevents having the same item twice
            this.inventory.push(itemKey);
        }
    }

    hasLocation(key) {
        return this.locations.includes(key);
    }
    giveLocation(key) {

        if (key == '') { return; } // block empty location strings

        this.lastLocation = key;

        if (this.hasLocation(key)) { return; } // block duplicate location strings

        this.locations[this.locations.length] = key;
    }

    moveTo(roomKey) {
        this.position = roomKey;
        this.giveLocation(this.getRoom().givenLocation);
    }

    playerHasItems(items) { // returns true if player has all items of an input set
        let playerHasAllInputItems = true;
        for (let item of items) {
            if (!this.hasItem(item)) {
                playerHasAllInputItems = false;
            }
        }

        return playerHasAllInputItems;
    }
    isValidPath(pathIndex) { // true if user and path meet all requirements to select the path
        let path = this.getPaths()[pathIndex];

        // Get Conditionals
        let playerHasAllTakenItems = this.playerHasItems(path.takenItems);
        let playerHasAllRequiredItems = this.playerHasItems(path.requiredItems);
        let playerHasAllGivenItems = this.playerHasItems(path.givenItems) && path.givenItems.length > 0;

        if (playerHasAllTakenItems && playerHasAllRequiredItems && !playerHasAllGivenItems) {
            return true;
        }
        
        return false;
    }
    choosePath(index) {
        let path = this.getPaths()[index];
        let pathHasItemsToGive = path.givenItems.length > 0;
        let pathHasSignalsToGive = path.signals.length > 0;

        if (this.isValidPath(index)) {

            //give items
            if (pathHasItemsToGive) { this.giveItems(path.givenItems); }

            // take items
            for (let itemKey of path.takenItems) {
                let itemIndex = this.inventory.indexOf(itemKey)
                this.inventory.splice(itemIndex,1);
            }

            //give signals
            for (let signal of path.signals) {
                if (!this.signals.includes(signal)) {
                    this.signals.push(signal);
                }
            }
            
            if (path.paragraphs.length > 0) {
                this.showPathParagraphs(path); // describe action of path, then return to room once continue pressed.
            } else {
                this.moveTo(path.targetKey); // move without description.
            }
            
        }
    }
}
export { Item, Paragraph, Path, Room, World };