class Item {
    constructor(name, paragraphs = ["This item doesn't have a description."]) { // takes strings for input, not actual Paragraph classes (for now)
        this.name = name;
        this.paragraphs = [];
        for (let i = 0; i < paragraphs.length; i++) {
            this.paragraphs[i] = new Paragraph(paragraphs[i]);
        }
        // TODO: items should contain one or more rooms for their descriptions.
    }
}

class Paragraph {
    constructor(text) {
        this.default = text;
        this.variants = {};
    }
    addVariant(signal, text) {
        let variant = new Paragraph(text);
        this.variants[signal] = variant.default;
    }
}

class Path {
    constructor(buttonPrompt = "prompt", targetRoomKey = '', paragraphs = [], givenSignals = [], takenSignals = [], requiredItems = [], givenItems = [], takenItems = []) {
        this.default = {
            buttonPrompt,
            targetRoomKey,
            paragraphs,
            givenSignals,
            takenSignals,
            requiredItems,
            givenItems,
            takenItems
        }
        this.variants = {};
    }
    addVariant(signal, buttonPrompt = "prompt", targetRoomKey = '', paragraphs = [], signals = [], requiredItems = [], givenItems = [], takenItems = []) {
        let variant = new Path(buttonPrompt, targetRoomKey, paragraphs, signals, requiredItems, givenItems, takenItems);
        this.variants[signal] = variant.default;
    }
}

class Room {
    constructor(givenLocation = '', paragraphs = [], paths = []) {
        this.default = {
            givenLocation,
            paragraphs,
            paths
        }
        this.variants = {};
        
    }
    addVariant(signal, givenLocation = '', paragraphs = [], paths = []) {
        let variant = new Room(givenLocation, paragraphs, paths);
        this.variants[signal] = variant.default;
    }
}

class World {
    constructor(rooms = {}, items = {}, position, inventory = [], signals = [],  locations = []) {

        //STATIC
        this.rooms = rooms; // object of rooms objects. Keys are used to identify each room.
        this.items = items; // object of item objects.  Keys are used to identify each item.

        //DYNAMIC
        this.signals = signals; // array of state-changing signal strings. 
        this.inventory = inventory; // array of item key strings.
        this.locations = locations; // a list of keys the user has collected and can fast travel to
        this.positon = position; // the key of the room the user is in
        this.selectedLocation = '';
        this.selectedItem = ''; // TODO use this to render an item instead of a room if it isn't blank, this gets rid of the hacky showItemParagraphs
        
        this.moveTo(position); // adds location if it is needed
    }

    // uses state signals to return the proper Room/Path/Paragraph variant
    getVariant(object) {
        for (let signal of this.signals) {
            if (signal in object.variants) { // if corresponding variant exists
                return object.variants[signal]; // !!! does not account for competing signals
            }
        }
        return object.default; // if no signals match, return default variant.
    }

    /*
        returns the room the player is inhabiting.
        uses state signals to determine proper variant.
    */
    getRoom() {
        let positionRoom = this.rooms[this.position]; // inhabited room
        let roomVariant = this.getVariant(positionRoom); // proper variant of inhabited room
        return roomVariant;
    }

    /*
        returns the strings of the current room's paragraphs.
        uses state signals to determine proper variants.
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
        returns the current room's paths.
        uses state signals to determine proper variants.
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

        let returnKey = path.targetRoomKey; // room returned to after description
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
            returnKey = this.getPaths()[0].targetRoomKey; // don't return to that item, return to what that item is returning to
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

        this.selectedLocation = key;

        if (this.hasLocation(key)) { return; } // block duplicate location strings

        this.locations[this.locations.length] = key;
    }

    moveTo(roomKey) {
        this.position = roomKey;
        this.selectedItem = ''; // wipe selected item when player moves (TODO refactor when items can have multiple rooms)
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
        let pathHasSignalsToGive = path.givenSignals.length > 0;

        if (this.isValidPath(index)) {

            //give items
            if (pathHasItemsToGive) { this.giveItems(path.givenItems); }

            // !!! should these following blocks be independent methods?

            // take items
            for (let itemKey of path.takenItems) {
                let itemIndex = this.inventory.indexOf(itemKey)
                this.inventory.splice(itemIndex, 1);
            }

            //give signals
            for (let signal of path.givenSignals) {
                if (!this.signals.includes(signal)) {
                    this.signals.push(signal);
                }
            }

            //remove signals
            for (let signal of path.takenSignals) {
                if (this.signals.includes(signal)) {
                    let signalIndex = this.signals.indexOf(signal);
                    this.signals.splice(signalIndex, 1);
                }
            }

            if (path.paragraphs.length > 0) {
                this.showPathParagraphs(path); // describe action of path, then return to room once continue pressed.
            } else {
                this.moveTo(path.targetRoomKey); // move without description.
            }

        }
    }
}
export { Item, Paragraph, Path, Room, World };