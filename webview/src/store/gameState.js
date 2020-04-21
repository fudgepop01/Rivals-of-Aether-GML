import RFDC from 'rfdc';
import { writable, get } from 'svelte/store';
import getData from '../util/emulation/instructions';
import getNewBase from '../util/emulation/gameStateBase';
import gameLogicLoop from '../util/emulation/gameLogicLoop';
const clone = RFDC()

const gameState = writable(getNewBase());
export default gameState;

export const cloneFrame = (f) => {
  let cloned = {};
  for (const [name, inst] of Object.entries(f.instances)) {
    cloned[name] = {
      animLinks: inst.animLinks,
      fields: clone(inst.fields)
    }

    if (inst.attacks) cloned[name].attacks = clone(inst.attacks);
  }

  return {
    resources: f.resources,
    instances: cloned
  }
}

let compiled = null;
let debugFile = '';
export const setCompiled = (cmp) => compiled = cmp;
export const setDebugFile = (fname) => debugFile = fname;

const nextState = (frame) => {
  if (!compiled) return;

  const scripts = compiled.scriptMap;
  const scriptOrder = [
    '__DEBUG_FILE__',
    '__LOGIC__',
    'update',
    'animation',
    'pre_draw',
    'post_draw'
  ];


  const $gameState = get(gameState);
  for (const scriptName of scriptOrder) {
    if (scriptName === '__LOGIC__') gameLogicLoop($gameState);
    else if (scriptName === '__DEBUG_FILE__') getData(scripts['_' + debugFile].node, $gameState, debugFile);
    else if (scripts['_' + scriptName]) getData(scripts['_' + scriptName].node, $gameState, scriptName);
  }
  gameState.set($gameState);
  return $gameState;
}

const timelineFactory = () =>{
  const myStore = writable([]);
  const { set, update, subscribe } = myStore;

  return {
    subscribe,
    nextFrame(idx) {
      if (!idx) idx = 0;
      update(n => {
        if (idx < n.length) {
          if (idx !== 0) gameState.update(oldstate => Object.assign(oldstate, cloneFrame(n[idx - 1])));
          n.length = idx;
        }
        const NS = nextState(idx);
        n.push(cloneFrame(NS));
        return n;
      });
    },
    getFrame(fNum) {
      return get(myStore)[fNum];
    },
    clear() {
      set([]);
    }
  }
}

export const timeline = timelineFactory();