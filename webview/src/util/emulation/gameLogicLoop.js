import collisionCheck, { getInstanceSprite, checkBoundingBoxes } from './collisionChecks';
import { SC_HITSTUN_states, SC_AIR_NEUTRAL_states, SC_AIR_COMMITTED_states, SC_GROUND_NEUTRAL_states, SC_GROUND_COMMITTED_states } from './constantLookup';

import checkInputs from './logic/checkInputs';
import updateStateTimers from './logic/updateStateTimers';

const airGroundTransition = (self) => {
  if (self.fields.state === 'PS_PRATFALL') self.fields.state = 'PS_PRATLAND';
  // else if (self.fields.state === 'PS_ATTACK_AIR') self.fields.state = ''
  else if (self.fields.state === 'PS_AIR_DODGE') self.fields.state = 'PS_WAVELAND';
  else if (SC_AIR_NEUTRAL_states.includes(self.fields.state)) self.fields.state = 'PS_LAND';
  else if (self.fields.state === 'PS_HITSTUN') self.fields.state = 'PS_HITSTUN_LAND';
}

const applyGravity = (gameState) => {
  const self = gameState.instances.self;

  if (self.fields.state_cat === 'SC_HITSTUN') self.fields.grav = self.fields.gravity_speed;
  else self.fields.grav = self.fields.hitstun_grav;

  self.fields.y += self.fields.vsp;

  if (self.fields.free) {
    if (!self.fields.state) self.fields.state = 'PS_IDLE_AIR';
    self.fields.vsp += self.fields.grav;
    if (self.fields.vsp > self.fields.max_fall) self.fields.vsp = self.fields.max_fall;
  } else {
    if (!self.fields.state) self.fields.state = 'PS_IDLE';
  }

  const sprA = getInstanceSprite(self, gameState.resources.nullImg);
  let shouldMakeFree = true;
  for (const inst of Object.values(gameState.instances)) {
    if (inst.fields.object_index === 'par_block') {
      const sprB = getInstanceSprite(inst, gameState.resources.nullImg);
      if (checkBoundingBoxes({...sprA, y: sprA.y + 2}, sprB)) shouldMakeFree = false;
      if (collisionCheck(sprA, sprB)) {
        let overlap = checkBoundingBoxes(sprA, sprB);
        self.fields.y = sprB.y;
        self.fields.vsp = 0;
        self.fields.free = false;
        airGroundTransition(self);
      }
    }
    else if (inst.fields.object_index === 'par_jumpthrough') {
      const sprB = getInstanceSprite(inst, gameState.resources.nullImg);
      if (checkBoundingBoxes({...sprA, y: sprA.y + 2}, sprB)) shouldMakeFree = false;
      if (sprB.x === 608) console.log(checkBoundingBoxes({...sprA, y: sprA.y + 2}, sprB), shouldMakeFree);
      if (self.fields.vsp > 0 && self.fields.yprevious < sprB.y && collisionCheck({...sprA, y: sprA.y + self.fields.vsp}, sprB)) {
        let overlap = checkBoundingBoxes(sprA, sprB);
        self.fields.y = sprB.y;
        self.fields.vsp = 0;
        self.fields.free = false;
        airGroundTransition(self);
      }
    }
  }
  if (shouldMakeFree && !self.fields.free) {
    self.fields.free = true;
    if (['SC_GROUND_COMMITTED', 'SC_GROUND_NEUTRAL'].includes(self.fields.state_cat)) self.fields.state = 'PS_IDLE_AIR';
  }
}

const applyHorizontal = (gameState) => {
  const self = gameState.instances.self;

  // account for friction
  if (self.fields.hsp != 0) {
    if (Math.abs(self.fields.hsp) - ((self.fields.free) ? self.fields.air_friction : self.fields.ground_friction) <= 0) self.fields.hsp = 0;
    else self.fields.hsp += ((self.fields.hsp > 0) ? -1 : 1) * ((self.fields.free) ? self.fields.air_friction : self.fields.ground_friction);
  }
  // limit hsp if necessary
  const hspLimits = {
    PS_WALK: self.fields.walk_speed,
    PS_DASH_START: self.fields.initial_dash_speed,
    PS_DASH: self.fields.dash_speed,
    SC_AIR_NEUTRAL: self.fields.air_max_speed,
    SC_AIR_COMMITTED: self.fields.air_max_speed,
    default: null
  };
  const hspLimit = hspLimits[self.fields.state] || hspLimits[self.fields.state_cat]
  if (hspLimit && Math.abs(self.fields.hsp) > hspLimit) self.fields.hsp = ((self.fields.hsp > 0) ? 1 : -1) * hspLimit;

  // apply hsp
  self.fields.x += self.fields.hsp;

  // check resulting collisions
  const sprA = getInstanceSprite(self, gameState.resources.nullImg);
  for (const inst of Object.values(gameState.instances)) {
    if (inst.fields.object_index === 'par_block') {
      const sprB = getInstanceSprite(inst, gameState.resources.nullImg);
      if (collisionCheck(sprA, sprB)) {
        const overlap = checkBoundingBoxes(sprA, sprB);
        self.fields.x += ((self.fields.hsp > 0) ? -1 : 1) * (overlap.x2 - overlap.x1)
        self.fields.hsp = 0;
        if (['SC_AIR_NEUTRAL', 'SC_GROUND_NEUTRAL'].includes(self.fields.state_cat)) {
          self.fields.state = (self.fields.free) ? 'PS_IDLE_AIR' : 'PS_IDLE'
        }
      }
    }
  }
}

