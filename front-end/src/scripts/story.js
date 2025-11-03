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

let compiled = build(roomSyntaxInput, customSyntax);


export default new World(compiled.rooms, compiled.items, "rock cave", ["journal"]);