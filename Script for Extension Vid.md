# Script for Extension Vid

## Intro

hello everyone

today I would like to show off this extension I developed. It helps those that make characters for Rivals of Aether err... make... characters. It has a number of features I'd like to show off, so lets dive in.

The character I'm using to show off these features is **kirby** by Luna, Anguish, and Ludi - the link to which I'll show on screen now, and put down in the description.

## Setup

To get this extension, you'll need an editor called visual studio code. You can download it here. A link to it is also in the description. 

Once that's installed, navigate to the extensions panel on the side and search up "Rivals of Aether." Select "Rivals of Aether GML Support" by `fudgepops`, and click the install button.

congratulations, the extension is now installed and you're ready to take advantage of its features.

## Features

### Text-Based

First, lets go through the features that will help you write the code itself, starting with

#### Syntax Highlighting

Everything is highlighted properly, including things that are specific to the subset of GML by YellowAfterLife that's available to modders, such as define/macro and template strings.

#### Autocompletion

This extension has built-in autocompletion for every builtin function and variable available to modders. Things that aren't functions even have a little description when you go to autocomplete it. I tried to include everything, but if there is something missing let me know on discord or open an issue on the github repository and I'll fix it in the future.

### Visualizer

With those features down, its time to turn our attention to the visualizer. To open this, press **Control + Shift + P** if you're on windows, or **Command + Shift + P** on a mac to bring up what's called the `command palette`. This is an extremely useful feature of vscode that lets you execute built-in commands by searching for them and pressing `enter`.

Here, we want to enter `open RoABox`. A panel should appear to the right of your code asking for some resources. To set this up, **right click** on the resources that it needs and click "**open file in RoABox**" or "**Send folder to RoABox as a resource**." The resources should turn green as you do this.

Alternatively, if your workspace is structured like a workshop character, you can just go ahead and click the "fetch from workspace root" button and get the necessary files that exist automatically.

Next, **right click** on whatever attack you wish to visualize and click "**open file in RoABox**." 

Once every resource is sent to RoABox, it will automatically move on to the actual fun part: the visualizer itself. Now I can talk about all its cool features~

#### Default Visualization

This is a fairly powerful tool that will visualize whatever attack you give it. However, it will not take any other gml files into account - just `init`, `load`, and the attack file you gave it. This saves me from pulling my hair out trying to duplicate the entire physics engine of Rivals of Aether in javascript for free so uhh... this is the best I got.

**ANYWAY** --

There are multiple things that you can see right off the bat, such as this timeline. Each block represents a window, and you can see the window's number in the block's top-left corner. You can also click around on the timeline to jump to different frames. By pressing the play button, the animation will play. Over in the top-right you can slow down and speed up the playback.

#### Hitboxes

this visualizer will also display hitboxes. You can see an arrow on these hitboxes which represents the angle that the opponent will fly [**note: does not take angle flip into account**], along with a length which represents an approximation of the knockback. 

You can toggle these on and off with the options down below.

#### Knockback Lines

By clicking on a hitbox you'll see an approximation of where the opponent will fly given the settings chosen for the target down below. You can see and adjust everything that goes into this calculation, and the knockback line will be adjusted accordingly. There are also presets for these values for each character in the game. 

You can also adjust the length of this line in frames. When the line is red, that means the target will still be in hitstun. When the line is blue, the target is out of hitstun.

Like hitboxes and their angles, this can also be disabled.

#### Character Movement

Attack windows are able to be given an attribute that makes them move the character. There are a number of ways this can be configured, and this visualization accounts for and shows all of them. 

#### Hurtbox Display

This is an option that is off by default. if the move has a hurtbox given, as long as its sprite exists in the sprites folder, it will overlay the hurtbox of the character during the move onto the screen. This is useful for looking at disjoints and the like.

You can also adjust the opacity of this overlay.

#### Projectiles

Something I'm quite proud of is the ability to display projectiles. These are quite complicated, for they move independently of the character and have their own physics. Not only this, but they can also be given sprite offsets. I'm happy to report that all of these have been taken into account *to the best of my ability.*

As such, if there is something unexpected, let me know - but there's no guarantee that I can fix it quickly.

These projectiles act just like hitboxes. They all have angles, and can all be clicked just like a hitbox to see the trajectory line. Because they are effectively a hitbox internally in RoABox, turning off hitboxes will also turn off the display of projectiles (or at least their sprites).

If the sprite is unavailable or is one that is part of Rivals of Aether, then instead of the sprite itself, a standard hitbox will appear.

### Debug Mode

And now for something that I think is REALLY cool:

Say you have a move with multiple different outcomes depending on variables elsewhere in the character's files. Normally, the visualizer displays windows sequentially so it won't really be able to show the move very well at all. That's where this special mode comes in!

By making another folder in your scripts folder called "**extension**" and making a file named the same as an attack, you have opened up quite a few new options for displaying your move.

These special files contain gml code that is only run for the visualizer. With these, you can make presets for each move that you can adjust on the fly in the visualizer with ease. This is done using three special variables I have hard-coded to work a certain way in the context of the visualizer:

1. **DEBUG_TYPES**
2. **DEBUG_TYPE**
3. **WINDOW_SEQUENCE**

**DEBUG_TYPES** is a variable that you can set in this file. It should be a string containing the names of different types of debug paths you want to make available, each separated by commas. 

As soon as this variable is set, you get access to **DEBUG_TYPE** gets injected into the code, and will always be whatever is selected in the visualizer.

Finally, **WINDOW_SEQUENCE** is a comma-separated sequence of numbers that represent the move's windows. By setting this, the windows will no-longer operate in a linear fashion. instead they'll follow the order that you specify. You can also easily repeat windows by adding "x" followed by the number of times you wish to repeat that window. This can be useful for conceptualizing an attack with a charge or something.

By using these special variables together, you can create, for instance, a series of windows that you can switch between based on what you want to visualize. 

Not only this, but you can also set window and hitbox indexes right from within this file - just incase you want to see what will happen, or quickly compare multiple different tweaks.

 ## Wrapping Up

And there you have it! I won't get into how all the code works unless there's some sort of demand for that. Maybe consider liking the video if you want to see that happen at some point? And if I don't get around to it, the code is on github for anyone curious.

Thank you for watching, and happy creating!