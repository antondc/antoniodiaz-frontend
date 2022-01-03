import { Editor, Element, Range, Text, Transforms } from 'slate';

import { CustomElement, CustomText, LinkElement } from './types';

import './TextEditor.less';

export const CustomEditor = {
  isBlockActive(editor: Editor, blockType: string): boolean {
    const [match] = Editor.nodes(editor, {
      match: (node: CustomElement) => node.type === blockType,
    });

    return !!match;
  },

  toggleBlock(editor: Editor, blockType: string): void {
    const isActive = CustomEditor.isBlockActive(editor, blockType);
    Transforms.setNodes(
      editor,
      { type: isActive ? null : blockType },
      { match: (node) => Editor.isBlock(editor, node) }
    );
  },

  linkWrap(editor: Editor, url: string): void {
    const { selection } = editor;
    const isCollapsed = selection && Range.isCollapsed(selection);
    const link: LinkElement = {
      type: 'link',
      url,
      children: isCollapsed ? [{ text: url }] : [],
    };

    if (isCollapsed) {
      Transforms.insertNodes(editor, link);
    } else {
      Transforms.wrapNodes(editor, link, { split: true });
      Transforms.collapse(editor, { edge: 'end' });
    }
  },

  linkUnWrap(editor: Editor): void {
    Transforms.unwrapNodes(editor, {
      match: (node) => !Editor.isEditor(node) && Element.isElement(node) && node.type === 'link',
    });
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
