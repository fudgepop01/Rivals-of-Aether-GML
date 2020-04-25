import { writable, get } from 'svelte/store';

const calcFrames = (data) => {
  let fullFrames = [];
  const getWindowAtFrame = (fNum) => {
    let acc = 0;
    let wValues = Object.values(data.windows);
    for (let i = 0; i < wValues.length; i++) {
      acc += wValues[i].AG_WINDOW_LENGTH;
      if (fNum < acc) return { winStart: acc - wValues[i].AG_WINDOW_LENGTH, win: wValues[i] };
    }
  }
  const getSound = (fullSfx) => {
    if (fullSfx === undefined) return undefined;
    return fullSfx.substring(11, fullSfx.length - 2);
  }

  console.log(data);
  const frameCount = Object.values(data.windows).reduce((acc, currWin) => acc + currWin.AG_WINDOW_LENGTH , 0);
  const hitboxGenerators = Object.values(data.hitboxes).map((hb, idx) => {
    return {
      lifetime: hb.HG_LIFETIME || 0,
      winNum: hb.HG_WINDOW || 0,
      winFrame: hb.HG_WINDOW_CREATION_FRAME || 0,
      get parentHitbox() {
        if (hb.HG_PARENT_HITBOX === 0) return false;
        if (this._parentIndex - 1 === this._idx) return false;
        else return {
          ...hitboxGenerators[hb.HG_PARENT_HITBOX - 1],
          _myFrame: this._myFrame,
          winNum: this.winNum,
          winFrame: this.winFrame,
          lifetime: this.lifetime,
          xPos: this.xPos,
          yPos: this.yPos,
          group: this.group
        };
      },
      xPos: hb.HG_HITBOX_X || 0,
      yPos: hb.HG_HITBOX_Y || 0,
      width: hb.HG_WIDTH || 0,
      height: hb.HG_HEIGHT || 0,
      shape: hb.HG_SHAPE || 0,
      damage: hb.HG_DAMAGE || 0,
      angle: hb.HG_ANGLE || 0,
      get angleRad() { return this.angle * (Math.PI / 180) },
      get knockback() {
        if (hb.HG_FINAL_BASE_KNOCKBACK) {
          return (this._myFrame / this.lifetime) * (hb.HG_FINAL_BASE_KNOCKBACK - hb.HG_BASE_KNOCKBACK) + hb.HG_BASE_KNOCKBACK;
        }
        else return hb.HG_BASE_KNOCKBACK;
      },
      knockbackScaling: hb.HG_KNOCKBACK_SCALING || 0,
      hitpause: hb.HG_BASE_HITPAUSE || 0,
      hitpauseScaling: hb.HG_HITPAUSE_SCALING || 0,
      sfx: getSound(hb.HG_HIT_SFX),
      angleFlip: hb.HG_ANGLE_FLIPPER || 0,
      group: hb.HG_HITBOX_GROUP || 0,
      _myFrame: 0,
      _idx: idx,
      _parentIndex: hb.HG_PARENT_HITBOX
    }
  });
  const activeHitboxes = [];
  for (let i = 0; i < frameCount; i++) {
    const thisFrame = {};
    const {winStart, win} = getWindowAtFrame(i);
    thisFrame.winIdx = Object.values(data.windows).indexOf(win);
    thisFrame.sprite = data.AG_SPRITE.substring(12, data.AG_SPRITE.length - 2);
    thisFrame.hbSprite = data.AG_HURTBOX_SPRITE.substring(12, data.AG_HURTBOX_SPRITE.length - 2);
    thisFrame.spriteFrame = (spriteSheetFrameCount) => {
      return (win.AG_WINDOW_ANIM_FRAME_START || 0) + Math.floor(((i - winStart) / win.AG_WINDOW_LENGTH) * win.AG_WINDOW_ANIM_FRAMES) % spriteSheetFrameCount;
    }
    if (win.AG_WINDOW_HAS_SFX === 1 && i - winStart === win.AG_WINDOW_SFX_FRAME) {
      thisFrame.sfx = getSound(win.AG_WINDOW_SFX)
    }

    // create new hitboxes
    for (const hitbox of hitboxGenerators) {
      if (hitbox.winNum == Object.values(data.windows).indexOf(win) + 1 && hitbox.winFrame === i - winStart) {
        activeHitboxes.push(hitbox);
      }
    }

    // check existing hitboxes
    for (let i = 0; i < activeHitboxes.length; i++) {
      let hitbox = activeHitboxes[i];
      if (hitbox._myFrame >= hitbox.lifetime) {
        activeHitboxes.splice(i, 1);
        i--;
        continue;
      }
      hitbox._myFrame ++;
    }

    // shallow-clones the hitboxes, letting them
    // store how many frames they've been active
    thisFrame.hitboxes = activeHitboxes.map((hb) => {
      return Object.create(
        Object.getPrototypeOf(hb),
        Object.getOwnPropertyDescriptors(hb)
      )
    });

    fullFrames.push(thisFrame);

    // TODO: handle whifflag
    // if (i - winStart === win.AG_WINDOW_LENGTH && win.AG_WINDOW_HAS_WHIFFLAG) {
    //   const cloned = JSON.parse(JSON.stringify(thisFrame));
    //   cloned.isWhifflag = true;
    //   fullFrames.push(...(new Array(Math.floor(win.AG_WINDOW_LENGTH)).fill(cloned)));
    // }
  }

  return fullFrames;
}

const timelineFactory = () =>{
  const myStore = writable([]);
  const { set, subscribe } = myStore;

  return {
    subscribe,
    recalculateFrames(data) {
      set(calcFrames(data));
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