import { stripIndent } from 'common-tags';
import sfx from './sfxNames.js';

export default {
    HG_PARENT_HITBOX: {
        value: 0,
        description: stripIndent`
        If HG_PARENT_HITBOX is anything other than 0, then it will inherit all values from the hitbox with index: HG_PARENT_HITBOX for all properties except the following:
        HG_HITBOX_TYPE
        HG_WINDOW
        HG_WINDOW_CREATION_FRAME
        HG_LIFETIME
        HG_HITBOX_X
        HG_HITBOX_Y
        HG_HITBOX_GROUP
        `,
        type: 'number',
    },
    HG_HITBOX_TYPE: {
        value: 1,
        description: stripIndent`
        1 = Physical attack
        2 = Projectile
        `,
        type: [1, 2],
    },
    HG_WINDOW: {
        value: 0,
        description: stripIndent`
        The attack window in which the hitbox is created
        `,
        type: 'number',
    },
    HG_WINDOW_CREATION_FRAME: {
        value: 0,
        description: stripIndent`
        The frame in which the hitbox is created, relative to the start of the attack window
        `,
        type: 'number',
    },
    HG_LIFETIME: {
        value: 1,
        description: stripIndent`
        The duration of the hitbox, in frames
        `,
        type: 'number',
    },
    HG_HITBOX_X: {
        value: 0,
        description: stripIndent`
        The x position of the center of the hitbox, relative to the center of the player
        `,
        type: 'number',
    },
    HG_HITBOX_Y: {
        value: 0,
        description: stripIndent`
        The y position of the center of the hitbox, relative to the bottom of the player
        `,
        type: 'number',
    },
    HG_WIDTH: {
        value: 1,
        description: stripIndent`
        The width of the hitbox, in pixels
        `,
        type: 'number',
    },
    HG_HEIGHT: {
        value: 1,
        description: stripIndent`
        The height of the hitbox, in pixels
        `,
        type: 'number',
    },
    HG_SHAPE: {
        value: 0,
        description: stripIndent`
        0 = Circle (hitbox_circle_spr)
        1 = Rectangle (hitbox_square_spr)
        2 = Rounded Rectangle (hitbox_rounded_rectangle)
        `,
        type: [0, 1, 2],
    },
    HG_PRIORITY: {
        value: 1,
        description: stripIndent`
        Ranges from 1 to 10, with a priority 10 hitbox taking priority over a priority 1 hitbox if both hit at the same time
        `,
        type: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    },
    HG_DAMAGE: {
        value: 0,
        description: stripIndent`
        The damage dealt by the hitbox
        `,
        type: 'number',
    },
    HG_ANGLE: {
        value: 0,
        description: stripIndent`
        The angle at which the hitbox sends opponents. 
        0 is straight horizontally forward, 90 is upward, 270 is downward. 
        A value of 361 will send at 45 for aerial opponents and 40 for grounded opponents. 
        Can be overwritten or modified by HG_ANGLE_FLIPPER
        `,
        type: 'number',
    },
    HG_BASE_KNOCKBACK: {
        value: 0,
        description: stripIndent`
        The amount of knockback the move applies to an opponent regardless of their damage
        `,
        type: 'number',
    },
    HG_KNOCKBACK_SCALING: {
        value:0 ,
        description: stripIndent`
        The amount of knockback to add to HG_BASE_KNOCKBACK relative to the opponent’s damage
        `,
        type: 'number',
    },
    HG_EFFECT: {
        value: 0,
        description: stripIndent`
        1 = Burn
        2 = Burn consume
        3 = Burn stun (extra hitpause on burning opponents. Used to guarantee the final hit on Zetterburn’s empowered strong attack)
        4 = Wrap
        5 = Freeze
        6 = Mark
        8 = Auto Wrap
        9 = Polite (only deals hitstun if already in hitstun)
        10 = Poison
        11 = Plasma Stun
        12 = Crouch armors through it
        `,
        type: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    },
    HG_BASE_HITPAUSE: {
        value: 0,
        description: stripIndent`
        The amount of hitpause the move applies to an opponent regardless of their damage
        `,
        type: 'number',
    },
    HG_HITPAUSE_SCALING: {
        value: 0,
        description: stripIndent`
        The amount of hitpause to add to HG_BASE_HITPAUSE relative to the opponent’s damage
        `,
        type: 'number',
    },
    HG_VISUAL_EFFECT: {
        value: 0,
        description: stripIndent`
        The visual effect to create when the hitbox hits something
        `,
        type: 'number',
    },
    HG_VISUAL_EFFECT_X_OFFSET: {
        value: 0,
        description: stripIndent`
        Normally, the visual effect is created between the center of the hitbox and the opponent’s position. 
        The value here adds an offset to the center of the hitbox in that calculation
        `,
        type: 'number',
    },
    HG_VISUAL_EFFECT_Y_OFFSET: {
        value: 0,
        description: stripIndent`
        Normally, the visual effect is created between the center of the hitbox and the opponent’s position. 
        The value here adds an offset to the center of the hitbox in that calculation
        `,
        type: 'number',
    },
    HG_HIT_SFX: {
        value: 0,
        description: stripIndent`
        The index of the sound effect to play when the attack hits
        `,
        options: JSON.stringify(sfx),
        type: `sound {${JSON.stringify(sfx)}}`,
    },
    HG_ANGLE_FLIPPER: {
        value: 0,
        description: stripIndent`
        0 = Sends at the exact knockback_angle every time
        1 = Sends away from the center of the enemy player
        2 = Sends toward the center of the enemy player
        3 = Horizontal knockback sends away from the center of the hitbox
        4 = Horizontal knockback sends toward the center of the hitbox
        5 = Horizontal knockback is reversed
        6 = Horizontal knockback sends away from the enemy player
        7 = Horizontal knockback sends toward the enemy player
        8 = Sends away from the center of the hitbox
        9 = Sends toward the center of the hitbox
        `,
        type: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    },
    HG_EXTRA_HITPAUSE: {
        value: 0,
        description: stripIndent`
        Extra hitpause to apply to the opponent only. Can be negative
        `,
        type: 'number',
    },
    HG_GROUNDEDNESS: {
        value: 0,
        description: stripIndent`
        0 = Can hit both aerial and grounded opponents
        1 = Can only hit grounded opponents
        2 = Can only hit aerial opponents
        `,
        type: [0, 1, 2],
    },
    HG_EXTRA_CAMERA_SHAKE: {
        value: 0,
        description: stripIndent`
        -1 = No camera shake
        0 = Normal camera shake. Only applied if knockback speed is above 1
        1 = Force camera shake, even if knockback speed is lower than 1
        `,
        type: [-1, 0, 1],
    },
    HG_IGNORES_PROJECTILES: {
        value: 0,
        description: stripIndent`
        0 = Can break projectiles
        1 = Cannot break projectiles
        `,
        type: [0, 1],
    },
    HG_HIT_LOCKOUT: {
        value: 0,
        description: stripIndent`
        The number of frames after this hitbox connects where another hitbox belonging to the same player cannot hit the opponent
        `,
        type: 'number',
    },
    HG_EXTENDED_PARRY_STUN: {
        value: 0,
        description: stripIndent`
        When this hitbox is parried, the amount of parry stun inflicted on the opponent will be relative to the distance between you
        `,
        type: 'number',
    },
    HG_HITBOX_GROUP: {
        value: 0,
        description: stripIndent`
        Only one hitbox per group can hit an opponent until the attack ends. 
        This can be overwritten by calling attack_end() to manually reset all hitbox group flags. 
        Hitboxes in group -1 can always hit an opponent. Projectiles always belong to group -1
        `,
        type: 'number',
    },
    HG_HITSTUN_MULTIPLIER: {
        value: 0,
        description: stripIndent`
        The value by which hitstun is multiplied after being calculated normally. 
        A value of 0 results in default hitstun (the same as a value of 1)
        `,
        type: 'number',
    },
    HG_DRIFT_MULTIPLIER: {
        value: 1,
        description: stripIndent`
        Causes the acceleration of the opponent’s drift DI to be multiplied by this value
        `,
        type: 'number',
    },
    HG_SDI_MULTIPLIER: {
        value: 1,
        description: stripIndent`
        Causes the distance of the opponent’s SDI to be multiplied by this value.
        `,
        type: 'number',
    },
    HG_TECHABLE: {
        value: 0,
        description: stripIndent`
        0 = Can tech
        1 = Cannot tech
        2 = Goes through platforms (used by Etalus Uair)
        3 = Cannot tech or bounce
        `,
        type: [0, 1, 2, 3],
    },
    HG_FORCE_FLINCH: {
        value: 0,
        description: stripIndent`
        0 = Does not force flinch
        1 = Forces grounded opponents to flinch
        2 = Cannot cause opponents to flinch
        3 = Causes crouching opponents to flinch
        `,
        type: [0, 1, 2, 3],
    },
    HG_FINAL_BASE_KNOCKBACK: {
        value: 0,
        description: stripIndent`
        If this is greater than 0, the base knockback of the hitbox will progress linearly from HG_BASE_KNOCKBACK to HG_FINAL_BASE_KNOCKBACK over the span of the hitbox’s lifetime
        `,
        type: 'number',
    },
    HG_THROWS_ROCK: {
        value: 0,
        description: stripIndent`
        0 = Breaks rock
        1 = Throws rock
        2 = Ignores rock
        `,
        type: [0, 1, 2],
    },

    // PROJECTILE ONLY ATTRIBUTES
    HG_PROJECTILE_SPRITE: {
        value: "...",
        description: stripIndent`
        The sprite to loop for the projectile’s animation
        `,
        type: 'string',
        dependencies: ["obj.HG_HITBOX_TYPE.value == 2"]
    },
    HG_PROJECTILE_MASK: {
        value: "...",
        description: stripIndent`
        The sprite to use for the projectile’s collision (uses precise collision). Set to -1 to use normal hitbox collision with HG_SHAPE
        `,
        type: 'string',
        dependencies: ["obj.HG_HITBOX_TYPE.value == 2"]
    },
    HG_PROJECTILE_ANIM_SPEED: {
        value: 0.5,
        description: stripIndent`
        The speed at which the projectile’s sprite will animate
        `,
        type: 'number',
        dependencies: ["obj.HG_HITBOX_TYPE.value == 2"]
    },
    HG_PROJECTILE_HSPEED: {
        value: 1,
        description: stripIndent`
        The initial horizontal speed of the projectile in pixels per frame
        `,
        type: 'number',
        dependencies: ["obj.HG_HITBOX_TYPE.value == 2"]
    },
    HG_PROJECTILE_VSPEED: {
        value: 0,
        description: stripIndent`
        The initial vertical speed of the projectile in pixels per frame
        `,
        type: 'number',
        dependencies: ["obj.HG_HITBOX_TYPE.value == 2"]
    },
    HG_PROJECTILE_GRAVITY: {
        value: 0,
        description: stripIndent`
        The downward acceleration applied to the projectile every frame
        `,
        type: 'number',
        dependencies: ["obj.HG_HITBOX_TYPE.value == 2"]
    },
    HG_PROJECTILE_GROUND_FRICTION: {
        value: 0,
        description: stripIndent`
        The decrease in horizontal speed per frame when the projectile is grounded
        `,
        type: 'number',
        dependencies: ["obj.HG_HITBOX_TYPE.value == 2"]
    },
    HG_PROJECTILE_AIR_FRICTION: {
        value: 0,
        description: stripIndent`
        The decrease in horizontal speed per frame when the projectile is aerial
        `,
        type: 'number',
        dependencies: ["obj.HG_HITBOX_TYPE.value == 2"]
    },
    HG_PROJECTILE_WALL_BEHAVIOR: {
        value: 0,
        description: stripIndent`
        0 = Stops at walls
        1 = Goes through walls
        2 = Bounces off walls
        `,
        type: [0, 1, 2],
        dependencies: ["obj.HG_HITBOX_TYPE.value == 2"]
    },
    HG_PROJECTILE_GROUND_BEHAVIOR: {
        value: 0,
        description: stripIndent`
        0 = Stops at ground
        1 = Goes through ground
        2 = Bounces off ground
        `,
        type: [0, 1, 2],
        dependencies: ["obj.HG_HITBOX_TYPE.value == 2"]
    },
    HG_PROJECTILE_ENEMY_BEHAVIOR: {
        value: 0,
        description: stripIndent`
        0 = Stops at enemies
        1 = Goes through enemies
        `,
        type: [0, 1],
        dependencies: ["obj.HG_HITBOX_TYPE.value == 2"]
    },
    HG_PROJECTILE_UNBASHABLE: {
        value: 1,
        description: stripIndent`
        Whether a projectile can be caught by Ori’s bash
        `,
        type: [0, 1],
        dependencies: ["obj.HG_HITBOX_TYPE.value == 2"]
    },
    HG_PROJECTILE_PARRY_STUN: {
        value: 0,
        description: stripIndent`
        Whether parrying the projectile will cause the owner to go into parry stun or not
        `,
        type: [0, 1],
        dependencies: ["obj.HG_HITBOX_TYPE.value == 2"]
    },
    HG_PROJECTILE_DOES_NOT_REFLECT: {
        value: 0,
        description: stripIndent`
        If true, the projectile will not reflect or change ownership when parried
        `,
        type: [0, 1],
        dependencies: ["obj.HG_HITBOX_TYPE.value == 2"]
    },
    HG_PROJECTILE_IS_TRANSCENDENT: {
        value: 0,
        description: stripIndent`
        If true, the projectile will not be breakable by other hitboxes
        `,
        type: [0, 1],
        dependencies: ["obj.HG_HITBOX_TYPE.value == 2"]
    },
    HG_PROJECTILE_DESTROY_EFFECT: {
        value: 0,
        description: stripIndent`
        The visual effect to use when the projectile is destroyed
        `,
        type: 'number',
        dependencies: ["obj.HG_HITBOX_TYPE.value == 2"]
    },
}