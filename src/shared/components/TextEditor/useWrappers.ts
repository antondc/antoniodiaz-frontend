import { Editor, Node as SlateNode, Path as SlatePath, Point, Range, Transforms } from 'slate';
import { withHistory } from 'slate-history';

import { testStringIsValidUrl } from 'Tools/utils/url/testStringIsValidUrl';
import { useCustomEditor } from './useCustomEditor';

type UseWrappers = () => {
  withInlinesWrapper: (editor: Editor) => Editor;
  withHistoryWrapper: (editor: Editor) => Editor;
  withCorrectVoidBehavior: (editor: Editor) => Editor;
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

  const withCorrectVoidBehavior = <T extends Editor>(editor: T) => {
    const { deleteBackward, insertBreak } = editor;

    // if current selection is void node, insert a default node below
    editor.insertBreak = () => {
      if (!editor.selection || !Range.isCollapsed(editor.selection)) return insertBreak();

      const selectedNodePath = SlatePath.parent(editor.selection.anchor.path);
      const selectedNode = SlateNode.get(editor, selectedNodePath);
      if (Editor.isVoid(editor, selectedNode)) {
        Editor.insertNode(editor, {
          type: 'paragraph',
          children: [{ text: '' }],
        });

        return;
      }

      insertBreak();
    };

    // if prev node is a void node, remove the current node and select the void node
    editor.deleteBackward = (unit) => {
      if (!editor.selection || !Range.isCollapsed(editor.selection) || editor.selection.anchor.offset !== 0)
        return deleteBackward(unit);
      const prevNodePath = SlatePath.previous(SlatePath.parent(editor.selection.anchor.path));
      const prevNode = SlateNode.get(editor, prevNodePath);
      if (Editor.isVoid(editor, prevNode)) {
        return Transforms.removeNodes(editor);
      }

      deleteBackward(unit);
    };

    return editor;
  };

  return {
    withInlinesWrapper,
    withHistoryWrapper,
    withCorrectVoidBehavior,
  };
};
