import {
  CompletionItemKind, CompletionItem, InsertTextFormat
} from 'vscode-languageserver';

export default (): CompletionItem[] => {
  return [
    {
      label: 'set_num_palettes',
      kind: CompletionItemKind.Function,
      documentation: 'Sets the maximum numbers of alternate color palettes that your character can use.',
      insertText: 'set_num_palettes( ${1:num/real} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'set_color_profile_slot',
      kind: CompletionItemKind.Function,
      documentation: 'https://www.rivalsofaether.com/workshop/colors-gml/',
      insertText: 'set_color_profile_slot( ${1:color_slot/real}, ${2:shade_slot/real}, ${3:R/real}, ${4:G/real}, ${5:B/real} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'set_color_profile_slot_range',
      kind: CompletionItemKind.Function,
      documentation: 'https://www.rivalsofaether.com/workshop/colors-gml/',
      insertText: 'set_color_profile_slot_range( ${1:color_slot/real}, ${2:H/real}, ${3:S/real}, ${4:V/real} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
  ]
}
