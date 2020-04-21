const checkInputs = (self) => {
  const fields = self.fields;
  const {
    attack_pressed,
    special_pressed,
    jump_pressed,
    shield_pressed,
    taunt_pressed,
    can_move,
    can_jump,
    can_attack,
    can_strong,
    can_ustrong,
    can_special,
    can_shield,
    can_walljump,
    can_fast_fall,
  } = fields;

  if (jump_pressed && can_jump) {
    const myHandlers = ({
      PS_IDLE_AIR() {
        fields.state = 'PS_DOUBLE_JUMP';
      },
      PS_IDLE() {
        fields.state = 'PS_JUMPSQUAT';
      },
      PS_FIRST_JUMP() {
        fields.state = 'PS_DOUBLE_JUMP'
      },
      def(){}
    })

    let toExec = myHandlers[fields.state] || myHandlers.def;
    toExec();
  }

  if (attack_pressed && can_attack) {
    
  }
}

export default checkInputs;