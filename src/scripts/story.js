import { AlterPath, AlterDesc, Item, Path, Room, World } from './world';

// to make a "give item" option, make the option link to the room it's in. Have it give an item. Make a description of the user picking it up.

// to make a titled locatin, set the giveLocation option to a key name of a room. That location will then send the player to that room. You can set multiple rooms to the same location
// so you could have lighthouse1, lighthouse2, but have them all give "lighthouse". This way it will show you that you're in a lighthouse.

// to make a choice influence the current room, set the starting path to the same room. set the alter path to the new room with a new description, and overwrite the og path.


let axe = new Item("🪓 dull axe", ["You hold its wooden handle carefully to avoid splinters."]);
let key = new Item("🔑 golden key", ["It shines, but you can't make out your reflection."])

// Create World Data
let beachPaths = [
    new Path("lighthouse", "go to lighthouse"),
    new Path("town", "go to the town"),
    new Path("cave", "go to the cave")
]

let townPaths = [
    new Path ("sandy beach", "return to the beach.")
]

let lighthouseAlters = [
    new AlterDesc("lighthouse", ["The lighthouse shines bright. The barrel lies in fragments, revealing the door."]),
    new AlterPath("lighthouse", 3, new Path("the light", "enter the lighthouse."))
]


let lighthousePaths = [
    new Path("sandy beach", "return to the beach"),
    new Path("lighthouse", "take key", ["You take the key."], key),
    new Path("lighthouse", "destroy the barrel.", ["you break the barrel with the axe.", "It snaps in half, but gets the job done."], '', axe, true, lighthouseAlters, 1)
]

let lightPaths = [
    new Path("lighthouse", "climb back down")
]

let cavePaths = [
    new Path("sandy beach", "exit the cave"),
    new Path ("storage room", "open locked door", ["the door creaks open"], '', key)
]

let storagePaths = [
    new Path("cave", "return to the cave"),
    new Path("storage room", "take axe", ["you pick it up"], axe)
]

let rooms = {
    "sandy beach": new Room("sandy beach", ["the beach is sandy"], beachPaths, ""),
    "town": new Room("town", ["everyone's moved on now."], townPaths, ""),
    "lighthouse": new Room("lighthouse", ["the lighthouse shines bright. There is a barrel blocking the way in."], lighthousePaths, "lighthouse"),
    "cave": new Room("cave", ["It's hard to see in here"], cavePaths, "cave"),
    "storage room": new Room('storage room', ["no one's been here for a long time"], storagePaths, ""),
    "the light": new Room ('the light', ["the view is beautiful."], lightPaths, "the light")
}

let gameWorld = new World(rooms, "sandy beach", [], []);

export default gameWorld;