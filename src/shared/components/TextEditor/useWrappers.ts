import { Editor } from 'slate';

import { testStringIsValidUrl } from '../../tools/utils/url/testStringIsValidUrl';
import { useCustomEditor } from './useCustomEditor';

type UseWrappers = () => {
  withInlines: (editor: Editor) => Editor;
};

export const useWrappers: UseWrappers = () => {
  const withInlines = (editor: Editor): Editor => {
    const { linkWrap } = useCustomEditor();
    const { insertData, insertText, isInline } = editor;

    editor.isInline = (element) => ['link'].includes(element.type) || isInline(element);

    editor.insertText = (text) => {
      if (text && testStringIsValidUrl(text)) {
        linkWrap(editor, text);
      } else {
        insertText(text);
      }
    };

    editor.insertData = (data) => {
      const text = data.getData('text/plain');

      if (text && testStringIsValidUrl(text)) {
        linkWrap(editor, text);
      } else {
        insertData(data);
      }
    };

    return editor;
  };

  return { withInlines };
};
