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
      label: 'sound_volume',
      kind: CompletionItemKind.Function,
      documentation: 'changes the volume of the given sound instance. Sound instance can be obtained from sound_play',
      insertText: 'sound_volume( ${1:sound_instance/real}, ${2:volume/real;0 to 1}, ${3:fadetime_in_ms/real} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'sound_pitch',
      kind: CompletionItemKind.Function,
      documentation: 'changes the pitch of the given sound instance. Sound instance can be obtained from sound_play',
      insertText: 'sound_pitch( ${1:sound_instance/real}, ${2:pitch_multiplier/real} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'suppress_stage_music',
      kind: CompletionItemKind.Function,
      documentation: 'Temporarily suppresses the volume of the stage music on every frame this function is called, allowing custom characters to draw attention to special moves or animations. Once the function stops being called, the stage music will return to its original volume.\n\nBoth arguments are optional; by default, the stage music is suppressed to 25% volume.',
      insertText: 'suppress_stage_music( ${1:volume/real between 0 and 1}, ${2:amount_per_frame/real between 0 and 1} )',
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
