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
    }
  ]
}
