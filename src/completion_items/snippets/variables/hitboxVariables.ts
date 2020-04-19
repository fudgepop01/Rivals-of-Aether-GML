import {
  CompletionItemKind, CompletionItem
} from 'vscode-languageserver';

export default (): CompletionItem[] => {
  const vars = [
    'AT_JAB',
    'AT_DATTACK',
    'AT_NSPECIAL',
    'AT_FSPECIAL',
    'AT_USPECIAL',
    'AT_DSPECIAL',

    'AT_FSTRONG',
    'AT_USTRONG',
    'AT_DSTRONG',

    'AT_FTILT',
    'AT_UTILT',
    'AT_DTILT',

    'AT_NAIR',
    'AT_FAIR',
    'AT_BAIR',
    'AT_DAIR',
    'AT_UAIR',

    'AT_TAUNT',

    'AT_NSPECIAL_2',
    'AT_NSPECIAL_AIR',
    'AT_FSPECIAL_2',
    'AT_FSPECIAL_AIR',
    'AT_USPECIAL_2',
    'AT_USPECIAL_GROUND',
    'AT_DSPECIAL_2',
    'AT_DSPECIAL_AIR',

    'AT_FSTRONG_2',
    'AT_USTRONG_2',
    'AT_DSTRONG_2',

    'AT_FTHROW',
    'AT_UTHROW',
    'AT_DTHROW',
    'AT_NTHROW',

    'AT_TAUNT_2',
    'AT_EXTRA_1',
    'AT_EXTRA_2',
    'AT_EXTRA_3',
  ]

  return [
    ...vars.map((idx) => {
      return {
        label: idx,
        kind: CompletionItemKind.Constant,
        documentation: 'attack index',
        insertText: idx
      }
    }),
  ]
}