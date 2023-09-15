import {
  CompletionItemKind, CompletionItem
} from 'vscode-languageserver';



export default (): CompletionItem[] => {
  const indexes = [
    ['UI_WIN_THEME', 'character win theme'],
    ['UI_WIN_BG', 'character win background'],
    ['UI_WIN_PORTRAIT', 'character win portrait'],
    ['UI_WIN_SIDEBAR', 'character win sidebar'],
    ['UI_HUD_ICON', 'character HUD (damage gauge) icon'],
    ['UI_HUDHURT_ICON', 'character HUD (damage gauge) icon when in a hurt state'],
    ['UI_OFFSCREEN', 'icon to display when the character is offscreen'],
    ['UI_CHARSELECT', 'icon to display on the character select screen'],
  ];

  return [
    ...indexes.map(([name, desc, insert]): CompletionItem => {
      return {
        label: name,
        kind: CompletionItemKind.Constant,
        documentation: desc,
        insertText: insert ?? name
      }
    })
  ]
}
