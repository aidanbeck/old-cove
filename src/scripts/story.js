import { Item, Paragraph, Path, Room, World } from './world.js';
import { customSyntax, build } from './syntax.js';

/*
    Import all .txt files in ./rooms/ folder as raw text.
    To my understanding, this Vite feature bundles the JS into the build itself. It might affect download speeds.
    Once the story is complete, I may refactor to use JSON files that can be loaded per area.
    For now, it maximizes iteration speed since I can edit or create room files without even adding file names to the project.
*/
const roomFiles = import.meta.glob('./rooms/*.txt', { query: '?raw', import: 'default', eager: true });

let roomSyntaxInput = '';

for (let roomFileText of Object.values(roomFiles)) {
    roomSyntaxInput += roomFileText;
    roomSyntaxInput += '\n';
}

let rooms = build(roomSyntaxInput, customSyntax).rooms; // .rooms is clunky, perhaps syntaxlor should export differently.

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

export default new World(rooms, items, [], [], ["rock cave"], "rock cave");