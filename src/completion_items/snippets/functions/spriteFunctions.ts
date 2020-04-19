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
      insertText: 'sprite_change_collision_mask( "${1:sprite/string}", ${2:sepmasks/boolean}, ${3:bboxmode/0_1_2}, ${4:bbleft/real}, ${5:bbtop/real}, ${6:bbright/real}, ${7:bbbottom/real}, ${8:kind/0_1_2_3} )',
      insertTextFormat: InsertTextFormat.Snippet
    }
  ]
}
