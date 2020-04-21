import { writable, derived } from 'svelte/store';
import { timeline } from './gameState';

export const currentFrame = writable(0);
export const selectedWindow = writable(-1);

const randColor = () => {
  return `#${
    Math.floor(Math.random() * 105 + 150).toString(16).padStart(2, '0') +
    Math.floor(Math.random() * 105 + 150).toString(16).padStart(2, '0') +
    Math.floor(Math.random() * 105 + 150).toString(16).padStart(2, '0')}
  `;
}

export const windows = derived(
  timeline,
  $timeline => {
    if ($timeline.length === 0) return [];
    const out = [];
    let currSectionLength = 0;
    let lastState = $timeline[0].instances.self.fields.state;
    for (const frame of $timeline) {
      currSectionLength ++;
      if (frame.instances.self.fields.state !== lastState) {
        out.push({
          name: lastState,
          color: randColor(),
          frameCount: currSectionLength
        })
        lastState = frame.instances.self.fields.state;
        currSectionLength = 0;
      }
    }
    out.push({
      name: lastState,
      color: randColor(),
      frameCount: currSectionLength
    });
    return out;
  }
);
export const frameCount = derived(
  windows,
  $windows => {
    return $windows.reduce((acc, win, i) => {
      return acc + win.frameCount;
    }, 0)
  }
)
export const windowPositions = derived(
  windows,
  $windows => {
    let out = [];
    let tracker = 0;
    for (const win of $windows) {
      out.push(tracker);
      tracker += win.frameCount;
    }
    return out;
  }
)

const createPlaySpeed = () => {
  const { update, subscribe } = writable(1);

  return {
    subscribe,
    increase() {
      update(n => {
        return (n === 0.25) ? 0.5 : 1;
      })
    },
    decrease() {
      update (n => {
        return (n === 1) ? 0.5 : 0.25;
      })
    }
  }
}
export const playSpeed = createPlaySpeed();
