import { Syntax, build } from 'syntaxlor';
import { Room, Path, Paragraph } from './world.js';

let customSyntax = new Syntax(origin, final, addParagraph, '&');
customSyntax.addRule('#', addRoom);
customSyntax.addRule("%", setGivenLocation);
customSyntax.addRule("*", addPath);
customSyntax.addRule("~", addVariant);
customSyntax.addRule(">", setTargetRoomKey);
customSyntax.addRule("@", addGivenSignal);
customSyntax.addRule("<", addTakenSignal);
customSyntax.addRule("$", addRequiredItem);
customSyntax.addRule("-", addTakenItem);
customSyntax.addRule("+", addGivenItem);

export { customSyntax, build };

/*
    SYNTAX COMMAND FUNCTIONS
*/

function origin(commands, syntax) {
    let object = {
        build: {
            latestRoom: null, //reference to the most recent room
            latestPath: null, //reference to the most recent path
            latestEither: null, //reference to the most recent path OR room
            latestKey: null // string, used to get the path to the most recently created room.
        },
        rooms: {}
        // should world variables be output here or just rooms?
        // should I separate build and output?
        // should just the rooms be output without having it wrapped in a rooms object?
    };

    return object;
}

function final(object) {
    return object.rooms; // ignore build/room structure & just return rooms
}

// Helper Functions
function getLatestRoom(object) {
    return object.build.latestRoom;
}
function getLatestPath(object) {
    return object.build.latestPath;
}
function getLatest(object) {
    return object.build.latestEither;
}

function addRoom(input, object) {

    let key = input;
    if (object.build.latestKey == input) { key += "_" } // avoid overwriting rooms. Room_ will eventually be erased and put into the original as a variant.

    object.rooms[key] = new Room();
    //key: input, // needed to create default targetRoomKey. There may be a way around this.

    object.build.latestRoom = object.rooms[key].default;
    object.build.latestEither = object.rooms[key].default;
    object.build.latestKey = input; // used for paths that lead to current room.
}

function setGivenLocation(input, object) {
    getLatestRoom(object).givenLocation = input ;
}

function addParagraph(input, object) {
    if (input == "Empty") { input = "" }; // wipe paragraph if using "Empty" keyword
    let paragraph = new Paragraph(input);

    getLatest(object).paragraphs.push(paragraph); // add paragraph to latest path or room
}

function addVariant(input, object) { // This is a monster and should be refactored someday. Value not equivalent to the time investment right now.

    if (getLatest(object).paragraphs.length > 0) { // Alter Latest Paragraph
        /*
            ^ If there are more than 0 paragraphs in the latest object, a paragraph has been defined for it.
            Therefore, a created alter should alter the most recent paragraph of the object, as that must be the most recently defined alterable.
        */
        let firstSpace = input.indexOf(' ');
        let signal = input.slice(0,firstSpace); //string before the first space, the signal
        let alteredString = input.slice(firstSpace).trim(); //string trimmed after the first space, the rest of the text
        if (alteredString == "Empty") { alteredString = "" }; // wipe paragraph if using "Empty" keyword
        let mostRecentParagraph = getLatest(object).paragraphs.at(-1); // the most recent paragraph object
        mostRecentParagraph.addVariant(signal, alteredString);

    } else if ('targetRoomKey' in getLatest(object)) { // Alter Latest Path
        /*
            ^if the latest object has a 'targetRoomKey' key, it must be a path.
        */
        
        // First a path is defined with `*Prompt Text`, THEN a `~signalName` is used to define that path as a variant retroactively.
        // Therefore, the path we want to make into a variant already exists as a path.
        // We should assume that the path above *THAT* path is the default/original.

        let roomContainingPaths = getLatestRoom(object);
        let pathVariant = getLatestPath(object);
        let originalPathIndex = -2; // negative 2 to skip over the temporary new path, since it will be added and then removed
        
        // Copy the newly created "default" path over as an alternate of the path before it.
        let originalPath = roomContainingPaths.paths.at(originalPathIndex);
        originalPath.addVariant(input, pathVariant.buttonPrompt, pathVariant.targetRoomKey, pathVariant.paragraphs, pathVariant.givenSignals, pathVariant.takenSignals, pathVariant.requiredItems, pathVariant.givenItems, pathVariant.takenItems);

        roomContainingPaths.paths.pop(); // remove temporary path variant's unique spot

        object.build.latestPath = getLatestRoom(object).paths.at(-1).variants[input]; //most recent path
        object.build.latestEither = getLatestRoom(object).paths.at(-1).variants[input]; //most recent path

    } else { // Alter Latest Room
        // in the text, `#roomKey` will appear before `~signalName`. It will already be defined in the list of rooms.
        // because `#roomkey# will have the same key as the original room, the room creator adds a '_' to avoid overwriting it.
        // This block will:
        // - assume that the latest room is meant to be a variant
        // - add it as a variation of the original room (room with the same key, but without the _)
        // - remove the temporary room
        // - set the variation room as the latest room


        let roomVariant = getLatestRoom(object);
        let originalRoom = object.rooms[object.build.latestKey];

        originalRoom.addVariant(input, roomVariant.givenLocation, roomVariant.paragraphs, roomVariant.paths);

        let temporaryKey = object.build.latestKey + "_"
        delete object.rooms[temporaryKey]; // delete roomVariant

        object.build.latestRoom = originalRoom[input];
        object.build.latestEither = originalRoom[input];
        
    }

}

function addPath(input, object) {
    let path = new Path(input, object.build.latestKey);

    getLatestRoom(object).paths.push(path);

    object.build.latestPath   = getLatestRoom(object).paths.at(-1).default; //most recent path
    object.build.latestEither = getLatestRoom(object).paths.at(-1).default; //most recent path
}

function setTargetRoomKey(input, object) {
    getLatestPath(object).targetRoomKey = input;
}

function addGivenSignal(input, object) {
    getLatestPath(object).givenSignals.push(input);
}

function addTakenSignal(input, object) {
    getLatestPath(object).takenSignals.push(input);
}

function addRequiredItem(input, object) {
    getLatestPath(object).requiredItems.push(input);
}

function addGivenItem(input, object) {
    getLatestPath(object).givenItems.push(input);
}

function addTakenItem(input, object) {
    getLatestPath(object).takenItems.push(input);
}