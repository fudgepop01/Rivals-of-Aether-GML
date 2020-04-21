export const strip = (toStrip, clone = true) => {
    const stripped = (clone) ? JSON.parse(JSON.stringify(toStrip)) : toStrip;

    if (Array.isArray(stripped)) {
        for (const entry of stripped) {
            strip(entry, false);
        }
    } else if (stripped.data) {
        for (const [key, val] of Object.entries(stripped.data)) {
            stripped.data[key] = val.value;
        }
    } else {
        for (const [key, val] of Object.entries(stripped)) {
            stripped[key] = val.value;
        }
    }
    
    return stripped;
}

export const populate = (stripped, fields, clone = true) => {
    const populated = (clone) ? JSON.parse(JSON.stringify(stripped)) : stripped;

    if (Array.isArray(populated)) {
        for (const entry of populated) {
            populate(entry, fields, false);
        }
    } else if (populated.data) {
        for (const [key, val] of Object.entries(populated.data)) {
            if (!Object.keys(fields).includes(key)) {
                delete populated.data[key];
                continue;
            }
            populated.data[key] = {
                ...fields[key],
                value: val
            }
        }
    } else {
        for (const [key, val] of Object.entries(populated)) {
            if (!Object.keys(fields).includes(key)) {
                delete populated[key];
                continue;
            }
            populated[key] = {
                ...fields[key],
                value: val
            }
        }
    }

    
    return populated;
}