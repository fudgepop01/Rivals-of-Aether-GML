const setAtkValTemplate = `set_attack_value(__ATKNAME__, __AGINDEX__, __VALUE__);`;
const setAtkValSpriteTemplate = `set_attack_value(__ATKNAME__, __AGINDEX__, sprite_get("__VALUE__"));`;
const setWinValTemplate = `set_window_value(__ATKNAME__, __WINDOWNUM__, __AGINDEX__, __VALUE__);`;
const setHbNumTempalte = `set_num_hitboxes(__ATKNAME__, __VALUE__);`;
const setHbValTemplate = `set_hitbox_value(__ATKNAME__, __HITBOXNUM__, __HGINDEX__, __VALUE__);`;
const spriteOffsetChangeTemplate = `sprite_change_offset("--REPLACE_ME--", __VALUEX__, __VALUEY__)`;

const ATK_INDEXES = {
    1: "AT_JAB",
    4: "AT_FTILT",
    5: "AT_DTILT",
    6: "AT_UTILT",
    7: "AT_FSTRONG",
    8: "AT_DSTRONG",
    9: "AT_USTRONG",
    10: "AT_DATTACK",
    11: "AT_FAIR",
    12: "AT_BAIR",
    13: "AT_DAIR",
    14: "AT_UAIR",
    15: "AT_NAIR",
    16: "AT_FSPECIAL",
    17: "AT_DSPECIAL",
    18: "AT_USPECIAL",
    19: "AT_NSPECIAL",
    20: "AT_FSTRONG_2",
    21: "AT_DSTRONG_2",
    22: "AT_USTRONG_2",
    23: "AT_USPECIAL_GROUND",
    24: "AT_USPECIAL_2",
    25: "AT_FSPECIAL_2",
    26: "AT_FTHROW",
    27: "AT_UTHROW",
    28: "AT_DTHROW",
    29: "AT_NTHROW",
    30: "AT_DSPECIAL_2",
    31: "AT_EXTRA_1",
    32: "AT_DSPECIAL_AIR",
    33: "AT_NSPECIAL_2",
    34: "AT_FSPECIAL_AIR",
    35: "AT_TAUNT",
    36: "AT_TAUNT_2",
    37: "AT_EXTRA_2",
    38: "AT_EXTRA_3",
    41: "AT_NSPECIAL_AIR"
}

export default (charData, atkData, windows, hitboxes) => {
    let out_INIT = "";
    let out_LOAD = "";
    let out_ATK = "";

    let ATK_NAME;
    if (Object.keys(ATK_INDEXES).includes(atkData.ATK_INDEX.value.toString())) ATK_NAME = ATK_INDEXES[parseInt(atkData.ATK_INDEX.value.toString())];
    else ATK_NAME = atkData.ATK_INDEX.value;

    for (const [key, entry] of Object.entries(charData)) {        
        switch (key) {
            case 'sprite_offset_x':
            case 'sprite_offset_y':
            case 'position_locked':
                continue;

            default: 
                out_INIT += `${key} = ${entry.value};\n`;
        }
    }
    out_LOAD += spriteOffsetChangeTemplate
        .replace('__VALUEX__', charData.sprite_offset_x.value)
        .replace('__VALUEY__', charData.sprite_offset_y.value * -1) 
        + '\n';

    for (const [key, entry] of Object.entries(atkData)) {    
        if ([null, undefined, '...', '--REPLACE_ME--', 0].includes(entry.value)) continue;
        switch (key) {
            case 'ATK_INDEX': 
                continue;
            case 'AG_SPRITE':
            case 'AG_AIR_SPRITE':
            case 'AG_HURTBOX_SPRITE':
            case 'AG_HURTBOX_AIR_SPRITE':
                out_ATK += setAtkValSpriteTemplate
                    .replace("__ATKNAME__", ATK_NAME)
                    .replace("__AGINDEX__", key)
                    .replace("__VALUE__", entry.value)
                    + '\n'
                break;
            default: 
                out_ATK += setAtkValTemplate
                    .replace("__ATKNAME__", ATK_NAME)
                    .replace("__AGINDEX__", key)
                    .replace("__VALUE__", entry.value)
                    + '\n'
        }
    }
    out_ATK += `\nset_attack_value(${ATK_NAME}, AG_NUM_WINDOWS, ${windows.length});\n`;

    for (const [i, win] of windows.entries()) {
        for (const [key, entry] of Object.entries(win.data)) {    
            if ([null, undefined, '...', 0].includes(entry.value)) continue;
            out_ATK += setWinValTemplate
                .replace("__ATKNAME__", ATK_NAME)
                .replace("__WINDOWNUM__", i + 1)
                .replace("__AGINDEX__", key)
                .replace("__VALUE__", (key === 'AG_WINDOW_SFX') ? `asset_get("${entry.value}")` : entry.value)
                + '\n';
        }
        out_ATK += '\n';
    }
    out_ATK += '\n' + 
        setHbNumTempalte
        .replace("__ATKNAME__", ATK_NAME)
        .replace("__VALUE__", hitboxes.length)
        + '\n';
    

    const hbs = hitboxes.sort((a, b) => {
        if (a.data.HG_WINDOW.value < b.data.HG_WINDOW.value) return -1;
        if (a.data.HG_WINDOW.value > b.data.HG_WINDOW.value) return 1;
        if (a.data.HG_WINDOW_CREATION_FRAME.value < b.data.HG_WINDOW_CREATION_FRAME.value) return -1;
        if (a.data.HG_WINDOW_CREATION_FRAME.value > b.data.HG_WINDOW_CREATION_FRAME.value) return 1;
        return 0;
    })
    for (const [i, hb] of hbs.entries()) {
        for (const [key, entry] of Object.entries(hb.data)) {  
            if ([null, undefined, '...', 0].includes(entry.value) && !["HG_WINDOW_CREATION_FRAME", "HG_WINDOW"].includes(key)) continue;

            // because I made a few silly miscalculations
            if (key === "HG_HITBOX_X") entry.value -= charData.sprite_offset_x.value; 
            else if (key === "HG_HITBOX_Y") entry.value += charData.sprite_offset_y.value; 
            else if (key === "HG_WINDOW") entry.value ++;
            else if (key === "HG_WINDOW_CREATION_FRAME") entry.value ++;
            
            out_ATK += setHbValTemplate
                .replace("__ATKNAME__", ATK_NAME)
                .replace("__HITBOXNUM__", i + 1)
                .replace("__HGINDEX__", key)
                .replace("__VALUE__", entry.value)
                + '\n'
        }
        out_ATK += '\n';
    }

    return {
        out_LOAD,
        out_INIT,
        out_ATK
    }
}