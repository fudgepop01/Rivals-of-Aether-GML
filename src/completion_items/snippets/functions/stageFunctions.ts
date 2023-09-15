import {
  CompletionItemKind, CompletionItem, InsertTextFormat
} from 'vscode-languageserver';

export default (): CompletionItem[] => {
  return [
    {
      label: 'get_marker_x',
      kind: CompletionItemKind.Function,
      documentation: 'Returns the X position of a specified stage marker. Will return -1 if the marker is not found.',
      insertText: 'get_marker_x( ${1:index/real} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'get_marker_y',
      kind: CompletionItemKind.Function,
      documentation: 'Returns the Y position of a specified stage marker. Will return -1 if the marker is not found.',
      insertText: 'get_marker_y( ${1:index/real} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'is_aether_stage',
      kind: CompletionItemKind.Function,
      documentation: 'Returns true if the current stage is set to Aether mode. Returns false if the current stage is set to Basic mode.',
      insertText: 'is_aether_stage()',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'get_article_script',
      kind: CompletionItemKind.Function,
      documentation: 'Returns the script set used by the stage article. Will return -1 if the instance is not a stage article.',
      insertText: 'get_article_script( ${1:instance_id/real} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'music_play_file',
      kind: CompletionItemKind.Function,
      documentation: 'When called in a stage article, plays a background music track which replaces the currently playing music track.',
      insertText: 'music_play_file( ${1:file/string} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'music_stop',
      kind: CompletionItemKind.Function,
      documentation: 'This function will stop a stage\'s music.',
      insertText: 'music_stop()',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'music_set_volume',
      kind: CompletionItemKind.Function,
      documentation: 'When called in a stage article, instantly changes the background music volume.',
      insertText: 'music_set_volume( ${1:volume/real; between 0 and 1} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'music_fade',
      kind: CompletionItemKind.Function,
      documentation: 'When called in a stage article, gradually decreases or increases the background music to the target volume.\n\nBoth arguments are optional; by default the music will fade to silence. Once the music is fully silent, background music playback will be stopped.',
      insertText: 'music_fade( ${1:volume?/real; between 0 and 1}, ${2:amount_per_frame?/real; between 0 and 1} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'music_crossfade',
      kind: CompletionItemKind.Function,
      documentation: 'https://rivalsofaether.com/music_crossfade/',
      insertText: 'music_crossfade( ${1:fade_to_laststock?/real; between 0 and 1}, ${2:amount_per_frame?/real; between 0 and 1} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'get_bg_data',
      kind: CompletionItemKind.Function,
      documentation: 'Note that this only works on custom stages. Using this on a default stage will always return 0.',
      insertText: 'get_bg_data( ${1:layer/real=__BG...}, ${2:data/real=BG_} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'set_bg_data',
      kind: CompletionItemKind.Function,
      documentation: 'Note that this only works on custom stages. Using this on a default stage will do nothing.',
      insertText: 'set_bg_data( ${1:layer/real=__BG...}, ${2:data/real=BG_}, ${3:value/real} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
  ]
}
