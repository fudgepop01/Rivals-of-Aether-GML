import {
  CompletionItemKind, CompletionItem, InsertTextFormat
} from 'vscode-languageserver';

export default (): CompletionItem[] => {
  return [
    {
      label: 'get_player_team',
      kind: CompletionItemKind.Function,
      documentation: 'Returns the team of the specified player. If team mode is off, it will return the player number.',
      insertText: 'get_player_team( ${1:player/real} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'set_player_team',
      kind: CompletionItemKind.Function,
      documentation: 'Sets the team for the specified player.',
      insertText: 'set_player_team( ${1:player/real}, ${2:value/real} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'get_player_stocks',
      kind: CompletionItemKind.Function,
      documentation: 'Returns the number of stocks the specified player has.',
      insertText: 'get_player_stocks( ${1:player/real} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'set_player_stocks',
      kind: CompletionItemKind.Function,
      documentation: 'Sets the number of stocks for the specified player.',
      insertText: 'set_player_stocks( ${1:player/real}, ${2:value/real} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'get_player_color',
      kind: CompletionItemKind.Function,
      documentation: 'Returns the color slot being currently used by the specified player.',
      insertText: 'get_player_color( ${1:player/real} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'get_player_damage',
      kind: CompletionItemKind.Function,
      documentation: 'Returns the amount of damage the specified player has.',
      insertText: 'get_player_damage( ${1:player/real} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'set_player_damage',
      kind: CompletionItemKind.Function,
      documentation: 'Sets the amount of damage for the specified player.',
      insertText: 'set_player_damage( ${1:player/real}, ${2:value/real} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'take_damage',
      kind: CompletionItemKind.Function,
      documentation: 'Deals damage to the specified player.',
      insertText: 'take_damage( ${1:damaged_player/real}, ${2:attacking_player/real}, ${3:damage/real} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'is_attack_pressed',
      kind: CompletionItemKind.Function,
      documentation: 'Returns whether the Attack button is pressed while also taking the right stick into account if it’s set to Attack.',
      insertText: 'is_attack_pressed( ${1:direction/real=DIR_} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'is_strong_pressed',
      kind: CompletionItemKind.Function,
      documentation: 'Returns whether the Strong button is pressed while also taking the right stick into account if it’s set to Strong.',
      insertText: 'is_strong_pressed( ${1:direction/real=DIR_} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'is_special_pressed',
      kind: CompletionItemKind.Function,
      documentation: 'Returns whether the Special button is pressed while also taking the right stick into account if it’s set to Special.',
      insertText: 'is_special_pressed( ${1:direction/real=DIR_} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'has_rune',
      kind: CompletionItemKind.Function,
      documentation: 'This function checks whether a specific rune is currently equipped on the player calling the function.',
      insertText: 'has_rune( ${1:letter/string} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'set_victory_portriat',
      kind: CompletionItemKind.Function,
      documentation: 'Overwrites character’s victory portrait. Can be assigned to a 350x350px custom sprite using sprite_get( sprite )',
      insertText: 'set_victory_portriat( ${1:sprite/real} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'set_victory_sidebar',
      kind: CompletionItemKind.Function,
      documentation: 'Overwrites character’s results screen sidebar image. (the one displaying their placement, defaulting to results_small.png.) Can be assigned to a 79x31px custom sprite using sprite_get( sprite )',
      insertText: 'set_victory_sidebar( ${1:sprite/real} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'is_laststock',
      kind: CompletionItemKind.Function,
      documentation: 'Returns true if all active players have 1 stock remaining during a stock match.',
      insertText: 'is_laststock()',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'is_player_on',
      kind: CompletionItemKind.Function,
      documentation: 'Checks whether the player slot is active or not',
      insertText: 'is_player_on( ${1:slot/real} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'get_player_hud_color',
      kind: CompletionItemKind.Function,
      documentation: 'Returns the hex value of the specified player’s HUD color.',
      insertText: 'get_player_hud_color( ${1:slot/real} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'get_char_info',
      kind: CompletionItemKind.Function,
      documentation: 'Returns with various values from the character’s main folder that are otherwise inaccessible.',
      insertText: 'get_char_info( ${1:player_slot/real}, ${2:info/INFO_} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'get_synced_var',
      kind: CompletionItemKind.Function,
      documentation: 'Returns the persistent global variable from that player slot, set by set_synced_var( player, value )',
      insertText: 'get_synced_var( ${1:player_slot/real} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'set_synced_var',
      kind: CompletionItemKind.Function,
      documentation: 'Sets the persistent global variable of that player slot. This value persists before and after matches, as well as in replays. It is also synced at the start of online matches. See get_synced_var( player ) for how to get this value.',
      insertText: 'set_synced_var( ${1:player_slot/int}, ${2:value/int} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'get_player_name',
      kind: CompletionItemKind.Function,
      documentation: 'Returns the name being currently used by the specified player, returning “P1”, “P2”, etc. if the player has no name set.',
      insertText: 'get_player_name( ${1:player_slot/int} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
  ]
}
