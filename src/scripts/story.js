import { Item, Paragraph, Path, Room, World } from './world.js';
import compiledRooms from './rooms.json' with { type: 'json' };

let rooms = compiledRooms.rooms; // I will decide later if syntaxlor will compile to an entire world, or just rooms.
                                 // For now, forgive the messy conversion.

let items = {
    "axe": new Item("🪓 dull axe", ["You hold its wooden handle carefully to avoid splinters."]),
    "key": new Item("🔑 bronze key", ["It shines, but you can't make out your reflection."]),
    "hammer": new Item("🔨 rusty hammer", ["For when everything looks like a nail."]),
    "torch": new Item("🔦 torch", ["Miraculously it still turns on."]),
    "envelope": new Item("📧 envelope", ['\"Dear...\"', "You can't bear to read the rest."]),
    "bandage": new Item("🩹 bandage", ["You can't get hurt in this game... can you?"]),
    "rope": new Item("🧵 rope", ["A long time ago, this was used to tie ships to the docks in the harbor."]),
    "shell": new Item("🐚 sea shell", ['You lift it up to your ear.','The familar sound of waves greets you like a call from an old friend.']),

    "pamphlet": new Item("📄 pamphlet", ["It outlines various library & summer reading programs."]),
    "match": new Item("📍 match", ["One strike can set anything ablaze."]),

    "glass shard": new Item("💠 glass shard", ["Pointy and dangerous."])

}

// library
let newPara = new Paragraph("It's the library!");
newPara.addAlteration("burned", "Oh no! The library burned down!");
let newPath = new Path("exit the door", "outside", [], [], [], ["pamphlet"], []);
newPath.addAlteration("burned", "exit the window", "outside", [], ["getCut"], ["axe"], ["glass shard"], []);
let newRoom = new Room("library", [newPara], [newPath]);

// outside
let newPara2 = new Paragraph("It's the outside! The library is nearby.");
newPara2.addAlteration("burned", "The fresh outside air is overwhelmed by smoke.");
let newPath2 = new Path("enter the library", "library", [], [], ["key"], [], []);
newPath2.addAlteration("burned", "enter the flame-covered door", "library", [], [], ["axe"], [], []);
let newPath3 = new Path("set library on fire", "outside", [], ["burned"], [], [], ["match"]); //evil!
newPath3.addAlteration("burned","Empty","outside", [], [], [], [], []);
let newRoom2 = new Room("outside", [newPara2], [newPath2, newPath3]);

let roomies = {
    "library": newRoom,
    "outside": newRoom2
}

let gameWorld = new World(roomies, items, [], ["axe", "match", "key"], ["outside"], "outside");

function printRoom() {
    let roomAlteration = gameWorld.getAlteration(gameWorld.positionRoom);
    let paragraph0 = gameWorld.getAlteration(roomAlteration.paragraphs[0]);
    let prompts = roomAlteration.paths;
    console.log(paragraph0);
    console.log(gameWorld.inventory);
    console.log(gameWorld.signals);
    console.log("\n");
}

// printRoom();
// gameWorld.choosePath(1);
// printRoom();
// gameWorld.choosePath(0);
// printRoom();


export default gameWorld;