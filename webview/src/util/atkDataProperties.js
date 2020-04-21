import { stripIndent } from 'common-tags';

export default {
    "ATK_INDEX": {
        value: 0,
        description: stripIndent`
        1: AT_JAB
        4: AT_FTILT
        5: AT_DTILT
        6: AT_UTILT
        7: AT_FSTRONG
        8: AT_DSTRONG
        9: AT_USTRONG
        10: AT_DATTACK
        11: AT_FAIR
        12: AT_BAIR
        13: AT_DAIR
        14: AT_UAIR
        15: AT_NAIR
        16: AT_FSPECIAL
        17: AT_DSPECIAL
        18: AT_USPECIAL
        19: AT_NSPECIAL
        20: AT_FSTRONG_2
        21: AT_DSTRONG_2
        22: AT_USTRONG_2
        23: AT_USPECIAL_GROUND
        24: AT_USPECIAL_2
        25: AT_FSPECIAL_2
        26: AT_FTHROW
        27: AT_UTHROW
        28: AT_DTHROW
        29: AT_NTHROW
        30: AT_DSPECIAL_2
        31: AT_EXTRA_1
        32: AT_DSPECIAL_AIR
        33: AT_NSPECIAL_2
        34: AT_FSPECIAL_AIR
        35: AT_TAUNT
        36: AT_TAUNT_2
        37: AT_EXTRA_2
        38: AT_EXTRA_3
        41: AT_NSPECIAL_AIR
        `,
        type: 'number',
    },
    "AG_CATEGORY": {
        value: 0,
        description: stripIndent`
        0 = Grounded only
        1 = Aerial only
        2 = Can be grounded or aerial
        `,
        type: [0, 1, 2],
    },
    "AG_SPRITE": {
        value: '--REPLACE_ME--',
        description: stripIndent`
        The sprite to use for the attack
        `,
        type: 'string',
    },
    "AG_AIR_SPRITE": {
        value: '--REPLACE_ME--',
        description: stripIndent`
        The sprite to use for the attack while aerial. 
        Only applies if AG_CATEGORY is 2
        `,
        type: 'string',
    },
    "AG_HURTBOX_SPRITE": {
        value: '--REPLACE_ME--',
        description: stripIndent`
        The sprite to use for the attack's hurtbox
        `,
        type: 'string',
    },
    "AG_HURTBOX_AIR_SPRITE": {
        value: '--REPLACE_ME--',
        description: stripIndent`
        The sprite to use for the attack's hurtbox while aerial.
        Only applies if AG_CATEGORY is 2
        `,
        type: 'string',
    },
    "AG_NUM_WINDOWS": {
        value: 0,
        description: stripIndent`
        Windows with indexes higher than this value will not naturally transition into later windows
        `,
        type: 'auto',
    },
    "AG_HAS_LANDING_LAG": {
        value: 0,
        description: stripIndent`
        Only applies if AG_CATEGORY is 1
        0 = Continues the attack when landing
        1 = Applies landing lag normally
        `,
        type: [0, 1],
    },
    "AG_OFF_LEDGE": {
        value: 0,
        description: stripIndent`
        0 = Stops at ledge
        1 = Goes off ledge
        `,
        type: [0, 1],
    },
    "AG_LANDING_LAG": {
        value: 0,
        description: stripIndent`
        The number of landing lag frames applied when landing. 
        If you whiff the attack, this value is multiplied by 1.5.
        Only applies if AG_HAS_LANDING_LAG is 1
        `,
        type: 'number',
    },
    "AG_STRONG_CHARGE_WINDOW": {
        value: 0,
        description: stripIndent`
        If attack is held at the end of this window, the character will freeze and charge the attack before moving to the next window
        `,
        type: 'number',
    },
    "AG_USES_CUSTOM_GRAVITY": {
        value: 0,
        description: stripIndent`
        0 = Attack uses default gravity
        1 = Attack uses custom gravity. 
        Values must be set for every window of the attack individually
        `,
        type: [0, 1],
    } 
}