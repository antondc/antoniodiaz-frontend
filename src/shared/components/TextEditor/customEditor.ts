import { Editor, Text, Transforms } from 'slate';

import { CustomElement, CustomText } from './types';

import './TextEditor.less';

export const CustomEditor = {
  isCodeBlockActive(editor: Editor): boolean {
    const [match] = Editor.nodes(editor, {
      match: (node: CustomElement) => node.type === 'code',
    });

    return !!match;
  },

  toggleCodeBlock(editor: Editor): void {
    const isActive = CustomEditor.isCodeBlockActive(editor);
    Transforms.setNodes(editor, { type: isActive ? null : 'code' }, { match: (n) => Editor.isBlock(editor, n) });
  },

  toggleFormat(editor: Editor, format: string): void {
    const isActive = CustomEditor.isFormatActive(editor, format);
    Transforms.setNodes(editor, { [format]: isActive ? null : true }, { match: Text.isText, split: true });
  },

  isFormatActive(editor: Editor, format: string): boolean {
    const [match] = Editor.nodes(editor, {
      match: (node: CustomText) => node[format] === true,
      mode: 'all',
    });

    return !!match;
  },
};
