import {
  CompletionItemKind, CompletionItem, InsertTextFormat
} from 'vscode-languageserver';

export default (): CompletionItem[] => {
  return [
    {
      label: 'asset_get',
      kind: CompletionItemKind.Function,
      documentation: 'Returns the unique index (real) for any built-in game asset – including sounds, objects, and sprites. Can be used, for example, to assign a specific sound effect to a character attack',
      insertText: 'asset_get( "${1:asset/string}" )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'draw_debug_text',
      kind: CompletionItemKind.Function,
      documentation: 'Draws text to the screen',
      insertText: 'draw_debug_text( ${1:x/real}, ${2:y/real}, "${3:text/string}" )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'trigger_b_reverse',
      kind: CompletionItemKind.Function,
      documentation: 'When used in attack_update.gml, it will check for b-reverse inputs on specified attacks.',
      insertText: 'trigger_b_reverse()',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'random_func',
      kind: CompletionItemKind.Function,
      documentation: 'Generates a random value between 0 and high_value, not including high_value. If called by the same player on the same frame with the same index, this function will always return the same value (making it replay-safe)',
      insertText: 'random_func( ${1:index/real}, ${2:high_value/real}, ${3:floored?/boolean} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'random_func2',
      kind: CompletionItemKind.Function,
      documentation: 'Generates a random value between 0 and high_value, not including high_value. If called by the same player on the same frame with the same index, this function will always return the same value (making it replay-safe)',
      insertText: 'random_func2( ${1:index/real}, ${2:high_value/real}, ${3:floored?/boolean} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'attack_end',
      kind: CompletionItemKind.Function,
      documentation: 'Resets can_hit properties for all hitbox groups for the current attack. Can be used for looping attack windows, so that the hitboxes can hit again.',
      insertText: 'attack_end()',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'get_state_name',
      kind: CompletionItemKind.Function,
      documentation: 'Returns a string of the player’s state.',
      insertText: 'get_state_name( ${1:state_index/real} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'set_state',
      kind: CompletionItemKind.Function,
      documentation: 'changes the character\'s state',
      insertText: 'set_state( ${1:state/real} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'set_attack',
      kind: CompletionItemKind.Function,
      documentation: 'Changes the character’s state to the specified attack.',
      insertText: 'set_attack( ${1:attack/real} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'iasa_script',
      kind: CompletionItemKind.Function,
      documentation: 'Frees up the character to perform any action.',
      insertText: 'iasa_script()',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'clear_button_buffer',
      kind: CompletionItemKind.Function,
      documentation: 'Clears the input buffer for the specified action.',
      insertText: 'clear_button_buffer( ${1:input_index/real} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'can_tap_jump',
      kind: CompletionItemKind.Function,
      documentation: 'Used in combination with tap_jump_pressed to check if tap jump is pressed',
      insertText: 'can_tap_jump()',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'hit_fx_create',
      kind: CompletionItemKind.Function,
      documentation: 'Creates a visual effect to be used with your custom character. Returns the index of visual effect, to be stored for later use. Use either asset_get or sprite_get to retrieve the sprite ID',
      insertText: 'hit_fx_create( ${1:sprite_index/real}, ${2:animation_length/real} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'spawn_hit_fx',
      kind: CompletionItemKind.Function,
      documentation: 'Spawns a visual effect at the specified position.',
      insertText: 'spawn_hit_fx( ${1:x/real}, ${2:y/real}, ${3:hit_fx_index/real} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'get_gameplay_time',
      kind: CompletionItemKind.Function,
      documentation: 'Returns the number of frames since the match started.',
      insertText: 'get_gameplay_time()',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'get_game_timer',
      kind: CompletionItemKind.Function,
      documentation: 'Returns the number of frames remaining in the match.',
      insertText: 'get_game_timer()',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'get_stage_data',
      kind: CompletionItemKind.Function,
      documentation: 'Returns the size of the specified part of the stage.',
      insertText: 'get_stage_data( ${1:index/real} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'set_victory_bg',
      kind: CompletionItemKind.Function,
      documentation: 'Overwrites character’s victory background. Can be assigned to a 480x270px custom sprite using sprite_get( sprite )',
      insertText: 'set_victory_bg( ${1:bg/real} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'get_instance_x',
      kind: CompletionItemKind.Function,
      documentation: 'Returns the x value of the specified instance. Used for referencing objects that you normally don’t have access to.',
      insertText: 'get_instance_x( ${1:instance_id/real} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'get_instance_y',
      kind: CompletionItemKind.Function,
      documentation: 'Returns the y value of the specified instance. Used for referencing objects that you normally don’t have access to.',
      insertText: 'get_instance_y( ${1:instance_id/real} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'get_instance_player',
      kind: CompletionItemKind.Function,
      documentation: 'Returns the player number of the specified instance. Used for referencing objects that you normally don’t have access to.',
      insertText: 'get_instance_player( ${1:instance_id/real} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'get_instance_player_id',
      kind: CompletionItemKind.Function,
      documentation: 'Returns the ID of the player associated with the object. Used for referencing objects that you normally don’t have access to.',
      insertText: 'get_instance_player_id( ${1:instance_id/real} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'get_training_cpu_action',
      kind: CompletionItemKind.Function,
      documentation: 'Returns the current “CPU Action” setting in training mode. Can be used in ai_update.gml to separate attack code from other code (like recovery code).',
      insertText: 'get_training_cpu_action()',
      insertTextFormat: InsertTextFormat.Snippet
    }
  ]
}
