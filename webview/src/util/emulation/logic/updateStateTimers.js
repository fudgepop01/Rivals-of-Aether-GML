

const updateStateTimers = (self) => {
  if (self.fields.prev_state === self.fields.state) {
    self.fields.state_timer++;
  }
  else self.fields.state_timer = 0;

  if (self.fields.state === 'PS_JUMPSQUAT' && self.fields.state_timer === self.fields.jump_start_time + 1) {
    self.fields.state = 'PS_FIRST_JUMP';
    if (self.fields.jump_down == true) self.fields.vsp = -self.fields.jump_speed
    else self.fields.vsp = -self.fields.short_hop_speed;
  }

  if (self.fields.state === 'PS_FIRST_JUMP' && self.fields.state_timer === 32) {
    self.fields.state = 'PS_IDLE_AIR';
  }

  if (self.fields.state === 'PS_DOUBLE_JUMP') {
    if (self.fields.state_timer === 0)
      self.fields.vsp = -self.fields.djump_speed;
    else if (self.fields.djump_accel
            && self.fields.state_timer >= self.fields.djump_accel_start_time
            && self.fields.state_timer < self.fields.djump_accel_end_time )
      self.fields.vsp += djump_accel;
    else if (self.fields.state_timer === self.fields.double_jump_time)
      self.fields.state = 'PS_IDLE_AIR';
  }

  if (self.fields.state === 'PS_LAND' && self.fields.state_timer === self.fields.land_time) {
    self.fields.state = 'PS_IDLE';
  }

  if (self.fields.prev_state !== self.fields.state) self.fields.state_timer = 0;
}

export default updateStateTimers;