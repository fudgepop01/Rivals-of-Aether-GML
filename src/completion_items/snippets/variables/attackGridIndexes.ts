import {
  CompletionItemKind, CompletionItem
} from 'vscode-languageserver';

export default (): CompletionItem[] => {
  const indexes = [
    ['AG_CATEGORY','0 = Grounded only\n1 = Aerial only\n2 = Can be grounded or aerial'],
    ['AG_SPRITE','The sprite to use for the attack'],
    ['AG_AIR_SPRITE','The sprite to use for the attack while aerial. Only applies if AG_CATEGORY is 2'],
    ['AG_HURTBOX_SPRITE','The sprite to use for the attack\'s hurtbox'],
    ['AG_HURTBOX_AIR_SPRITE','The sprite to use for the attack\'s hurtbox while aerial. Only applies if AG_CATEGORY is 2'],
    ['AG_NUM_WINDOWS','Windows with indexes higher than this value will not naturally transition into later windows'],
    ['AG_HAS_LANDING_LAG','Only applies if AG_CATEGORY is 1\n0 = Continues the attack when landing\n1 = Applies landing lag normally'],
    ['AG_OFF_LEDGE','0 = Stops at ledge\n1 = Goes off ledge'],
    ['AG_LANDING_LAG','The number of landing lag frames applied when landing. If you whiff the attack, this value is multiplied by 1.5.\nOnly applies if AG_HAS_LANDING_LAG is 1'],
    ['AG_STRONG_CHARGE_WINDOW','If attack is held at the end of this window, the character will freeze and charge the attack before moving to the next window'],
    ['AG_USES_CUSTOM_GRAVITY','0 = Attack uses default gravity\n1 = Attack uses custom gravity. Values must be set for every window of the attack individually'],

    ['AG_WINDOW_TYPE','0 = Normal\n7 = Goes into pratfall\n8 = Goes to the next window if it’s on the ground, otherwise loops\n9 = Looping window'],
    ['AG_WINDOW_LENGTH','The duration of the window, in frames'],
    ['AG_WINDOW_ANIM_FRAMES','The number of animation frames to display over the duration of the window'],
    ['AG_WINDOW_ANIM_FRAME_START','The animation frame on which the window starts'],
    ['AG_WINDOW_HSPEED','The horizontal speed to apply during the window in pixels per frame. The type of speed boost depends on AG_WINDOW_HSPEED_TYPE'],
    ['AG_WINDOW_VSPEED','The vertical speed to apply during the window in pixels per frame. The type of speed boost depends on AG_WINDOW_VSPEED_TYPE'],
    ['AG_WINDOW_HSPEED_TYPE','0 = AG_WINDOW_HSPEED is applied on top of your current momentum as a boost\n1 = Horizontal speed is set to AG_WINDOW_HSPEED on every frame of the window\n2 = Horizontal speed is set to AG_WINDOW_HSPEED on the first frame of the window'],
    ['AG_WINDOW_VSPEED_TYPE','0 = AG_WINDOW_VSPEED is applied on top of your current momentum as a boost\n1 = Vertical speed is set to AG_WINDOW_VSPEED on every frame of the window\n2 = Vertical speed is set to AG_WINDOW_VSPEED on the first frame of the window'],
    ['AG_WINDOW_HAS_CUSTOM_FRICTION','0 = Uses default friction\n1 = Uses custom friction'],
    ['AG_WINDOW_CUSTOM_AIR_FRICTION','The horizontal friction to apply per frame while aerial. Only applies if AG_WINDOW_HAS_CUSTOM_FRICTION is 1'],
    ['AG_WINDOW_CUSTOM_GROUND_FRICTION','The horizontal friction to apply per frame while grounded. Only applies if AG_WINDOW_HAS_CUSTOM_FRICTION is 1'],
    ['AG_WINDOW_CUSTOM_GRAVITY','The gravitational acceleration to apply every frame of the window. Only applies if AG_USES_CUSTOM_GRAVITY is 1'],
    ['AG_WINDOW_HAS_WHIFFLAG','0 = Window is always the same length\n1 = Window is 1.5x longer if you haven’t hit someone'],
    ['AG_WINDOW_INVINCIBILITY','0 = No invincibility\n1 = Invincible to all attacks\n2 = Invincible to projectiles'],
    ['AG_WINDOW_HITPAUSE_FRAME','The animation frame to show during hitpause\n0 = no specific frame'],
    ['AG_WINDOW_CANCEL_TYPE','0 = Window does not cancel\n1 = Cancels into the next window if attack is pressed (when on a jab, this allows it to be tilt-cancelled)\n2 = Cancels into the next window if special is pressed\nCancels do not work if AG_WINDOW_TYPE is 8'],
    ['AG_WINDOW_CANCEL_FRAME','If AG_WINDOW_CANCEL_TYPE is greater than 0, the attack will become cancellable on this frame'],
    ['AG_WINDOW_HAS_SFX','0 = Does not have a sound effect\n1 = Has a sound effect'],
    ['AG_WINDOW_SFX','The index of the sound effect. Only applies if AG_WINDOW_HAS_SFX is 1'],
    ['AG_WINDOW_SFX_FRAME','The frame in the window that the sound effect is played. Only applies if AG_WINDOW_HAS_SFX is 1'],
  ]

  return [
    ...indexes.map(([name, desc]) => {
      return {
        label: name,
        kind: CompletionItemKind.Constant,
        documentation: desc,
        insertText: name
      }
    }),
  ]
}
