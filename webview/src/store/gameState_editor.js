import { writable, get } from 'svelte/store';
import { spriteData } from './user_data_store'

const calcFrames = (data) => {
  const sprites = get(spriteData);

  console.log(data);

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
  const hitboxGenerators =
    Object.values(data.hitboxes).map((hb, idx) => {
      return {
        lifetime: hb.HG_LIFETIME || 0,
        winNum: hb.HG_WINDOW || 0,
        winFrame: hb.HG_WINDOW_CREATION_FRAME || 0,
        type: hb.HG_HITBOX_TYPE || 1,
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
            group: this.group,
            type: this.type
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
        _parentIndex: hb.HG_PARENT_HITBOX,

        // projectile props
        hsp: hb.HG_PROJECTILE_HSPEED || 0,
        vsp: hb.HG_PROJECTILE_VSPEED || 0,
        gravity: hb.HG_PROJECTILE_GRAVITY || 0,
        air_friction: hb.HG_PROJECTILE_AIR_FRICTION || 0,
        ground_friction: hb.HG_PROJECTILE_GROUND_FRICTION || 0,
        behavior: hb.HG_PROJECTILE_GROUND_BEHAVIOR || 0,
        animSpeed: hb.HG_PROJECTILE_ANIM_SPEED || 0,
        sprite: (hb.HG_PROJECTILE_SPRITE) ? hb.HG_PROJECTILE_SPRITE.substring(12, hb.HG_PROJECTILE_SPRITE.length - 2) : 0,
        hitbox: (hb.HG_PROJECTILE_MASK) ? hb.HG_PROJECTILE_MASK.substring(12, hb.HG_PROJECTILE_MASK.length - 2) : 0,
        _xOffset: 0,
        _yOffset: 0,
        spriteFrame(spriteSheetFrameCount) {
          return Math.floor(this._myFrame / this.animSpeed) % spriteSheetFrameCount;
        }
      }
    });

  const activeHitboxes = [];
  let xOffset = 0;
  let yOffset = 0;
  let xvel = 0;
  let yvel = 0;
  for (let i = 0; i < frameCount; i++) {
    const thisFrame = {};
    const {winStart, win} = getWindowAtFrame(i);
    thisFrame.winIdx = Object.values(data.windows).indexOf(win);
    thisFrame.sprite = data.AG_SPRITE.substring(12, data.AG_SPRITE.length - 2);
    thisFrame.hbSprite = data.AG_HURTBOX_SPRITE.substring(12, data.AG_HURTBOX_SPRITE.length - 2);
    thisFrame._name = win._name;
    thisFrame.spriteFrame = (spriteSheetFrameCount) => {
      return (win.AG_WINDOW_ANIM_FRAME_START || 0) + Math.floor(((i - winStart) / win.AG_WINDOW_LENGTH) * win.AG_WINDOW_ANIM_FRAMES) % spriteSheetFrameCount;
    }
    if (win.AG_WINDOW_HAS_SFX === 1 && i - winStart === win.AG_WINDOW_SFX_FRAME) {
      thisFrame.sfx = getSound(win.AG_WINDOW_SFX)
    }

    // take care of momentum
    // also consider custom gravity / friction
    switch(win.AG_WINDOW_HSPEED_TYPE || 0) {
      case 0: {
        if (i - winStart === 0) xvel += win.AG_WINDOW_HSPEED || 0;
        break;
      }
      case 1: {
        xvel = win.AG_WINDOW_HSPEED || 0;
        break;
      }
      case 2: {
        if (i - winStart === 0) xvel = win.AG_WINDOW_HSPEED || 0;
      }
    }

    switch(win.AG_WINDOW_VSPEED_TYPE || 0) {
      case 0: {
        if (i - winStart === 0) yvel += win.AG_WINDOW_VSPEED || 0;
        break;
      }
      case 1: {
        yvel = win.AG_WINDOW_VSPEED || 0;
        break;
      }
      case 2: {
        if (i - winStart === 0) yvel = win.AG_WINDOW_VSPEED || 0;
      }
    }

    // set position for this frame
    xOffset += xvel;
    yOffset = Math.min(0, yOffset + yvel);
    if (yOffset === 0) yvel = 0;

    thisFrame.xOffset = xOffset;
    thisFrame.yOffset = yOffset;

    // adjust momentum for next frame
    let frameGravity = ((data.AG_USES_CUSTOM_GRAVITY || 0) !== 0) ? win.AG_WINDOW_CUSTOM_GRAVITY || 0 : data.vars.gravity_speed;
    let frameFriction;
    if (yOffset > 0) {
      frameFriction = ((win.AG_WINDOW_HAS_CUSTOM_AIR_FRICTION || 0) !== 0) ? win.AG_WINDOW_CUSTOM_AIR_FRICTION || 0 : data.vars.air_friction;
    }
    else {
      frameFriction = ((win.AG_WINDOW_HAS_CUSTOM_GROUND_FRICTION || 0) !== 0) ? win.AG_WINDOW_CUSTOM_GROUND_FRICTION || 0 : data.vars.ground_friction;
    }

    if (xvel > 0) xvel = Math.max(0, xvel - frameFriction);
    else xvel = Math.min(xvel + frameFriction, 0);
    yvel += frameGravity;
    thisFrame.grav = frameGravity;
    thisFrame.yvel = yvel;

    // check existing hitboxes
    for (let i = 0; i < activeHitboxes.length; i++) {
      let hitbox = activeHitboxes[i];
      if (hitbox._myFrame >= hitbox.lifetime) {
        activeHitboxes.splice(i, 1);
        i--;
        continue;
      }
      // update offsets to standard hitboxes
      if (hitbox.type === 1) {
        hitbox._xOffset = xOffset;
        hitbox._yOffset = yOffset;
      }
      // apply motion to projectiles
      if (hitbox.type === 2) {
        hitbox._xOffset += hitbox.hsp;
        hitbox._yOffset += hitbox.vsp;
        let friction = hitbox.air_friction;
        if (hitbox._yOffset + hitbox.yPos >= 0) {
          switch(hitbox.behavior) {
            case 0:
              hitbox._yOffset = -hitbox.yPos;
              friction = hitbox.ground_friction;
              break;
            case 1:
              hitbox._yOffset -= hitbox.vsp * 2;
              hitbox.vsp *= -1;
              break;
            default:
              break;
          }
        }

        hitbox.vsp += hitbox.gravity;
        if (Math.abs(hitbox.hsp) - friction <= 0) hitbox.hsp = 0;
        else hitbox.hsp -= friction;
      }
      hitbox._myFrame ++;
    }

    // create new hitboxes
    for (const hitbox of hitboxGenerators) {
      if (hitbox.winNum == ((win._name) ? win._name : Object.values(data.windows).indexOf(win) + 1) && hitbox.winFrame === i - winStart) {
        hitbox._xOffset = xOffset;
        hitbox._yOffset = yOffset;
        hitbox._myFrame = 1;
        if (hitbox.type === 2) {
          let imgData = sprites[hitbox.sprite]
          if (imgData) {
            hitbox._xOffset -= imgData.xoff;
            hitbox._yOffset -= imgData.yoff;
          }
        }
        activeHitboxes.push(hitbox);
      }
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