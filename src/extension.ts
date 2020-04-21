// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { NTTRoAProvider } from './completionProvider';
import RoaboxController from './roaboxController';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	const provider = vscode.languages.registerCompletionItemProvider('gml-ntt-roa', NTTRoAProvider);

	const controller = new RoaboxController(context);


	context.subscriptions.push(provider, controller);
}

// this method is called when your extension is deactivated
export function deactivate() {}
