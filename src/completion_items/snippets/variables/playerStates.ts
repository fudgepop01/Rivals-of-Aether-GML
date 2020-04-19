import {
  CompletionItemKind, CompletionItem
} from 'vscode-languageserver';

export default (): CompletionItem[] => {
  const playerStates = [
    'PS_WALK',
    'PS_WALK_TURN',
    'PS_DASH_START',
    'PS_DASH',
    'PS_DASH_STOP',
    'PS_DASH_TURN',
    'PS_WAVELAND',

    'PS_AIR_DODGE',
    'PS_PARRY_START',
    'PS_PARRY',
    'PS_ROLL_BACKWARD',
    'PS_ROLL_FORWARD',
    'PS_TECH_GROUND',
    'PS_TECH_BACKWARD',
    'PS_TECH_FORWARD',
    'PS_WALL_TECH',

    'PS_WRAPPED',
    'PS_FROZEN',

    'PS_IDLE',
    'PS_IDLE_AIR',
    'PS_CROUCH',
    'PS_JUMPSQUAT',
    'PS_FIRST_JUMP',
    'PS_DOUBLE_JUMP',
    'PS_WALL_JUMP',
    'PS_LAND',

    'PS_ATTACK_AIR',
    'PS_ATTACK_GROUND',
    'PS_LANDING_LAG',

    'PS_HITSTUN',
    'PS_HITSTUN_LAND',
    'PS_TUMBLE',
    'PS_PRATFALL',
    'PS_PRATLAND',

    'PS_SPAWN',
    'PS_RESPAWN',
    'PS_DEAD'
  ];

  const stateCategories = [
    'SC_HITSTUN',
    'SC_AIR_NEUTRAL',
    'SC_AIR_COMMITTED',
    'SC_GROUND_NEUTRAL',
    'SC_GROUND_COMMITTED'
  ]

  return [
    ...playerStates.map((s) => {
      return {
        label: s,
        kind: CompletionItemKind.Constant,
        documentation: 'player state',
        insertText: s
      }
    }),

    ...stateCategories.map((s) => {
      return {
        label: s,
        kind: CompletionItemKind.Constant,
        documentation: 'state category',
        insertText: s
      }
    }),
  ]
}
