import { writable, derived } from 'svelte/store';
import { timeline } from './gameState_editor';

export const currentFrame = writable(0);
window['current_frame'] = currentFrame;
export const selectedWindow = writable(-1);
window['selected_window'] = selectedWindow;

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
    let lastWindow = $timeline[0].winIdx;
    for (const [idx, frame] of $timeline.entries()) {
      currSectionLength ++;
      if (frame.winIdx !== lastWindow) {
        const lastFrame = $timeline[idx - 1];
        out.push({
          name: (lastFrame._name) ? lastFrame._name : lastWindow + 1,
          color: randColor(),
          frameCount: currSectionLength
        })
        lastWindow = frame.winIdx;
        currSectionLength = 0;
      }
    }
    const lastName = $timeline[$timeline.length - 1]._name;
    out.push({
      name: lastName ? lastName : lastWindow + 1,
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
