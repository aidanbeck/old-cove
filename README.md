# Old Cove

### Remaining Feature Goals
- Compile .txt's through syntaxlor on runtime for faster prototyping.
 - Syntaxlor should be made into its own package
 - Design how syntax should be loaded / stored
 - .txt's should be separatable, and a main file should load them one by one for organization

- Signal or command for detecting if the player has an item
- command to cross an option out if signal exists
- command to cross out an option if sigal *doesn't* exist. Or should there be a ! operator for all recieving signals?
- design: should there be signal operators for multiple signals? &&'s or ||'s? should signal preferences be ranked? should I have made each signal not a key but its own class?
- Items should be their own functional rooms with their own state-affecting buttons, or even have multiple "rooms" inside of them, so you can read a journal or interact with a cell phone.

- Story
 - I need an ending
 - 3 act structure, each with its own mysteries, stories, each 20-40 minutes
 - I need strong themes
 - I need compelling "gameplay", not just key hunts
  - electrical power binary switches
  - daylight cycle tide moving in / out?
    - should there be a time system?
    - it would be really cool if there were semi random events. If signals could toggle every x turns
    - should signals still be strings on the recieving end, but have more parameters themselves?
    - should all signals exist from the beginning of the game and be true/false flags?


- TDD scripts for QA
 - check every paragraph and prompt for a capital letter at the beginning & period at the end.
 - check every targetKey for a corresponding room
 - send warnings if these are not met
 - check every item to make sure it really exists
 - have a route checker that records routes and should arrive at the correct ending spot *could utilize a demo system


- Saving & Loading
 - items, position, signals

- Demo system
 - record every user input
  - pathindex
  - ui Item
  - ui Location
 - record their time since last input
 - have a system to play back the demo
 - have a system to vary the speed
 * this could be useful for playtests

- Mobile responsiveness
 - Change blurrineess on background image
 - button reactivity
 - design ui for items & locations
  - should it be on the top or the bottom?
 - implement ui for items & locations
  - library? react component?

- React Native for mobile ports
- Integrate in-app purchase for mobile ports

- Integrate Google ads


**Expensive / Low Priority Before Shipping**
- Scanned drawings within notable paragraphs
- Scanned drawings for item icons
- customized background painting images for different areas
- immersive footstep / door opening sounds for actions & choices.
- Ambient noise 
- useRef / useState should be optimized (Expensive, low prioirity for shipping)
- Components should be better organized (Expensive, low priority for shipping)