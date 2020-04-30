import * as vscode from 'vscode';
import * as PlaySound from 'play-sound';
import { join as joinPath } from 'path';
import { execFile } from 'child_process';
import { readFileSync, readdirSync } from 'fs';

const namespace = 'roa-helper';

export default class RoABoxController implements vscode.Disposable {
  public panel?: vscode.WebviewPanel;
  public context: vscode.ExtensionContext;
  public commands: vscode.Disposable[] = [];
  public player: any;

  constructor(context: vscode.ExtensionContext) {
    this.context = context;
    this.player = new PlaySound({});

    const registerCommand = vscode.commands.registerCommand;
    this.commands.push(
      registerCommand(`${namespace}.openRoABox`, () => this.openRoABox()),
      registerCommand(`${namespace}.openInRoABox`, (evt) => this.openInRoABox(evt)),
      registerCommand(`${namespace}.sendFolderToRoABox`, (evt) => this.sendFolderToRoABox(evt))
    );
  }

  public openRoABox() {
    if (this.panel) {
      if (this.panel.active) { return; }
      else { return this.panel.reveal(); }
    }
    const { context } = this;

    const panel = vscode.window.createWebviewPanel(
      'roabox',
      'roabox',
      vscode.ViewColumn.Beside,
      {
        enableScripts: true,
        retainContextWhenHidden: true,
      }
    );


    const htmlSrc = readFileSync(vscode.Uri.file(joinPath(context.extensionPath, 'webview', 'public', 'index.html')).fsPath, 'utf8')
      .replace('{{GLOBAL}}', '' + panel.webview.asWebviewUri(vscode.Uri.file(joinPath(context.extensionPath, 'webview', 'public', 'global.css'))))
      .replace('{{CSS_BUNDLE}}', '' + panel.webview.asWebviewUri(vscode.Uri.file(joinPath(context.extensionPath, 'webview', 'public', 'build', 'bundle.css'))))
      .replace('{{JS_BUNDLE}}', '' + panel.webview.asWebviewUri(vscode.Uri.file(joinPath(context.extensionPath, 'webview', 'public', 'build', 'bundle.js'))))
      // bundling audio raises the package size by 49mb so uhh that's not happening (and is probably a bad idea anyway...)
      // .replace(`'{{AUDIO_FILES}}'`, () => {
      //   const audioBuiltins = readdirSync(joinPath(context.extensionPath, 'webview', 'public', 'resources', 'sounds'));
      //   let out = '';
      //   for (const audioFile of audioBuiltins) {
      //     out += `'${vscode.Uri.file(joinPath(context.extensionPath, 'webview', 'public', 'resources', 'sounds', audioFile)).fsPath.replace(/\\/g, '\\\\')}', `;
      //   }
      //   return out;
      // })
      .replace(`'{{SPRITE_FILES}}'`, () => {
        const spriteBuiltins = readdirSync(joinPath(context.extensionPath, 'webview', 'public', 'resources', 'images'));
        let out = '';
        for (const spriteFile of spriteBuiltins) {
          out += `'${panel.webview.asWebviewUri(vscode.Uri.file(joinPath(context.extensionPath, 'webview', 'public', 'resources', 'images', spriteFile)))}', `;
        }
        return out;
      });

    panel.webview.html = htmlSrc;

    this.panel = panel;

    this.panel.webview.onDidReceiveMessage((message: any) => {
      switch(message.command) {
        case 'playSound': this.playSound(message.sound); break;
        case 'fetchFromWsRoot': this.fetchFromWsRoot(); break;
      }
    });

    this.panel.onDidDispose(() => this.panel = undefined);
  }

  public openInRoABox(args: vscode.Uri) {
    if (!args.fsPath.endsWith('.gml') || this.panel === undefined) { throw new Error("not a gml file!"); }

    let contentPath;
    let debugContentPath;
    if (args.path.substring(0, args.path.lastIndexOf('/')).endsWith('extension')) {
      debugContentPath = args.fsPath;
      contentPath = args.fsPath.replace('extension', 'attacks');
      console.log(contentPath);
    } else {
      contentPath = args.fsPath;
    }

    const fileBuffer = readFileSync(contentPath);
    this.panel.webview.postMessage({
      command: 'openFile',
      file: {
        debugContent: debugContentPath ? readFileSync(debugContentPath).toString('base64') : undefined,
        content: fileBuffer.toString('base64'),
        name: args.path.substring(args.path.lastIndexOf('/'))
      }
    });
  }

  public sendFolderToRoABox(args: vscode.Uri) {
    const { panel } = this;
    if (!panel) { return; }

    const dirFiles = readdirSync(args.fsPath);

    if (args.fsPath.endsWith('sprites')) {
      const path = '' + panel.webview.asWebviewUri(args);
      const toSend = dirFiles.map(fName => {
        if (process.platform === 'win32') { return path + '\\' + fName; }
        else { return path + '/' + fName; }
      });

      panel.webview.postMessage({
        command: 'get_sprites',
        spritePaths: toSend
      });
    } else {
      const path = args.fsPath;
      const toSend = dirFiles.map(fName => {
        if (process.platform === 'win32') { return path + '\\' + fName; }
        else { return path + '/' + fName; }
      });

      panel.webview.postMessage({
        command: 'get_sounds',
        soundPaths: toSend
      });
    }

  }

  public fetchFromWsRoot() {
    const folderPath = vscode.workspace.workspaceFolders![0];
    try {
      const sounds = vscode.Uri.file(joinPath(folderPath.uri.fsPath, 'sounds'));
      const sprites = vscode.Uri.file(joinPath(folderPath.uri.fsPath, 'sprites'));
      const init = vscode.Uri.file(joinPath(folderPath.uri.fsPath, 'scripts', 'init.gml'));
      const load = vscode.Uri.file(joinPath(folderPath.uri.fsPath, 'scripts', 'load.gml'));

      this.sendFolderToRoABox(sounds);
      this.sendFolderToRoABox(sprites);
      this.openInRoABox(init);
      this.openInRoABox(load);
    } catch(e) {
      vscode.window.showErrorMessage("failed to auto-fetch resources - are you in the right type of workspace?");
    }
  }

  public playSound(soundPath: string) {
    if (process.platform === 'win32') {
      if (soundPath.endsWith('.mp3')) {
        execFile(joinPath(this.context.extensionPath, 'audio', 'play.exe'), [soundPath]);
      } else {
        execFile(joinPath(this.context.extensionPath, 'audio', 'cmdmp3win.exe'), [soundPath]);
      }
    } else {
      this.player.play(soundPath);
    }
  }

  public dispose() {}
}