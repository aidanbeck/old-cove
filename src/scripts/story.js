import { AlterPath, AlterDesc, Item, Path, Room, World } from './world';

// to make a "give item" option, make the option link to the room it's in. Have it give an item. Make a description of the user picking it up.

// to make a titled locatin, set the giveLocation option to a key name of a room. That location will then send the player to that room. You can set multiple rooms to the same location
// so you could have lighthouse1, lighthouse2, but have them all give "lighthouse". This way it will show you that you're in a lighthouse.

// to make a choice influence the current room, set the starting path to the same room. set the alter path to the new room with a new description, and overwrite the og path.

let R = {}; // Object of all rooms

// Items
let axe = new Item("🪓 dull axe", ["You hold its wooden handle carefully to avoid splinters."]);
let key = new Item("🔑 bronze key", ["It shines, but you can't make out your reflection."]);
let hammer = new Item("🔨 rusty hammer", ["For when everything looks like a nail."]);
let torch = new Item("🔦 torch", ["Miraculously it still turns on."]);
let envelope = new Item("📧 envelope", ['\"Dear...\"', "You can't bear to read the rest."]);
let bandage = new Item("🩹 bandage", ["You can't get hurt in this game... can you?"]);
let rope = new Item("🧵 rope", ["A long time ago, this was used to tie ships to the docks in the harbor."]);
let shell = new Item("🐚 sea shell", ['You lift it up to your ear.','The familar sound of waves greets you like a call from an old friend.']);

R['i'] = new Room(
    '',
    ['d'],
    [
        new Path('id','prompt',[]),
        new Path('id','prompt')
    ],
    '' //giveLocation
);



R["rock cave"] = new Room(
    "rock cave",
    [ // descriptions
        "It is too dark to see. The air is cold and still.",
        "You feel around in a panic, finding the ground after a moment.",
        "It feels like stone."
    ],
    [
        new Path("rock cave 3", 'Stumble left.', ['The floor slopes downwards as you cautiously inch forward.']),
        new Path("rock cave 2", 'Stumble right.', ['You feel your way against the ground, clinging to any surface you can find.']),
    ],
    'rock cave', // giveLocation
);

R['rock cave 2'] = new Room(
    '',
    ['There is light!', 'The edges of the cave are dim but visible. Ahead is a gradual climb leading to a small opening. It glows white from the sky behind it.'],
    [
        new Path('sandy beach','Climb.',['You scamper up the rocks and past the threshold, emerging into the open.']),
        new Path('rock cave','Descend.', ['You walk back into the darkness.'])
    ],
    '' //giveLocation
);

R['rock cave 3'] = new Room(
    '',
    ['You extend your foot to feel the ground ahead of you, but are met only with air. You bend your leg to feel the extent of the dropoff, but you cannot feel the bottom.',
        'You drop a nearby rock over the side and hear it knock against the sides of the cavern.', 'Each knock sounds farther and farther away.'
    ],
    [
        new Path('rock cave','Turn around.', ['You return, moving with even more caution.']),
        new Path('rock cave 4','Descend.', [], '', rope), //TODO
    ],
    '' //giveLocation
);



R['sandy beach'] = new Room(
    '',
    ['The wind flows over the beach and carries the smell of sea salt. A strip of sand runs between a tall cliff and crashing waves.',
        'Rock Cave is embedded in the cliff. On a large rock near the entrance, a conch shell sits propped up as if it were displayed there.'
    ],
    [
        new Path('sandy beach 2','Walk along the beach.', ['As you walk along the sea, you notice something poking out of the waters in the distance.','You squint, but you can\'t make it out from here.']),
        new Path("sandy beach", "Take the seashell.", ["It's beautiful."], shell),
        new Path('rock cave 2','Enter the cave.'),
    ],
    'sandy beach' //giveLocation
);

