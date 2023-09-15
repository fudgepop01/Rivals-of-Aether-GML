import { get } from 'svelte/store';

import { currentFrame, selectedWindow } from '../../store/windows_editor';
import getNewBase from './gameStateBase';
import GS, { timeline as TL, setCompiled } from '../../store/gameState.js';
import { timeline as TLSimple } from '../../store/gameState_editor.js';
import { spriteData } from '../../store/user_data_store.js';
import { displayModeIndex, displayModes, hiddenHitboxes } from '../../store/renderOptions';
import getData from './instructions';
import { animationNames } from './constantLookup';

const linkSprites = (gameState) => {
  const spriteSources = get(window['sprite_sources']);
  for (const spriteName of Object.keys(spriteSources)) {
    const matchData = spriteName.match(/(?<name>.+)_strip(?<frameCount>\d+)\.(?<ext>.+)/);

    if (!matchData) {
      gameState.resources[spriteName] = {
        frameCount: 1,
        img: spriteSources[spriteName]
      }
    } else {
      gameState.resources[matchData.groups.name] = {
        frameCount: parseInt(matchData.groups.frameCount),
        img: spriteSources[spriteName]
      }

      if (animationNames.includes(matchData.groups.name)) {
        gameState.instances.self.animLinks[matchData.groups.name] = gameState.resources[matchData.groups.name];
      }
    }
  }
}

const initialize = (compiled, gameState) => {
  const scripts = compiled.scriptMap;
  const initOrder = [
    'init',
    'load',
    'move',
    'debug'
  ];

  for (const scriptName of initOrder) {
    if (scripts['_' + scriptName]) getData(scripts['_' + scriptName].node, gameState, scriptName);
  }
}

export default async (mode) => {
  const gmlive = window['gmlive'];

  let sources = [
    new gmlive.source(`_init.gml`, get(window['init_source'])),
    new gmlive.source(`_load.gml`, get(window['load_source'])),
    new gmlive.source(`_move.gml`, get(window['move_source']))
  ];

  let debugSrc = get(window['debug_source']);
  if (debugSrc.length > 0) sources.push(new gmlive.source('_debug.gml', debugSrc));

  const compiled = gmlive.compile(sources);
  setCompiled(compiled);

  const gameState = getNewBase();
  linkSprites(gameState); 
  initialize(compiled, gameState);

  if (mode === 'moveEditor') {
    currentFrame.set(0);
    selectedWindow.set(0);
    // preprocess for debugging script
    const DISPLAY_MODES = gameState.instances.self.fields['__DISPLAY_MODES'];
    if (DISPLAY_MODES) {
      displayModes.set([">default<"].concat(DISPLAY_MODES.split(',')));
      if (get(displayModeIndex) != 0 && typeof gameState.instances.self.fields['__WINDOW_SEQUENCE'] === "string") {
        const windows = Object.values(gameState.instances.self.attacks)[0].modified.windows;
  
        const outWindows = {};
        let currentWin = 1;
        for (const entry of gameState.instances.self.fields['__WINDOW_SEQUENCE'].split(',')) {
          const matchData = entry.match(/(?<window>\d+)(?:x(?<repeater>\d+))?/);
          if (matchData.groups.repeater) {
            for (let i = 0; i < parseInt(matchData.groups.repeater); i++) {
              outWindows[currentWin] = {_name: matchData.groups.window, ...windows[parseInt(matchData.groups.window)]};
              currentWin++;
            }
          } else {
            outWindows[currentWin] = {_name: matchData.groups.window, ...windows[parseInt(matchData.groups.window)]};
            currentWin++;
          }
        }
        Object.values(gameState.instances.self.attacks)[0].modified.windows = outWindows;
      }
    } else {
      displayModes.set([]);
    }

    const HIDDEN_HITBOXES = gameState.instances.self.fields['__HIDDEN_HITBOXES'];
    if (HIDDEN_HITBOXES && typeof gameState.instances.self.fields['__HIDDEN_HITBOXES'] === "string") {
      hiddenHitboxes.set(HIDDEN_HITBOXES.split(','));
      // console.log(get(hiddenHitboxes));
    } else {
      hiddenHitboxes.set([]);
    }

    console.log(gameState);

    // actually generate the output
    const out = {...Object.values(gameState.instances.self.attacks)[0].modified, vars: gameState.instances.self.fields};
    TLSimple.recalculateFrames(out);
    spriteData.set(gameState.resources);
    return out;
  } else {
    GS.set(gameState);

    currentFrame.set(0);
    TL.nextFrame(0);

    console.log(compiled);
    console.log(gameState);
  }
}

/*
 init
 load
 
 *attack updates in alphabetical order*

 update
 animation
 pre_draw
 post_draw
*/