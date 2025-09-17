// conditionals could be constructed like this
function libraryDoorOpen(world) { // convention: name of signal emitted?
 let shouldOpen = world.hasSignal("libraryPowered") && world.hasItem("library card");
 if (shouldOpen) {
  world.addSignal("libraryDoorOpen");
 }
}

// item detection signals could be automatically generated like this
function hasItemSignals(world) {
 for (let item of world.items) {
  if (world.hasItem(item)) {
   world.addSignal(`has.${item}`);
  } else {
   world.removeSignal(`has.${item}`);
  }
 }
}

// the abscence of a signal could be generated like this
// though, the signals you want an opposite of must be pre-defined
// even then, it could fetch every signal in the world that starts with a ! and create that list dynamically
function oppositeSignals(world) {
 let originalSignals = ["beatenGame", "bleeding", "foundKiller"]; // pre-defined list of signals needing opposites
 
 for (let signal of originalSignals) {
  if (world.hasSignal(signal)) {
   world.removeSignal(`!${signal}`);
  } else {
   world.addSignal(`!${signal}`);
  }
 }
}

/*
    Things Behaviors can Create:
    - semi-random events
    - binary states (power, weather, tide, daylight)
    - increment new values declared in "world"
     - time & weather states could affect descriptions often

    It would be cleaner to make signals a more complicated data type with these capabilities built in,
    or add syntax to support conditionals and item detection and everything else I might want.
    However, right now I cannot predict everything the system should do.
    If I try to account for everything, I will spend significant time on meaningless implementations and will still miss some functionality.
    This is hacky but very dynamic. Designing Old Cove will teach me what kind of functionality is important to build in for my next project.
*/

export default [
    libraryDoorOpen,
    hasItemSignals,
    oppositeSignals
];