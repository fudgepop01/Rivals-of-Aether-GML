import {
  CompletionItemKind, CompletionItem
} from 'vscode-languageserver';

export default (): CompletionItem[] => {
  const indexes = [
    ['BG_LAYER_ANIMSPD','speed of background animation'],
    ['BG_LAYER_X','x position of background layer'],
    ['BG_LAYER_Y','y position of background layer'],
    ['BG_LAYER_PARALLAX_X','x position of background layer parallax'],
    ['BG_LAYER_PARALLAX_Y','y position of background layer parallax'],
    ['BG_LAYER_REPEAT','does the background layer repeat?'],
    ['BG_LAYER_AUTOSCROLL_X',''],
    ['BG_LAYER_AUTOSCROLL_Y',''],

    ['__BG_LAYER_BACK-GROUND_1', 'AUTO-REPLACED WITH THE PROPER INDEX', '1'],
    ['__BG_LAYER_BACK-GROUND_2', 'AUTO-REPLACED WITH THE PROPER INDEX', '2'],
    ['__BG_LAYER_BACK-GROUND_3', 'AUTO-REPLACED WITH THE PROPER INDEX', '3'],
    ['__BG_LAYER_BACK-GROUND_4', 'AUTO-REPLACED WITH THE PROPER INDEX', '4'],
    ['__BG_LAYER_BACK-GROUND_5', 'AUTO-REPLACED WITH THE PROPER INDEX', '5'],
    ['__BG_LAYER_BACK-GROUND_6', 'AUTO-REPLACED WITH THE PROPER INDEX', '6'],
    ['__BG_LAYER_GROUND', 'AUTO-REPLACED WITH THE PROPER INDEX', '7'],
    ['__BG_LAYER_FORE-GROUND_1', 'AUTO-REPLACED WITH THE PROPER INDEX', '8'],
    ['__BG_LAYER_FORE-GROUND_2', 'AUTO-REPLACED WITH THE PROPER INDEX', '9'],
  ]

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
