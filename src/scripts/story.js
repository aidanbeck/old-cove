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
    "shell": new Item("🐚 sea shell", ['You lift it up to your ear.','The familar sound of waves greets you like a call from an old friend.'])
}

// create new room with functions
let newPara = new Paragraph("It's the library!");
newPara.addAlteration("burned", "Oh no! The library burned down!");
let newPath = new Path("exit the door", "outside", [], [], [], ["pamphlet"], []);
newPath.addAlteration("burned", "exit the window", "outside", [], ["getCut"], ["axe"], ["glass shard"], []);
let newRoom = new Room("library", [newPara], [newPath]);

console.log(JSON.stringify(newRoom));

let gameWorld = new World(rooms, items, [], ["axe"], ["lighthouse"], "lighthouse");

export default gameWorld;