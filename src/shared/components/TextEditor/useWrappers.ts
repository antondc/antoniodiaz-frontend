import { useState } from 'react';
import { Editor, Node as SlateNode, Path as SlatePath, Range, Transforms } from 'slate';
import { withHistory } from 'slate-history';

import { testStringIsValidUrl } from 'Tools/utils/url/testStringIsValidUrl';
import { ImageUpload } from './types';
import { useCustomEditor } from './useCustomEditor';

type UseWrappers = (imageUploadService: ImageUpload) => {
  withInlinesWrapper: (editor: Editor) => Editor;
  withHistoryWrapper: (editor: Editor) => Editor;
  withCorrectVoidBehavior: (editor: Editor) => Editor;
  withImages: (editor: Editor) => Editor;
};

export const useWrappers: UseWrappers = (imageUploadService: ImageUpload) => {
  const [_percentCompleted, setPercentCompleted] = useState<number>(0);

  const withInlinesWrapper = (editor) => {
    const { wrapLink } = useCustomEditor();
    const { insertData, insertText, isInline } = editor;

    editor.isInline = (element) => ['link'].includes(element.type) || isInline(element);

    editor.insertText = (text) => {
      if (text && testStringIsValidUrl(text)) {
        wrapLink(editor, text);
      } else {
        insertText(text);
      }
    };

    editor.insertData = (data) => {
      const text = data.getData('text/plain');

      if (text && testStringIsValidUrl(text)) {
        wrapLink(editor, text);
      } else {
        insertData(data);
      }
    };

    return editor;
  };

  const withHistoryWrapper = (editor: Editor) => withHistory(editor);

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

  // Will capture any image pasted on the editor, send it to imageUploadService service and render it as an Image block
  const withImages = (editor) => {
    const { deleteBackward, insertData, isVoid } = editor;
    const { insertImageBlockFromUserSelect, removeImageBlock } = useCustomEditor();

    // Set current item as void
    editor.isVoid = (element) => (element.type === 'image' ? true : isVoid(element));

    editor.insertData = async (data) => {
      const text = data.getData('text/plain');
      const { files } = data;

      if (files && files.length > 0) {
        for (const file of files) {
          const data = await imageUploadService.uploadFileToServer({
            file,
            setPercentCompleted,
          });

          insertImageBlockFromUserSelect(editor, data?.image);
        }
      } else if (testStringIsValidUrl(text)) {
        insertImageBlockFromUserSelect(editor, text);
      } else {
        insertData(data);
      }
    };

    // For current nodes of type "image", use imageUploadService service to remove the image
    editor.deleteBackward = (unit) => {
      const parentPath = SlatePath.parent(editor.selection.anchor.path);
      const currentNode = SlateNode.get(editor, parentPath);

      if (currentNode.type === 'image') {
        try {
          imageUploadService.removeFileFromServer({
            src: currentNode['src'],
            onRemoved: () => {},
          });
        } catch (error) {
          console.error(error);
        } finally {
          removeImageBlock(editor, parentPath);
        }
      } else {
        deleteBackward(unit);
      }
    };

    return editor;
  };

  return {
    withInlinesWrapper,
    withHistoryWrapper,
    withCorrectVoidBehavior,
    withImages,
  };
};