R['sandy beach 2'] = new Room(
    '',
    ['The cliff veers away from the ocean and the beach widens. In the distance, you can see a lighthouse over a large hill. Overgrown with shrubs and driftwood, a trail zig-zags to the top.',
        'On the beach, an old sailboat lays on its side. Piles of sand have accumulated at its base, all but burying it.'
    ],
    [
        new Path('a road','Follow the trail.', ["Excited to reunite with civilization, you climb the hill."]),
        new Path('ol\' reliable','Investigate the boat.', ['You brush a thin layer of sand off the side of its stern.']),
        new Path('sandy beach','Head towards Rock Cave.')
    ],
    '' //giveLocation
);

R['ol\' reliable'] = new Room(
    '',
    ['Written on the stern in faded paint is the ship\'s name: "ol\' reliable". It remains mostly intact despite its situation.',
        'The cabin door is locked, and through the window you can see it\'s filled with sand that covers most of its contents. However, an old axe still seems salvageable.'
    ],
    [
        new Path('ol\' reliable','Salvage axe.', ['You unlock the door. With your bare hands, you dig it out of the sand.'], axe, key),
        new Path('sandy beach 2','Return to the beach.')
    ],
    'ol\' reliable' //giveLocation
);


R['a road'] = new Room(
    '',
    ['At the top of the hill, the trail connect to a dirt road. It doesn\'t look like anyone has been here in a long time. The road continues towards the lighthouse, passing a tent marked with a red cross.'],
    [
        new Path('infirmary tent','Enter the infirmary tent.', ['You push open the flaps and duck into the tent.']),
        new Path('lighthouse','Walk to the lighthouse', ['You begin walking towards it, before stopping in shock. The light has turned on.'])
    ],
    'a road' //giveLocation
);

R['infirmary tent'] = new Room(
    '',
    ['Small single bunks line the sides of the tent, each with a trunk beneath it. An old coat hangs on the closest bed post. You might be able to find some supplies.'],
    [
        new Path('a road', 'Exit the tent.', ["You're happy to be out of there."]),
        new Path('infirmary tent','Search the cabinet.',["You discover a bandage."], bandage),
        new Path('infirmary tent','Search the trunks', ["You discover an envelope containing a letter. It's familiar."], envelope),
        new Path('infirmary tent','Search the coat.',["You search the pockets. In the last one you check, you find a key."], key),
        
    ],
    '' //giveLocation
);


R['lighthouse'] = new Room(
    '',
    ['The lighthouse sits on the edge of a cliff, defiantly piercing the seascape behind it.',
        'You try the door, but it seems jammed.'
    ],
    [
        new Path('a road','Return to the road.'),
        new Path('lighthouse','Force it open.', ['You swing the axe at the door- it doesn\'t budge. You try again, harder this time, and it cracks.',
            'The axe head snaps from the end of the handle, embedding itself in the door as it lurches wide open.'
        ], '', axe, true, [
            new AlterDesc('lighthouse', ['The lighthouse sits on the edge of a cliff, defiantly piercing the seascape behind it.', 'The door is wide open, the head of an axe embedded into its front.', 'What used to be a handle is now splinters on the ground.']),
            new AlterPath('lighthouse',2,new Path('lighthouse 2', 'Enter.', ['You hesitate before walking inside.']))
        ], 1)
    ],
    'lighthouse' //giveLocation
);

R['lighthouse 2'] = new Room(
    '',
    ['There is a table inside with a hammer and a handwritten note.'],
    [
        new Path('lighthouse', 'Exit.'),
        new Path('lighthouse 2','Take Hammer',['Maybe you could fix the door?'], hammer),
        new Path('lighthouse 2','Read Note', ['It says...', '"Thank you for playing my demo! My deadline is in 10 minutes, so that\'s all there is for now -Developer"','What a strange thing to find.'])
    ],
    '' //giveLocation
);





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

let gameWorld = new World(R, "rock cave", [], []);

export default gameWorld;