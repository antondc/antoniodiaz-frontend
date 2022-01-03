import { Editor } from 'slate';
import { withHistory } from 'slate-history';

import { testStringIsValidUrl } from 'Tools/utils/url/testStringIsValidUrl';
import { useCustomEditor } from './useCustomEditor';

type UseWrappers = () => {
  withInlinesWrapper: (editor: Editor) => Editor;
  withHistoryWrapper: (editor: Editor) => Editor;
};

export const useWrappers: UseWrappers = () => {
  const withInlinesWrapper = (editor) => {
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

  const withHistoryWrapper = (editor) => withHistory(editor);

  return { withInlinesWrapper, withHistoryWrapper };
};
