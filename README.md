## Features

- autocompletion for RoA-specific consts, variables, and functions
- syntax highlighting for RoA-specific consts, variables, and functions
- a (basic) visualizer for RoA workshop moves.

that's about it (for now)

## Known Issues

none yet(?)

## Release Notes

### 1.3.0

bugfixes:
- angles will no longer be flipped vertically (oops)

features:
- added a menu to toggle various elements.
- added a trajectory display that will visualize the path an opponent will take
  - this will not take DI into account
  - the right side of the menu is for adjusting the attributes of the opponent

Quality of Life:
- added a button that will automatically fetch the required resources
  - this will only work properly if your top workspace is structured as a workshop character

### 1.2.0

bugfixes:
- using local variables with set/get_whatever_value crashed the webview

features:
- there's now an arrow that shows a hitbox's direction that scales in length with the knockback of the move
- hitboxes with parents will inherit the properties of that parent

### 1.1.2

bugfixes:
- fixed bug preventing visualizer from working if a gml file wasn't opened

### 1.1.0

bugfixes:
- better syntax highlighting
- fixed issue with the ease_back functions

features:
- **new (basic) visualizer added**!
  - press `Ctrl + P (windows) or Cmd + P (mac)` to bring up the command palette, then
    pick "open RoABox." You'll need to set it up by giving it the proper resources, and for now it's still in its *very*
    early stages, but it still may be helpful to quickly see what a move might look like.

### 1.0.0

Initial release
