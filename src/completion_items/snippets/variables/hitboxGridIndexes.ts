import {
  CompletionItemKind, CompletionItem
} from 'vscode-languageserver';

export default (): CompletionItem[] => {
  const indexes = [
    ['HG_PARENT_HITBOX','If HG_PARENT_HITBOX is anything other than 0, then it will inherit all values from the hitbox with index: HG_PARENT_HITBOX for all properties except the following: HG_HITBOX_TYPE\nHG_WINDOW\nHG_WINDOW_CREATION_FRAME\nHG_LIFETIME\nHG_HITBOX_X\nHG_HITBOX_Y\nHG_HITBOX_GROUP'],
    ['HG_HITBOX_TYPE','[type] 1 = Physical attack\n2 = Projectile'],
    ['HG_WINDOW','The attack window in which the hitbox is created'],
    ['HG_WINDOW_CREATION_FRAME','The frame in which the hitbox is created, relative to the start of the attack window'],
    ['HG_LIFETIME','[length] The duration of the hitbox, in frames'],
    ['HG_HITBOX_X','[x_pos] The x position of the center of the hitbox, relative to the center of the player'],
    ['HG_HITBOX_Y','[y_pos] The y position of the center of the hitbox, relative to the bottom of the player'],
    ['HG_WIDTH','[image_xscale*200] The width of the hitbox, in pixels'],
    ['HG_HEIGHT','[image_yscale*200] The height of the hitbox, in pixels'],
    ['HG_SHAPE','[sprite_index] 0 = Circle (hitbox_circle_spr)\n1 = Rectangle (hitbox_square_spr)\n2 = Rounded Rectangle (hitbox_rounded_rectangle)'],
    ['HG_PRIORITY','[hit_priority] Ranges from 1 to 10, with a priority 10 hitbox taking priority over a priority 1 hitbox if both hit at the same time'],
    ['HG_DAMAGE','[damage] The damage dealt by the hitbox'],
    ['HG_ANGLE','[kb_angle] The angle at which the hitbox sends opponents. 0 is straight horizontally forward, 90 is upward, 270 is downward. A value of 361 will send at 45 for aerial opponents and 40 for grounded opponents. Can be overwritten or modified by HG_ANGLE_FLIPPER'],
    ['HG_BASE_KNOCKBACK','[kb_value] The amount of knockback the move applies to an opponent regardless of their damage'],
    ['HG_KNOCKBACK_SCALING','[kb_scale] The amount of knockback to add to HG_BASE_KNOCKBACK relative to the opponent’s damage'],
    ['HG_EFFECT','[effect] 1 = Burn\n2 = Burn consume\n3 = Burn stun (extra hitpause on burning opponents. Used to guarantee the final hit on Zetterburn’s empowered strong attack)\n4 = Wrap\n5 = Freeze\n6 = Mark\n8 = Auto Wrap\n9 = Polite (only deals hitstun if already in hitstun)\n10 = Poison\n11 = Plasma Stun\n12 = Crouch armors through it'],
    ['HG_BASE_HITPAUSE','[hitpause] The amount of hitpause the move applies to an opponent regardless of their damage'],
    ['HG_HITPAUSE_SCALING','[hitpause_growth] The amount of hitpause to add to HG_BASE_HITPAUSE relative to the opponent’s damage'],
    ['HG_VISUAL_EFFECT','[hit_effect] The visual effect to create when the hitbox hits something'],
    ['HG_VISUAL_EFFECT_X_OFFSET','[hit_effect_x] Normally, the visual effect is created between the center of the hitbox and the opponent’s position. The value here adds an offset to the center of the hitbox in that calculation'],
    ['HG_VISUAL_EFFECT_Y_OFFSET','[hit_effect_y] Normally, the visual effect is created between the center of the hitbox and the opponent’s position. The value here adds an offset to the center of the hitbox in that calculation'],
    ['HG_HIT_SFX','[sound_effect] The index of the sound effect to play when the attack hits'],
    ['HG_ANGLE_FLIPPER','[hit_flipper] 0 = Sends at the exact knockback_angle every time\n1 = Sends away from the center of the enemy player\n2 = Sends toward the center of the enemy player\n3 = Horizontal knockback sends away from the center of the hitbox\n4 = Horizontal knockback sends toward the center of the hitbox\n5 = Horizontal knockback is reversed\n6 = Horizontal knockback sends away from the enemy player\n7 = Horizontal knockback sends toward the enemy player\n8 = Sends away from the center of the hitbox\n9 = Sends toward the center of the hitbox'],
    ['HG_EXTRA_HITPAUSE','[extra_hitpause] Extra hitpause to apply to the opponent only. Can be negative'],
    ['HG_GROUNDEDNESS','[groundedness] 0 = Can hit both aerial and grounded opponents\n1 = Can only hit grounded opponents\n2 = Can only hit aerial opponents'],
    ['HG_EXTRA_CAMERA_SHAKE','[camera_shake] -1 = No camera shake\n0 = Normal camera shake. Only applied if knockback speed is above 1\n1 = Force camera shake, even if knockback speed is lower than 1'],
    ['HG_IGNORES_PROJECTILES','[proj_break] 0 = Can break projectiles\n1 = Cannot break projectiles'],
    ['HG_HIT_LOCKOUT','[no_other_hit] The number of frames after this hitbox connects where another hitbox belonging to the same player cannot hit the opponent'],
    ['HG_EXTENDED_PARRY_STUN','When this hitbox is parried, the amount of parry stun inflicted on the opponent will be relative to the distance between you'],
    ['HG_HITBOX_GROUP','[hbox_group] Only one hitbox per group can hit an opponent until the attack ends. This can be overwritten by calling attack_end() to manually reset all hitbox group flags. Hitboxes in group -1 can always hit an opponent. Projectiles always belong to group -1'],
    ['HG_HITSTUN_MULTIPLIER','[hitstun_factor] The value by which hitstun is multiplied after being calculated normally. A value of 0 results in default hitstun (the same as a value of 1)'],
    ['HG_DRIFT_MULTIPLIER','[dumb_di_mult] Causes the acceleration of the opponent’s drift DI to be multiplied by this value'],
    ['HG_SDI_MULTIPLIER','[sdi_mult-1] Causes the distance of the opponent’s SDI to be multiplied by this value.'],
    ['HG_TECHABLE','[can_tech] 0 = Can tech\n1 = Cannot tech\n2 = Goes through platforms (used by Etalus Uair)\n3 = Cannot tech or bounce'],
    ['HG_FORCE_FLINCH','[force_flinch] 0 = Does not force flinch\n1 = Forces grounded opponents to flinch\n2 = Cannot cause opponents to flinch\n3 = Causes crouching opponents to flinch'],
    ['HG_FINAL_BASE_KNOCKBACK','[bkb_final] If this is greater than 0, the base knockback of the hitbox will progress linearly from HG_BASE_KNOCKBACK to HG_FINAL_BASE_KNOCKBACK over the span of the hitbox’s lifetime'],
    ['HG_THROWS_ROCK','[throws_rock] 0 = Breaks rock\n1 = Throws rock\n2 = Ignores rock'],

    ['HG_PROJECTILE_SPRITE','[sprite_index] The sprite to loop for the projectile’s animation'],
    ['HG_PROJECTILE_MASK','[mask_index] The sprite to use for the projectile’s collision (uses precise collision). Set to -1 to use normal hitbox collision with HG_SHAPE'],
    ['HG_PROJECTILE_ANIM_SPEED','[img_spd] The speed at which the projectile’s sprite will animate'],
    ['HG_PROJECTILE_HSPEED','[hsp] The initial horizontal speed of the projectile in pixels per frame'],
    ['HG_PROJECTILE_VSPEED','[vsp] The initial vertical speed of the projectile in pixels per frame'],
    ['HG_PROJECTILE_GRAVITY','[grav] The downward acceleration applied to the projectile every frame'],
    ['HG_PROJECTILE_GROUND_FRICTION','[frict] The decrease in horizontal speed per frame when the projectile is grounded'],
    ['HG_PROJECTILE_AIR_FRICTION','[air_friction] The decrease in horizontal speed per frame when the projectile is aerial'],
    ['HG_PROJECTILE_WALL_BEHAVIOR','[walls] 0 = Stops at walls\n1 = Goes through walls\n2 = Bounces off walls'],
    ['HG_PROJECTILE_GROUND_BEHAVIOR','[grounds] 0 = Stops at ground\n1 = Goes through ground\n2 = Bounces off ground'],
    ['HG_PROJECTILE_ENEMY_BEHAVIOR','[enemies] 0 = Stops at enemies\n1 = Goes through enemies'],
    ['HG_PROJECTILE_UNBASHABLE','[unbashable] Whether a projectile can be caught by Ori’s bash'],
    ['HG_PROJECTILE_PARRY_STUN','[projectile_parry_stun] Whether parrying the projectile will cause the owner to go into parry stun or not'],
    ['HG_PROJECTILE_DOES_NOT_REFLECT','[does_not_reflect] If true, the projectile will not reflect or change ownership when parried'],
    ['HG_PROJECTILE_IS_TRANSCENDENT','[transcendent] If true, the projectile will not be breakable by other hitboxes'],
    ['HG_PROJECTILE_DESTROY_EFFECT','[destory_fx] The visual effect to use when the projectile is destroyed']
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