const setStateCategory = (self) => {
  if (SC_HITSTUN_states.includes(self.fields.state)) self.fields.state_cat = 'SC_HITSTUN';
  else if (SC_AIR_NEUTRAL_states.includes(self.fields.state)) self.fields.state_cat = 'SC_AIR_NEUTRAL';
  else if (SC_AIR_COMMITTED_states.includes(self.fields.state)) self.fields.state_cat = 'SC_AIR_COMMITTED';
  else if (SC_GROUND_NEUTRAL_states.includes(self.fields.state)) self.fields.state_cat = 'SC_GROUND_NEUTRAL';
  else if (SC_GROUND_COMMITTED_states.includes(self.fields.state)) self.fields.state_cat = 'SC_GROUND_COMMITTED';
}

const setSpriteFromState = (self) => {
  switch (self.fields.state) {
    // TODO: take care of different hitstun animations
    case 'PS_HITSTUN':
    case 'PS_HITSTUN_LAND':
    case 'PS_WRAPPED':
    case 'PS_FROZEN':
      self.fields.sprite_index = 'hurt'; break;

    case 'PS_IDLE_AIR':
    case 'PS_FIRST_JUMP':
      self.fields.sprite_index = 'jump'; break;

    case 'PS_DOUBLE_JUMP': self.fields.sprite_index = 'doublejump'; break;
    case 'PS_TUMBLE': self.fields.sprite_index = 'hurt'; break;
    case 'PS_WALL_JUMP': self.fields.sprite_index = 'walljump'; break;
    case 'PS_ATTACK_AIR': self.fields.sprite_index = self.fields.attack; break;
    case 'PS_PRATFALL': self.fields.sprite_index = 'pratfall'; break;

    // TODO: take care of different airdodge animations
    case 'PS_AIRDODGE': self.fields.sprite_index = 'airdodge'; break;
    // my best guess
    case 'PS_WALL_TECH': self.fields.sprite_index = 'walljump'; break;
    case 'PS_RESPAWN':
    case 'PS_DEAD':
      self.fields.sprite_index = 'plat'; break;

    case 'PS_IDLE': self.fields.sprite_index = 'idle'; break;
    case 'PS_CROUCH': self.fields.sprite_index = 'crouch'; break;
    case 'PS_WALK': self.fields.sprite_index = 'walk'; break;

    case 'PS_LAND': self.fields.sprite_index = 'land'; break;
    case 'PS_SPAWN': self.fields.sprite_index = 'plat'; break;
    case 'PS_PRATLAND':
    case 'PS_LANDING_LAG':
      self.fields.sprite_index = 'landinglag'; break;

    case 'PS_WALK_TURN': self.fields.sprite_index = 'walkturn'; break;
    case 'PS_ATTACK_GROUND': self.fields.sprite_index = self.fields.attack; break;
    case 'PS_WAVELAND': self.fields.sprite_index = 'waveland'; break;
    case 'PS_DASH_START': self.fields.sprite_index = 'dashstart'; break;
    case 'PS_DASH': self.fields.sprite_index = 'dash'; break;
    case 'PS_DASH_TURN': self.fields.sprite_index = 'dashturn'; break;
    case 'PS_DASH_STOP': self.fields.sprite_index = 'dashstop'; break;
    case 'PS_PARRY_START': self.fields.sprite_index = 'parry'; break;
    case 'PS_PARRY': self.fields.sprite_index = 'parry'; break;
    case 'PS_TECH_GROUND': self.fields.sprite_index = 'tech'; break;
    case 'PS_TECH_BACKWARD':
    case 'PS_ROLL_BACKWARD':
      self.fields.sprite_index = 'roll_backward'; break;
    case 'PS_TECH_FORWARD':
    case 'PS_ROLL_FORWARD':
      self.fields.sprite_index = 'roll_forward'; break;
    case 'PS_JUMPSQUAT': self.fields.sprite_index = 'jumpstart'; break;
    default: break;
  }
}

const setImageIndex = (gameState, self) => {
  const {state_timer, state, sprite_index} = self.fields;
  if (gameState.resources[sprite_index]) {
    const currentFrameCount = gameState.resources[sprite_index].frameCount;
    const animSpeed = (div) => (currentFrameCount) / div
    switch(state) {
      case 'PS_IDLE_AIR':
        self.fields.image_index = currentFrameCount - 1;
        break;
      case 'PS_FIRST_JUMP':
        self.fields.image_index = Math.floor(state_timer * animSpeed(32));
        break;
      case 'PS_DOUBLE_JUMP':
        self.fields.image_index = Math.floor(state_timer * animSpeed(self.fields.double_jump_time));
        break;
      case 'PS_IDLE':
        self.fields.image_index = Math.floor(self.fields.idle_anim_speed * state_timer) % currentFrameCount;
        break;
      case 'PS_JUMPSQUAT':
        self.fields.image_index = Math.floor(state_timer * animSpeed(self.fields.jump_start_time + 1));
        break;
      case 'PS_LAND':
        self.fields.image_index = Math.floor(state_timer * animSpeed(self.fields.land_time));
        break;
      default:
        self.fields.image_index = 0;
        break;
    }
  } else {
    self.fields.image_index = 0;
  }
}

export default (gameState) => {
  const self = gameState.instances.self;

  // store old stuff
  self.fields.old_vsp = self.fields.vsp;
  self.fields.yprevious = self.fields.y;
  self.fields.old_hsp = self.fields.hsp;
  self.fields.xprevious = self.fields.x;
  self.fields.prev_state = self.fields.state;

  // check and take inputs
  checkInputs(self);

  // gravity
  applyGravity(gameState);

  // horizontal movement
  applyHorizontal(gameState);

  // updates states and sprites & their respective timers
  setSpriteFromState(self);
  setImageIndex(gameState, self);
  updateStateTimers(self);
  setStateCategory(self);

}