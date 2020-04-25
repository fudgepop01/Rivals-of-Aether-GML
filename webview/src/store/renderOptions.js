import { writable } from 'svelte/store';
import charStats from '../util/RoACharStats';

const targetAttributeFactory = () => {
  const { update, subscribe, set } = writable({
    knockback_adj: 1,
    damage: 10,
    hitstun_gravity_accel: 0.5,
    gravity_accel: 0.5,
    air_friction: 0.05,
    max_fall_speed: 10
  });

  return {
    subscribe,
    set,
    setValue(key, value) {
      update(n => {
        if (Object.keys(n).includes(key)) {
          n[key] = value
        }
        return n;
      })
    },
    setCharacter(charName) {
      update(n => {
        if (charStats[charName]) {
          n = {...n, ...charStats[charName]}
        }
        return n;
      })
    },
  }
}

export const targetAttributes = targetAttributeFactory();

export const showHitboxes = writable(true);
export const showAngle = writable(true);
export const showGuideline = writable(true);
export const guidelineLength = writable(10);
export const selectedHitbox = writable({_idx: -1, _myFrame: -1});