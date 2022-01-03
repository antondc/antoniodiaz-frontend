import { Editor } from 'slate';

import { testStringIsValidUrl } from '../../tools/utils/url/testStringIsValidUrl';
import { CustomEditor } from './customEditor';

export const withInlines = (editor: Editor): Editor => {
  const { insertData, insertText, isInline } = editor;

  editor.isInline = (element) => ['link'].includes(element.type) || isInline(element);

  editor.insertText = (text) => {
    if (text && testStringIsValidUrl(text)) {
      CustomEditor.linkWrap(editor, text);
    } else {
      insertText(text);
    }
  };

  editor.insertData = (data) => {
    const text = data.getData('text/plain');

    if (text && testStringIsValidUrl(text)) {
      CustomEditor.linkWrap(editor, text);
    } else {
      insertData(data);
    }
  };

  return editor;
};
