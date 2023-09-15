import {
  CompletionItemKind, CompletionItem, InsertTextFormat
} from 'vscode-languageserver'

export default (): CompletionItem[] => {
  return [
    {

      label: 'get_attack_value',
      kind: CompletionItemKind.Function,
      documentation: 'Returns a value (real or undefined) from the attack grid for the specified attack and index.',
      insertText: 'get_attack_value( ${1:attack/real}, ${2:index/real} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'set_attack_value',
      kind: CompletionItemKind.Function,
      documentation: 'Overwrites a value from the attack grid for the specified attack and index. Default values are always 0.',
      insertText: 'set_attack_value( ${1:attack/real}, ${2:index/real}, ${3:value/real} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'reset_attack_value',
      kind: CompletionItemKind.Function,
      documentation: 'Resets a value from the attack grid to the one originally initialized in [attack_name].gml.',
      insertText: 'reset_attack_value( ${1:attack/real}, ${2:index/real} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'get_window_value',
      kind: CompletionItemKind.Function,
      documentation: 'Returns a value (real or undefined) from the attack grid for the specified attack, window and index.',
      insertText: 'get_window_value( ${1:attack/real}, ${2:window/real}, ${3:index/real} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'set_window_value',
      kind: CompletionItemKind.Function,
      documentation: 'Overwrites a value from the attack grid for the specified attack, window and index. Default values are always 0.',
      insertText: 'set_window_value( ${1:attack/real}, ${2:window/real}, ${3:index/real}, ${4:value/real} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'reset_window_value',
      kind: CompletionItemKind.Function,
      documentation: 'Resets a window value from the attack grid to the one originally initialized in [attack_name].gml.',
      insertText: 'reset_window_value( ${1:attack/real}, ${2:window/real}, ${3:index/real} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'get_hitbox_value',
      kind: CompletionItemKind.Function,
      documentation: 'Returns a value (real or undefined) from the hitbox grid for the specified attack and index.',
      insertText: 'get_hitbox_value( ${1:attack/real}, ${2:hitbox/real}, ${3:index/real} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'set_hitbox_value',
      kind: CompletionItemKind.Function,
      documentation: 'Overwrites a value from the hitbox grid for the specified attack and index. Default values are always 0.',
      insertText: 'set_hitbox_value( ${1:attack/real}, ${2:hitbox/real}, ${3:index/real}, ${4:value/real} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'reset_hitbox_value',
      kind: CompletionItemKind.Function,
      documentation: 'Resets a value from the hitbox grid to the one originally initialized in [attack_name].gml.',
      insertText: 'reset_hitbox_value( ${1:attack/real}, ${2:hitbox/real}, ${3:index/real} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'get_num_hitboxes',
      kind: CompletionItemKind.Function,
      documentation: 'Returns the number of hitboxes for the specified attack.',
      insertText: 'get_num_hitboxes( ${1:attack/real} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'set_num_hitboxes',
      kind: CompletionItemKind.Function,
      documentation: 'Overwrites the number of hitboxes for the specified attack.',
      insertText: 'set_num_hitboxes( ${1:attack/real}, ${2:value/real} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'reset_num_hitboxes',
      kind: CompletionItemKind.Function,
      documentation: 'Resets the number of hitboxes for the specified attack to the one originally initialized in [attack_name].gml.',
      insertText: 'reset_num_hitboxes( ${1:attack/real} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'get_kb_formula',
      kind: CompletionItemKind.Function,
      documentation: 'Returns the resulting amount of knockback a player would get if they were hit with the specified stats. Usually used in tandem with get_hitbox_angle( hitbox_id )',
      insertText: 'get_kb_formula( ${1:player_damage/real}, ${2:player_kb_adj/real}, ${3:kb_mult/real}, ${4:hbox_damage/real}, ${5:hbox_bkb/real}, ${6:hbox_kb_scale/real} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'get_hitstun_formula',
      kind: CompletionItemKind.Function,
      documentation: 'Returns the resulting amount of hitstun a player would get if they were hit with the specified stats. Note that hitstun is not hitstop; Hitstun is how long the player remains inactionable after being hit.',
      insertText: 'get_hitstun_formula( ${1:player_damage/real}, ${2:player_kb_adj/real}, ${3:kb_mult/real}, ${4:hbox_damage/real}, ${5:hbox_bkb/real}, ${6:hbox_kb_scale/real} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'get_hitstop_formula',
      kind: CompletionItemKind.Function,
      documentation: 'Returns the resulting amount of hitpause a player would get if they were hit with the specified stats. Note that hitpause is not hitstun; hitpause is the freezeframes immediately after getting hit.',
      insertText: 'get_hitstop_formula( ${1:player_damage/real}, ${2:player_kb_adj/real}, ${3:hitbox_base_hitstop/real}, ${4:hitbox_hitstop_scale/real}, ${5:hitbox_extra_hitpause/real} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'destroy_hitboxes',
      kind: CompletionItemKind.Function,
      documentation: 'Destroys all physical hitboxes for the character.',
      insertText: 'destroy_hitboxes()',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'get_hitbox_angle',
      kind: CompletionItemKind.Function,
      documentation: 'Returns the angle that the hitbox sends. The function takes the current object’s position into account for angle flippers.',
      insertText: 'get_hitbox_angle( ${1:hitbox_id/real} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'create_hitbox',
      kind: CompletionItemKind.Function,
      documentation: 'Creates a hitbox at (x, y) pulling from the attack data of the specified hitbox.',
      insertText: 'create_hitbox( ${1:attack/real}, ${2:hitbox_num/real}, ${3:x/real}, ${4:y/real} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'create_deathbox',
      kind: CompletionItemKind.Function,
      documentation: 'Creates a hitbox that instantly K.O.s any player that touches it.',
      insertText: 'create_deathbox( ${1:x/real}, ${2:y/real}, ${3:w/real}, ${4:h/real}, ${5:player/-1_0}, ${6:free/boolean}, ${7:shape/0_1_2}, ${8:lifespan/real}, ${9:?bg_type/0_1_2} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
  ]
}
