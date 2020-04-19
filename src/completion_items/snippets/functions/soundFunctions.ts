import {
  CompletionItemKind, CompletionItem, InsertTextFormat
} from 'vscode-languageserver';

export default (): CompletionItem[] => {
  return [
    {
      label: 'sound_get',
      kind: CompletionItemKind.Function,
      documentation: 'Returns the unique index (real) of the sound asset loaded from the /sounds folder (should be in .ogg format).',
      insertText: 'sound_get( "${1:sound/string}" )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'sound_play',
      kind: CompletionItemKind.Function,
      documentation: 'Plays the specified sound effect, supports both built-in and custom sounds. Returns the id of the sound played. Use either asset_get or sound_get to retrieve the ID.',
      insertText: 'sound_play( ${1:soundID/real}, ${2:?looping/boolean}, ${3:?panning/real} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'sound_stop',
      kind: CompletionItemKind.Function,
      documentation: 'Stops the specified sound if it’s playing. Use either asset_get or sound_get to retrieve the ID',
      insertText: 'sound_stop( ${1:soundID/real} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'set_victory_theme',
      kind: CompletionItemKind.Function,
      documentation: 'Overwrites character’s victory theme. Can be assigned to a custom sound using sound_get.',
      insertText: 'set_victory_theme( ${1:theme/real} )',
      insertTextFormat: InsertTextFormat.Snippet
    }
  ]
}
