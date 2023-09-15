import {
  CompletionItemKind, CompletionItem
} from 'vscode-languageserver';

export default (): CompletionItem[] => {
  const indexes = [
    ['DIR_ANY','any direction'],
    ['DIR_NONE','no direction'],
    ['DIR_UP','upwards direction'],
    ['DIR_DOWN','downwards direction'],
    ['DIR_LEFT','leftwards direction'],
    ['DIR_RIGHT','rightwards direction'],
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
