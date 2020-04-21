import { baseAttack, baseHitbox, baseWindow, reverseLookup, baseVars } from './constantLookup';

const getNewBase = () => {
  const base = {
    scopes: [],
    context: null,
    resources: {},
    instances: {
      self: {
        animLinks: {},
        fields: {
          ...baseVars,
          object_index: 'oPlayer',
          x: 461,
          y: 230,
          free: true,
        },
        attacks: {},
      },
      // I am NOT dealing with full emulation right now lmao
      // platform_1: {
      //   animLinks: {},
      //   fields: {
      //     x: 224,
      //     y: 286,
      //     object_index: 'par_jumpthrough',
      //     sprite_index: 'stage_plat'
      //   }
      // },
      // platform_2: {
      //   animLinks: {},
      //   fields: {
      //     x: 416,
      //     y: 190,
      //     object_index: 'par_jumpthrough',
      //     sprite_index: 'stage_plat'
      //   }
      // },
      // platform_3: {
      //   animLinks: {},
      //   fields: {
      //     x: 608,
      //     y: 286,
      //     object_index: 'par_jumpthrough',
      //     sprite_index: 'stage_plat'
      //   }
      // },
      stage_base: {
        animLinks: {},
        fields: {
          x: 160,
          y: 382,
          object_index: 'par_block',
          sprite_index: 'stage_main'
        }
      }
    },
    get helpers() {
      return {
        // creates the base for the attack if it doesn't exist
        ensureAttack: (attackName) => {
          if (this.instances.self.attacks[attackName]) return;
          this.instances.self.attacks[attackName] = {
            initial: {
              windows: {},
              hitboxes: {},
              ...baseAttack
            },
            modified: {
              windows: {},
              hitboxes: {}
            }
          }
        },
        getAttack: (attackName) => {
          if (typeof attackName === 'number') attackName = reverseLookup('AT_', attackName);

          const attack = this.instances.self.attacks[attackName];
          const hitboxes = {};
          const windows = {};

          // PROCESS HITBOXES
          const initialHitboxKeys = Object.keys(attack.initial.hitboxes);
          const existingHitboxIndexes = [
            ...Object.keys(attack.initial.hitboxes),
            ...Object.keys(attack.modified.hitboxes).filter((v) => {
              if (initialHitboxKeys.includes(v)) return false;
              else return true;
            })
          ];
          for (const index of existingHitboxIndexes) {
            hitboxes[index] = {
              ...baseHitbox,
              ...(attack.initial.hitboxes[index] || {}),
              ...(attack.modified.hitboxes[index] || {})
            }
          }

          // PROCESS WINDOWS
          const initialWindowKeys = Object.keys(attack.initial.windows);
          const existingWindowIndexes = [
            ...Object.keys(attack.initial.windows),
            ...Object.keys(attack.modified.windows).filter((v) => {
              if (initialWindowKeys.includes(v)) return false;
              else return true;
            })
          ];
          for (const index of existingWindowIndexes) {
            windows[index] = {
              ...baseWindow,
              ...(attack.initial.windows[index] || {}),
              ...(attack.modified.windows[index] || {})
            }
          }

          // ACTUALLY OUTPUT THE DARN THING
          return {
            ...baseAttack,
            ...attack.initial,
            ...attack.modified,
            hitboxes,
            windows,
          }

        }
      }
    }
  }

  base.resources.nullImg = {
    frameCount: 1,
    data: window['sprite_builtins']['null_sprite.png'],
    xoff: 32,
    yoff: 32,
  }
  base.resources.nullImg.data.src = './images/null_sprite.png';

  base.resources.bgImage = {
    frameCount: 1,
    data: window['sprite_builtins']['stage_bg_noplat.png'],
    hitbox: {
      type: 'box',
      xoff: 0,
      yoff: 0,
      width: 0,
      height: 0,
    }
  }

  base.resources.stageImage = {
    frameCount: 1,
    data: window['sprite_builtins']['stage_base.png'],
    get hitbox() {
      return {
        type: 'box',
        xoff: 0,
        yoff: 0,
        width: this.data.width,
        height: this.data.height,
      }
    }
  }
  base.instances.stage_base.animLinks.stage_main = base.resources.stageImage

  base.resources.platformImage = {
    frameCount: 1,
    data: window['sprite_builtins']['stage_platform.png'],
    get hitbox() {
      return {
        type: 'box',
        xoff: 0,
        yoff: 0,
        width: this.data.width,
        height: this.data.height,
      }
    }
  }
  // base.instances.platform_1.animLinks.stage_plat = base.resources.platformImage;
  // base.instances.platform_2.animLinks.stage_plat = base.resources.platformImage;
  // base.instances.platform_3.animLinks.stage_plat = base.resources.platformImage;

  return base;
}

export default getNewBase;