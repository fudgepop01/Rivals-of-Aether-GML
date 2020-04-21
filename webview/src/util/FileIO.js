import editors from '../store/editors';

export const openFiles = {};

export const saveFile = (evt) => {
  if (evt.detail === 'main') {
    let { mainEditor } = editors;
    openFiles.__current__.data = mainEditor.getValue();
    openFiles.__current__.dirty = false;
    delete openFiles[openFiles.__current__.name];
  } else {
    let { inputEditor } = editors;
    openFiles.__currentInput__.data = inputEditor.getValue();
    openFiles.__currentInput__.dirty = false;
    delete openFiles[openFiles.__currentInput__.name];
  }
}

export const handleFileOpen = (evt) => {
  const file = evt.detail;
  let { mainEditor, inputEditor, monaco } = editors;

  if (file.type === 'file' && ['gml', 'ini'].includes(file.extension)) {
    let editor;
    if (file.path.includes('debug')) {
      editor = inputEditor;

      if (openFiles.__currentInput__ === file) return;
      if (openFiles.__currentInput__ && editor.getValue() !== openFiles.__currentInput__.data) {
        openFiles[openFiles.__currentInput__.name] = editor.getValue();
        openFiles.__currentInput__.dirty = true;
      }

      openFiles.__currentInput__ = file;
      if (openFiles[openFiles.__currentInput__.name]) editor.setValue(openFiles[openFiles.__currentInput__.name]);
      else editor.setValue(file.data);
    } else {
      editor = mainEditor;

      if (openFiles.__current__ === file) return;
      if (openFiles.__current__ && editor.getValue() !== openFiles.__current__.data) {
        openFiles[openFiles.__current__.name] = editor.getValue();
        openFiles.__current__.dirty = true;
      }

      openFiles.__current__ = file;
      if (openFiles[openFiles.__current__.name]) editor.setValue(openFiles[openFiles.__current__.name]);
      else editor.setValue(file.data);
    }

    switch (file.extension) {
      case 'gml': monaco.editor.setModelLanguage(editor.getModel(), 'gamemaker'); break;
      case 'ini': monaco.editor.setModelLanguage(editor.getModel(), 'ini'); break;
    }
  }
}