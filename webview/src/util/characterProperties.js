export default {
    ground_friction: {
        value: 1.00,
        description: `how fast the character's horizontal speed decreases on the ground`,
        type: 'number'
    },
    air_friction: {
        value: 0.07,
        description: `how fast the character's horizontal speed decreases in midair`,
        type: 'number'
    },
    gravity_speed: {
        value: 0.50,
        description: 'how fast the character falls naturally',
        type: 'number'
    },
    sprite_offset_x: {
        value: 0,
        description: 'sprite offset X location',
        type: 'number'
    },
    sprite_offset_y: {
        value: 0,
        description: 'sprite offset Y location',
        type: 'number'
    },
    position_locked: {
        value: false,
        description: `whether or not the character's offset will move in the editor`,
        type: [true, false]
    }
}