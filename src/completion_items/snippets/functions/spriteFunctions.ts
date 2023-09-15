import {
  CompletionItemKind, CompletionItem, InsertTextFormat
} from 'vscode-languageserver';

export default (): CompletionItem[] => {
  return [
    {
      label: 'sprite_get',
      kind: CompletionItemKind.Function,
      documentation: 'Returns the unique index (real) of the sprite asset loaded from the /sprites folder.',
      insertText: 'sprite_get( "${1:sprite/string}" )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'sprite_change_offset',
      kind: CompletionItemKind.Function,
      documentation: 'Changes the x and y offset (origin) of the sprite asset loaded from the /sprites folder. Coordinates are relative to the (0,0) position being the upper left corner of the sprite.',
      insertText: 'sprite_change_offset( "${1:sprite/string}", ${2:xoff/real}, ${3:yoff/real} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'sprite_change_collision_mask',
      kind: CompletionItemKind.Function,
      documentation: 'Updates collision mask properties of the sprite asset loaded from the /sprites folder.',
      insertText: 'sprite_change_collision_mask( "${1:sprite/string}", ${2:sepmasks/boolean}, ${3:bboxmode/0=auto;1=full;2=user defined}, ${4:bbleft/real}, ${5:bbtop/real}, ${6:bbright/real}, ${7:bbbottom/real}, ${8:kind/0=precise;1=bounding box;2=disk;3=diamond} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'set_hit_particle_sprite',
      kind: CompletionItemKind.Function,
      documentation: 'Sets the character’s custom Hit Particle sprite for the specified slot. Note that this will only successfully run ininit.gml.',
      insertText: 'set_hit_particle_sprite( "${1:num/real}", ${2:sprite_index/real} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'hit_fx_create',
      kind: CompletionItemKind.Function,
      documentation: 'This function creates a visual effect from a sprite. The data of the visual effect is stored in memory until the object calling the function is unloaded, and thus should only be called once per effect.',
      insertText: 'hit_fx_create( "${1:sprite_index/int}", ${2:animation_length/int} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'spawn_hit_fx',
      kind: CompletionItemKind.Function,
      documentation: 'With this function you can spawn a visual effect at any given point within the room. The visual effect is spawned as a new instance of the hit_fx_obj object. This function returns the ID of the new instance which can then be stored in a variable or used to access that instance.',
      insertText: 'spawn_hit_fx( "${1:x/real}", ${2:y/real}, ${3:hit_fx_index/int} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'spawn_dust_fx',
      kind: CompletionItemKind.Function,
      documentation: 'Spawns a visual effect at the specified position. Unlike hit fx, dust effects don’t pull from a list and instead just displays sprite indexes directly.',
      insertText: 'spawn_dust_fx( "${1:x/real}", ${2:y/real}, ${3:sprite_index/real}, ${4:length/real} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
  ]
}
