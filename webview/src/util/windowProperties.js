import { stripIndent } from 'common-tags';
import sfx from './sfxNames.js';

export default {
    AG_WINDOW_TYPE: {
        value: 0,
        description: stripIndent`
        0 = Normal
        7 = Goes into pratfall
        8 = Goes to the next window if it’s on the ground, otherwise loops
        9 = Looping window
        `,
        type: [0, 7, 8, 9]
    },
    AG_WINDOW_LENGTH: {
        value: 5,
        description: 'The duration of the window, in frames',
        type: 'number'
    },
    AG_WINDOW_ANIM_FRAMES: {
        value: 1,
        description: 'The number of animation frames to display over the duration of the window',
        type: 'number'
    },
    AG_WINDOW_ANIM_FRAME_START: {
        value: 0,
        description: 'The animation frame on which the window starts',
        type: 'number'
    },
    AG_WINDOW_HSPEED: {
        value: null,
        description: 'The horizontal speed to apply during the window in pixels per frame. The type of speed boost depends on AG_WINDOW_HSPEED_TYPE',
        type: 'number'
    },
    AG_WINDOW_VSPEED: {
        value: null,
        description: 'The vertical speed to apply during the window in pixels per frame. The type of speed boost depends on AG_WINDOW_VSPEED_TYPE',
        type: 'number'
    },
    AG_WINDOW_HSPEED_TYPE: {
        value: 0,
        description: stripIndent`
        0 = AG_WINDOW_HSPEED is applied on top of your current momentum as a boost
        1 = Horizontal speed is set to AG_WINDOW_HSPEED on every frame of the window
        2 = Horizontal speed is set to AG_WINDOW_HSPEED on the first frame of the window
        `,
        type: [0, 1, 2]
    },
    AG_WINDOW_VSPEED_TYPE: {
        value: 0,
        description: stripIndent`
        0 = AG_WINDOW_VSPEED is applied on top of your current momentum as a boost
        1 = Vertical speed is set to AG_WINDOW_VSPEED on every frame of the window
        2 = Vertical speed is set to AG_WINDOW_VSPEED on the first frame of the window
        `,
        type: [0, 1, 2]
    },
    AG_WINDOW_HAS_CUSTOM_FRICTION: {
        value: 0,
        description: stripIndent`
        0 = Uses default friction
        1 = Uses custom friction
        `,
        type: [0, 1]
    },
    AG_WINDOW_CUSTOM_AIR_FRICTION: {
        value: null,
        description: 'The horizontal friction to apply per frame while aerial. Only applies if AG_WINDOW_HAS_CUSTOM_FRICTION is 1',
        type: 'number',
        dependencies: ['obj.AG_WINDOW_HAS_CUSTOM_FRICTION.value === 1']
    },
    AG_WINDOW_CUSTOM_GROUND_FRICTION: {
        value: null,
        description: 'The horizontal friction to apply per frame while grounded. Only applies if AG_WINDOW_HAS_CUSTOM_FRICTION is 1',
        type: 'number',
        dependencies: ['obj.AG_WINDOW_HAS_CUSTOM_FRICTION.value === 1']
    },
    AG_WINDOW_CUSTOM_GRAVITY: {
        value: null,
        description: 'The gravitational acceleration to apply every frame of the window. Only applies if AG_USES_CUSTOM_GRAVITY is 1',
        type: 'number'
    },
    AG_WINDOW_HAS_WHIFFLAG: {
        value: 0,
        description: stripIndent`
        0 = Window is always the same length
        1 = Window is 1.5x longer if you haven’t hit someone
        `,
        type: [0, 1]
    },
    AG_WINDOW_INVINCIBILITY: {
        value: 0,
        description: stripIndent`
        0 = No invincibility
        1 = Invincible to all attacks
        2 = Invincible to projectiles
        `,
        type: [0, 1, 2]
    },
    AG_WINDOW_HITPAUSE_FRAME: {
        value: 0,
        description: 'The animation frame to show during hitpause; 0 = no specific frame',
        type: 'number'
    },
    AG_WINDOW_CANCEL_TYPE: {
        value: 0,
        description: stripIndent`
        0 = Window does not cancel
        1 = Cancels into the next window if attack is pressed (when on a jab, this allows it to be tilt-cancelled)
        2 = Cancels into the next window if special is pressed
        Cancels do not work if AG_WINDOW_TYPE is 8
        `,
        type: [0, 1, 2]
    },
    AG_WINDOW_CANCEL_FRAME: {
        value: null,
        description: 'If AG_WINDOW_CANCEL_TYPE is greater than 0, the attack will become cancellable on this frame',
        type: 'number',
        dependencies: ["obj.AG_WINDOW_CANCEL_TYPE.value !== 0"]
    },
    AG_WINDOW_HAS_SFX: {
        value: 0,
        description: stripIndent`
        0 = Does not have a sound effect
        1 = Has a sound effect
        `,
        type: [0, 1]
    },
    AG_WINDOW_SFX: {
        value: null,
        description: 'The index of the sound effect. Only applies if AG_WINDOW_HAS_SFX is 1',
        type: `sound`,
        options: JSON.stringify(sfx),
        dependencies: ["obj.AG_WINDOW_HAS_SFX.value == 1"]
    },
    AG_WINDOW_SFX_FRAME: {
        value: null,
        description: 'The frame in the window that the sound effect is played. Only applies if AG_WINDOW_HAS_SFX is 1',
        type: 'number',
        dependencies: ["obj.AG_WINDOW_HAS_SFX.value == 1"]
    },
}

export const isDisabled = (prop, obj) => {
    let deps = obj[prop].dependencies;
    if (!deps) return false;
    for (const condition of deps) {
        // eval is fine here because it's 100% client-side
        if (eval(condition)) continue;
        else return true;
    }
    return false;
}

/*
{
    value: ,
    description: ''
}


*/