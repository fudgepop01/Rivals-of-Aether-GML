import {
  CompletionItemKind, CompletionItem, InsertTextFormat
} from 'vscode-languageserver';

export default (): CompletionItem[] => {
  return [
    {
      label: 'ease_linear',
      kind: CompletionItemKind.Function,
      documentation: '',
      insertText: 'ease_linear( ${1:start}, ${2:end}, ${3:current_time}, ${4:total_time} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'ease_backIn',
      kind: CompletionItemKind.Function,
      documentation: '',
      insertText: 'ease_backIn( ${1:start}, ${2:end}, ${3:current_time}, ${4:total_time} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'ease_backOut',
      kind: CompletionItemKind.Function,
      documentation: '',
      insertText: 'ease_backOut( ${1:start}, ${2:end}, ${3:current_time}, ${4:total_time} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'ease_backInOut',
      kind: CompletionItemKind.Function,
      documentation: '',
      insertText: 'ease_backInOut( ${1:start}, ${2:end}, ${3:current_time}, ${4:total_time} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'ease_bounceIn',
      kind: CompletionItemKind.Function,
      documentation: '',
      insertText: 'ease_bounceIn( ${1:start}, ${2:end}, ${3:current_time}, ${4:total_time} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'ease_bounceOut',
      kind: CompletionItemKind.Function,
      documentation: '',
      insertText: 'ease_bounceOut( ${1:start}, ${2:end}, ${3:current_time}, ${4:total_time} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'ease_bouncInOut',
      kind: CompletionItemKind.Function,
      documentation: '',
      insertText: 'ease_bouncInOut( ${1:start}, ${2:end}, ${3:current_time}, ${4:total_time} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'ease_circIn',
      kind: CompletionItemKind.Function,
      documentation: '',
      insertText: 'ease_circIn( ${1:start}, ${2:end}, ${3:current_time}, ${4:total_time} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'ease_circOut',
      kind: CompletionItemKind.Function,
      documentation: '',
      insertText: 'ease_circOut( ${1:start}, ${2:end}, ${3:current_time}, ${4:total_time} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'ease_circInOut',
      kind: CompletionItemKind.Function,
      documentation: '',
      insertText: 'ease_circInOut( ${1:start}, ${2:end}, ${3:current_time}, ${4:total_time} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'ease_cubeIn',
      kind: CompletionItemKind.Function,
      documentation: '',
      insertText: 'ease_cubeIn( ${1:start}, ${2:end}, ${3:current_time}, ${4:total_time} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'ease_cubeOut',
      kind: CompletionItemKind.Function,
      documentation: '',
      insertText: 'ease_cubeOut( ${1:start}, ${2:end}, ${3:current_time}, ${4:total_time} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'ease_cubeInOut',
      kind: CompletionItemKind.Function,
      documentation: '',
      insertText: 'ease_cubeInOut( ${1:start}, ${2:end}, ${3:current_time}, ${4:total_time} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'ease_expoIn',
      kind: CompletionItemKind.Function,
      documentation: '',
      insertText: 'ease_expoIn( ${1:start}, ${2:end}, ${3:current_time}, ${4:total_time} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'ease_expoOut',
      kind: CompletionItemKind.Function,
      documentation: '',
      insertText: 'ease_expoOut( ${1:start}, ${2:end}, ${3:current_time}, ${4:total_time} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'ease_expoInOut',
      kind: CompletionItemKind.Function,
      documentation: '',
      insertText: 'ease_expoInOut( ${1:start}, ${2:end}, ${3:current_time}, ${4:total_time} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'ease_quadIn',
      kind: CompletionItemKind.Function,
      documentation: '',
      insertText: 'ease_quadIn( ${1:start}, ${2:end}, ${3:current_time}, ${4:total_time} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'ease_quadOut',
      kind: CompletionItemKind.Function,
      documentation: '',
      insertText: 'ease_quadOut( ${1:start}, ${2:end}, ${3:current_time}, ${4:total_time} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'ease_quadInOut',
      kind: CompletionItemKind.Function,
      documentation: '',
      insertText: 'ease_quadInOut( ${1:start}, ${2:end}, ${3:current_time}, ${4:total_time} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'ease_quartIn',
      kind: CompletionItemKind.Function,
      documentation: '',
      insertText: 'ease_quartIn( ${1:start}, ${2:end}, ${3:current_time}, ${4:total_time} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'ease_quartOut',
      kind: CompletionItemKind.Function,
      documentation: '',
      insertText: 'ease_quartOut( ${1:start}, ${2:end}, ${3:current_time}, ${4:total_time} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'ease_quartInOut',
      kind: CompletionItemKind.Function,
      documentation: '',
      insertText: 'ease_quartInOut( ${1:start}, ${2:end}, ${3:current_time}, ${4:total_time} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'ease_sineIn',
      kind: CompletionItemKind.Function,
      documentation: '',
      insertText: 'ease_sineIn( ${1:start}, ${2:end}, ${3:current_time}, ${4:total_time} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'ease_sineOut',
      kind: CompletionItemKind.Function,
      documentation: '',
      insertText: 'ease_sineOut( ${1:start}, ${2:end}, ${3:current_time}, ${4:total_time} )',
      insertTextFormat: InsertTextFormat.Snippet
    },
    {
      label: 'ease_sineInOut',
      kind: CompletionItemKind.Function,
      documentation: '',
      insertText: 'ease_sineInOut( ${1:start}, ${2:end}, ${3:current_time}, ${4:total_time} )',
      insertTextFormat: InsertTextFormat.Snippet
    }
  ]
}
