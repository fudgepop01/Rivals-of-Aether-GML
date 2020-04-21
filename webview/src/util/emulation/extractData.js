import { get } from 'svelte/store';

import { currentFrame } from '../../store/windows';
import getNewBase from './gameStateBase';
import GS, { timeline as TL, setCompiled } from '../../store/gameState.js';
import { timeline as TLSimple } from '../../store/gameState_editor.js';
import { spriteData } from '../../store/user_data_store.js';
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
    'move'
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

  const compiled = gmlive.compile(sources);
  setCompiled(compiled);

  const gameState = getNewBase();
  linkSprites(gameState);
  initialize(compiled, gameState);

  if (mode === 'moveEditor') {
    TLSimple.recalculateFrames(Object.values(gameState.instances.self.attacks)[0].modified);
    spriteData.set(gameState.resources);
    return Object.values(gameState.instances.self.attacks)[0].modified;
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
 bair
 dair
 dattack
 dspecial
 dstrong
 dtilt
 fair
 fspecial
 fstrong
 ftilt
 jab
 nair
 nspecial
 taunt
 uair
 uspecial
 ustrong
 utilt
 update
 animation
 pre_draw
 post_draw
*/