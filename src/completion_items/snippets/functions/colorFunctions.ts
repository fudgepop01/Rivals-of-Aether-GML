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
    {
      label: 'set_character_color_slot',
      kind: CompletionItemKind.Function,
      documentation: '',
      insertText: 'set_character_color_slot( ${1:shade_slot/real}, ${2:r/real}, ${3:g/real}, ${4:b/real}, ${5:a/real?} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'set_article_color_slot',
      kind: CompletionItemKind.Function,
      documentation: '',
      insertText: 'set_article_color_slot( ${1:shade_slot/real}, ${2:r/real}, ${3:g/real}, ${4:b/real}, ${5:a/real?} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'set_character_color_shading',
      kind: CompletionItemKind.Function,
      documentation: '',
      insertText: 'set_character_color_shading( ${1:shade_slot/real}, ${2:shading_value} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'get_color_profile_slot_r',
      kind: CompletionItemKind.Function,
      documentation: '',
      insertText: 'get_color_profile_slot_r( ${1:color_slot/real}, ${2:shade_slot/real} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'get_color_profile_slot_g',
      kind: CompletionItemKind.Function,
      documentation: '',
      insertText: 'get_color_profile_slot_g( ${1:color_slot/real}, ${2:shade_slot/real} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'get_color_profile_slot_b',
      kind: CompletionItemKind.Function,
      documentation: '',
      insertText: 'get_color_profile_slot_b( ${1:color_slot/real}, ${2:shade_slot/real} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
  ]
}
