import {
  CompletionItemKind, CompletionItem
} from 'vscode-languageserver';

export default (): CompletionItem[] => {
  const indexes = [
    ['SET_ACCESSIBLE','no clue what this does'],
    ['SET_HUD_SIZE','selected size of HUD'],
    ['SET_HUD_NAMES','are HUD names enabled?'],
    ['SET_MUSIC_VOLUME','the loudness of music', '3'],
    ['SET_SFX_VOLUME','the loudness of sfx', '4'],
    ['SET_MENU_VOLUME','the loudness of the menu volume', '5'],
    ['SET_HUD_SHAKE','should the HUD shake at all?'],
    ['SET_RETRO_FX','are any retro FX applied?'],
    ['SET_FX_QUALITY','what is the quality of retro FX?'],
    ['SET_LANGUAGE','the currently selected language'],
  ];

  return [
    ...indexes.map(([name, desc, insert]): CompletionItem => {
      return {
        label: name + " (local)",
        kind: CompletionItemKind.Constant,
        documentation: desc,
        insertText: insert ?? name
      }
    })
  ]
}
