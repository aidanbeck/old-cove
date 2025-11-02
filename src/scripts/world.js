class Item {
    constructor(name, roomKey) { // takes strings for input, not actual Paragraph classes (for now)
        this.name = name;
        this.roomKey = roomKey;
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
    constructor(rooms = {}, items = {}, position, inventoryItems = [], signals = [],  locations = []) {

        //STATIC
        this.rooms = rooms; // object of rooms objects. Keys are used to identify each room.
        this.items = items; // object of item objects.  Keys are used to identify each item.

        //DYNAMIC
        this.signals = signals; // array of state-changing signal strings. 
        this.inventoryItems = inventoryItems; // array of item key strings.
        this.locations = locations; // a list of keys the user has collected and can fast travel to
        
        this.position = {
            roomKey: position,
            lastRoomKey: '',
            itemKey: '',
            lastItemKey: ''
        }

        this.selected = {
            location: '',
            inventoryItem: ''
        };

        this.moveTo(this.position.roomKey); // adds location if it is needed
    }

    // uses state signals to return the proper Room/Path/Paragraph variant
    getVariant(object) {

        /*
            Get a reverse list of variant keys.
            It's reversed to make sure the variant most recently defined in syntax has priority.
        */
        let variantKeys = Object.keys(object.variants).reverse();

        for (let key of variantKeys) { // cycle through all variants
            if (this.signals.includes(key)) { // if corresponding signal exists
                return object.variants[key];
            }
        }

        return object.default; // if no signals match, return default variant.
    }

    /*
        returns the room the player is inhabiting.
        uses state signals to determine proper variant.
    */
    getRoom() {
        let roomVariants = this.rooms[this.position.roomKey];

        if (this.isInspectingItem()) {
            roomVariants = this.rooms[this.position.itemKey]; // redirect room if player is inspecting an item
        }

        let roomVariant = this.getVariant(roomVariants); // proper variant of inhabited room
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
            if (paragraph != "Empty" && paragraph != "") { // if paragraph exists
                paragraphs.push(paragraphVariant);
            }
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

        if (this.isInspectingItem()) {
            let returnPath = new Path("⏮", this.position.roomKey);
            paths.push( this.getVariant(returnPath) );
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

    hasSignal(signal) {
        return this.signals.includes(signal);
    }
    hasItem(itemKey) {
        return this.inventoryItems.includes(itemKey);
    }
    giveItems(items) {
        for (let itemKey of items) {
            if (this.hasItem(itemKey)) { return; } // prevents having the same item twice
            this.inventoryItems.push(itemKey);
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
        if (this.position.roomKey != "description-path") { // this is not foolproof, it can break. but I need sleep. goodnight!
            this.position.lastRoomKey = this.position.roomKey; // prevent descriptions from overwriting lastPosition. description-path is hacky and it is spreading!!!
        }
        this.position.roomKey = roomKey;
        this.position.itemKey = ''; // wipe selected item when player moves (TODO refactor when items can have multiple rooms)
        this.giveLocation(this.getRoom().givenLocation);
    }

    inspectItem(itemKey) { // like moveTo, but for items

        this.position.itemKey = itemKey;
        this.selected.inventoryItem = itemKey;
        // this.moveTo(itemKey); // !!!temporary
    }

    isInspectingItem() {
        return this.position.itemKey != '';
    }

    playerHasItems(inputItems) { // returns true if player has all items of an input set
        let playerHasAllInputItems = true;
        for (let item of inputItems) {
            if (!this.hasItem(item)) {
                playerHasAllInputItems = false;
            }
        }

        return playerHasAllInputItems;
    }
    playerHasSignals(inputSignals) {
        let playerHasAllInputSignals = true;
        for (let signal of inputSignals) {
            if (!this.hasSignal(signal)) {
                playerHasAllInputSignals = false;
            }
        }

        return playerHasAllInputSignals;
    }
    isValidPath(pathIndex) { // true if user and path meet all requirements to select the path

        let path = this.getPaths()[pathIndex];

        // Get Conditionals
        let playerHasAllTakenItems = this.playerHasItems(path.takenItems);
        let playerHasAllRequiredItems = this.playerHasItems(path.requiredItems);
        let playerHasAllGivenItems = this.playerHasItems(path.givenItems) && path.givenItems.length > 0;
        
        let playerHasAllTakenSignals = this.playerHasSignals(path.takenSignals);
        let playerHasAllGivenSignals = this.playerHasSignals(path.givenSignals) && path.givenSignals.length > 0;

        if (
            playerHasAllTakenItems
            && playerHasAllRequiredItems
            && !playerHasAllGivenItems
            && playerHasAllTakenSignals
            && !playerHasAllGivenSignals
        ) {
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
                let itemIndex = this.inventoryItems.indexOf(itemKey)
                this.inventoryItems.splice(itemIndex, 1);
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