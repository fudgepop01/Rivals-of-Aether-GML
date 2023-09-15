import {
  CompletionItemKind, CompletionItem, InsertTextFormat
} from 'vscode-languageserver'

export default (): CompletionItem[] => {
  return [
    {
      label: 'hide hitboxes (editor)',
      kind: CompletionItemKind.Interface,
      documentation: 'use with the visualizer to hide the selected hitbox indexes.\n\nHitbox indexes should be in a string separated by commas.',
      filterText: "fp_hide_hitboxes | fpHideHb",
      insertText: '__HIDDEN_HITBOXES = "${1:1,3}"',
      insertTextFormat: InsertTextFormat.Snippet,
      
    },
    {
      label: 'set display modes (editor)',
      kind: CompletionItemKind.Interface,
      documentation: 'use with the visualizer to setup different scenarios that can easily be toggled.\n\nA string containing a list of names for display modes separated by commas',
      filterText: "fp_set_display_modes | fpSetDisplayModes",
      insertText: '__DISPLAY_MODES = "${1:hide hitbox 2,repeat window 2}"',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'current display mode (editor)',
      kind: CompletionItemKind.Interface,
      documentation: 'A string containing the name of the display mode currently selected in the editor. >default< will always display the default behavior',
      filterText: "fp_display_mode | fpDisplayMode",
      insertText: '__DISPLAY_MODE',
      insertTextFormat: InsertTextFormat.PlainText
    },
    {
      label: 'setup window sequence (editor)',
      kind: CompletionItemKind.Interface,
      documentation: 'A string containing the sequence of windows to play separated by commas. Windows can be repeated by adding xAMOUNT to them where "AMOUNT" is a number.',
      filterText: "fp_window_sequence | fpWindowSequence",
      insertText: '__WINDOW_SEQUENCE = "${1:2,1x2,4}"',
      insertTextFormat: InsertTextFormat.Snippet
    },
  ]
}
