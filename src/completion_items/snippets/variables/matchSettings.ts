import {
  CompletionItemKind, CompletionItem
} from 'vscode-languageserver';

export default (): CompletionItem[] => {
  const indexes = [
    ['SET_STOCKS','stock count'],
    ['SET_TIMER','match timer'],
    ['SET_TEAMS','is teams enabled?'],
    ['SET_TEAMATTACK','is team attack enabled?'],
    ['SET_HITBOX_VIS','is hitbox visualization enabled?'],
    ['SET_SEASON','what season is it?'],
    ['SET_RUNES','are runes enabled?'],
    ['SET_PRACTICE','are we in practice mode?'],
    ['SET_TURBO','is turbo mode enabled?'],
    ['SET_SCALING','the current knockback scaling value'],
  ]

  return [
    ...indexes.map(([name, desc]): CompletionItem => {
      return {
        label: name + " (match)",
        kind: CompletionItemKind.Constant,
        documentation: desc,
        insertText: name
      }
    }),
  ]
}
