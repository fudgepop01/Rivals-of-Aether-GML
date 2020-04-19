import * as vscode from 'vscode';
import { compiledList } from './completion_items/roaFunctions';
import { InsertTextFormat } from 'vscode-languageserver';

export const NTTRoAProvider: vscode.CompletionItemProvider = {

  provideCompletionItems(
    document: vscode.TextDocument,
    position: vscode.Position,
    token: vscode.CancellationToken,
    context: vscode.CompletionContext): vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList>
  {

    return compiledList.map(({label, kind, documentation, insertText, insertTextFormat}): vscode.CompletionItem => {
      if (insertTextFormat === InsertTextFormat.Snippet) {
        return {
          label,
          kind,
          documentation: new vscode.MarkdownString(documentation as string),
          insertText: new vscode.SnippetString(insertText)
        };
      } else {
        return {
          label,
          kind,
          documentation: new vscode.MarkdownString(documentation as string),
          insertText: insertText
        };
      }
    });
  }
};