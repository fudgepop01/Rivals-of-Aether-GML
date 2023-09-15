import {
  CompletionItemKind, CompletionItem, InsertTextFormat
} from 'vscode-languageserver';

export default (): CompletionItem[] => {
  return [
    {
      label: 'view_get_wview',
      kind: CompletionItemKind.Function,
      documentation: 'Returns the width of the current viewport.',
      insertText: 'view_get_wview()',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'view_get_hview',
      kind: CompletionItemKind.Function,
      documentation: 'Returns the height of the current viewport.',
      insertText: 'view_get_hview()',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'view_get_xview',
      kind: CompletionItemKind.Function,
      documentation: 'Returns the x position (left side) of the current viewport.',
      insertText: 'view_get_xview()',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'view_get_yview',
      kind: CompletionItemKind.Function,
      documentation: 'Returns the y position (top side) of the current viewport.',
      insertText: 'view_get_yview()',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'set_view_position',
      kind: CompletionItemKind.Function,
      documentation: 'Overrides the camera position. Use the functions view_get_xview() and view_get_yview() for the arguments if you don’t want to override them. The camera will be restricted to the edges of the stage in base game stages, but will be fully unlocked on workshop stages.',
      insertText: 'set_view_position( ${1:x/real}, ${2:y/real} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'shake_camera',
      kind: CompletionItemKind.Function,
      documentation: 'Sets the camera shake.',
      insertText: 'shake_camera( ${1:intensity/real}, ${2:time/real} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
  ]
}
