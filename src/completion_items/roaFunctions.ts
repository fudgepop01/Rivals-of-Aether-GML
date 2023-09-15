import GENERAL from './snippets/functions/general';
import PLAYER_RELATED from './snippets/functions/playerRelated';
import SPRITE_FUNCTIONS from './snippets/functions/spriteFunctions';
import SOUND_FUNCTIONS from './snippets/functions/soundFunctions';
import COLOR_FUNCTIONS from './snippets/functions/colorFunctions';
import SHADER_FUNCTIONS from './snippets/functions/shaderFunctions';
import ATTACK_HG_FUNCTIONS from './snippets/functions/attackHGFunctions';
import EASING_FUNCTIONS from './snippets/functions/easingFunctions';
import STAGE_FUNCTIONS from './snippets/functions/stageFunctions';

import PLAYER_STATES from './snippets/variables/playerStates';
import PLAYER_VARIABLES from './snippets/variables/playerVariables';
import ATTACK_INDEXES from './snippets/variables/attackIndexes';
import ATTACK_GRID_INDEXES from './snippets/variables/attackGridIndexes';
import HITBOX_VARIABLES from './snippets/variables/hitboxVariables';
import HITBOX_GRID_INDEXES from './snippets/variables/hitboxGridIndexes';

import BUILTINS from './snippets/Builtins';

import charInfo from './snippets/variables/charInfo';
import directions from './snippets/variables/directions';
import localSettings from './snippets/variables/localSettings';
import matchSettings from './snippets/variables/matchSettings';
import ui_indexes from './snippets/variables/ui_indexes';
import bgData from './snippets/variables/bgData';
import cameraFunctions from './snippets/functions/cameraFunctions';
import toolSpecific from './snippets/toolSpecific';

export const getFreshList = () => {
  return [
    ...GENERAL(),
    ...PLAYER_RELATED(),
    ...SPRITE_FUNCTIONS(),
    ...SOUND_FUNCTIONS(),
    ...COLOR_FUNCTIONS(),
    ...SHADER_FUNCTIONS(),
    ...ATTACK_HG_FUNCTIONS(),
    ...EASING_FUNCTIONS(),
    ...STAGE_FUNCTIONS(),

    ...PLAYER_STATES(),
    ...PLAYER_VARIABLES(),
    ...ATTACK_INDEXES(),
    ...ATTACK_GRID_INDEXES(),
    ...HITBOX_VARIABLES(),
    ...HITBOX_GRID_INDEXES(),
    ...charInfo(),
    ...directions(),
    ...localSettings(),
    ...matchSettings(),
    ...ui_indexes(),
    ...bgData(),
    ...cameraFunctions(),

    ...BUILTINS(),

    ...toolSpecific()
  ];
};

export const compiledList = getFreshList();