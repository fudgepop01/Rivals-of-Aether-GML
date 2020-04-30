import { writable } from 'svelte/store';

export const moveSource = writable('');
window['move_source'] = moveSource;

export const debugSource = writable('');
window['debug_source'] = debugSource;

export const loadSource = writable('');
window['load_source'] = loadSource;

export const initSource = writable('');
window['init_source'] = initSource;

export const soundSources = writable({empty: true});
window['sound_sources'] = soundSources;

export const spriteSources = writable({empty: true});
export const spriteData = writable({});
window['sprite_sources'] = spriteSources;