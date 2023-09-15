import {
  CompletionItemKind, CompletionItem
} from 'vscode-languageserver';

export default (): CompletionItem[] => {
  const indexes = [
    ['INFO_HUD', 'hud.png', 'The normal sprite used in the character’s HUD bar during gameplay. Returns a sprite index.'],
    ['INFO_HUDHURT', 'hud_hurt.png', 'The hitstun sprite used in the character’s HUD bar during gameplay. Returns a sprite index.'],
    ['INFO_ICON', 'icon.png', 'The sprite used in the custom character select menu. Returns a sprite index.'],
    ['INFO_PORTRAIT', 'portrait.png', 'The large sprite used on the results screen when the character wins. Returns a sprite index.'],
    ['INFO_OFFSCREEN', 'offscreen.png', 'The icon that displays when the character itself is offscreen. Returns a sprite index.'],
    ['INFO_CHARSELECT', 'charselect.png', 'The sprite used in the character select screen when the character is selected and loaded. Returns a sprite index.'],
    ['INFO_SIDEBAR', 'result_small.png', 'The small sprite of the character used in the results screen. Returns a sprite index.'],
    ['INFO_STR_NAME', 'name', 'The character’s name. Returns a string.'],
    ['INFO_STR_AUTHOR', 'author', 'The author of the character. Returns a string.'],
    ['INFO_STR_DESCRIPTION', 'description', 'The description of the character. Returns a string.'],
    ['INFO_PLURAL', 'plural', 'Will return true if the character’s name refers to multiple characters. Returns true or false'],
    ['INFO_VER_MAJOR', 'major version', 'The whole number (before the decimal) in the character’s version number. Returns a number.'],
    ['INFO_VER_MINOR', 'minor version', 'The fractional number (after the decimal) in the character’s version number. Returns a number.'],
  ];

  return [
    ...indexes.map(([name, associated_file, desc]): CompletionItem => {
      return {
        label: name,
        kind: CompletionItemKind.Constant,
        documentation: `(associated file: ${associated_file})\n` + desc,
        insertText: name
      }
    })
  ]
}
