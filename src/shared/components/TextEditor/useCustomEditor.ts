import { Editor, Element, Range, Text, Transforms } from 'slate';

import { CustomElement, CustomText, ImageElement, LinkElement } from './types';

type UseCustomEditor = () => {
  isBlockActive: (editor: Editor, blockType: string) => boolean;
  toggleBlock: (editor: Editor, blockType: string) => void;
  linkWrap: (editor: Editor, url: string) => void;
  linkUnWrap: (editor: Editor) => void;
  toggleFormat: (editor: Editor, format: string) => void;
  isFormatActive: (editor: Editor, format: string) => boolean;
  toggleImageBlock: (editor: Editor, uuid: string) => void;
  updateImageBlock: (editor: Editor, element: ImageElement) => void;
};

export const useCustomEditor: UseCustomEditor = () => {
  const isBlockActive = (editor: Editor, blockType: string): boolean => {
    const [match] = Editor.nodes(editor, {
      match: (node: CustomElement) => node.type === blockType,
    });

    return !!match;
  };

  const toggleBlock = (editor: Editor, blockType: string): void => {
    const isActive = isBlockActive(editor, blockType);
    Transforms.setNodes(
      editor,
      {
        type: isActive ? null : blockType,
      },
      {
        match: (node) => Editor.isBlock(editor, node),
      }
    );
  };

  const toggleImageBlock = (editor: Editor, uuid: string): void => {
    const isActive = isBlockActive(editor, 'image');
    const image: ImageElement = {
      type: isActive ? null : 'image',
      src: '',
      uuid,
    };

    Transforms.setNodes(editor, image, {
      match: (node) => Editor.isBlock(editor, node) && node.type === 'paragraph' && node.children[0].text === '',
    });
  };

  const updateImageBlock = (editor: Editor, element: ImageElement): void => {
    const index = editor.children.findIndex((item: ImageElement) => item.uuid === element.uuid);

    Transforms.removeNodes(editor, { at: [index] });
    Transforms.insertNodes(editor, element, { at: [index] });
  };

  const linkWrap = (editor: Editor, url: string): void => {
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
  };

  const linkUnWrap = (editor: Editor): void => {
    Transforms.unwrapNodes(editor, {
      match: (node) => !Editor.isEditor(node) && Element.isElement(node) && node.type === 'link',
    });
  };

  const toggleFormat = (editor: Editor, format: string): void => {
    const isActive = isFormatActive(editor, format);
    Transforms.setNodes(
      editor,
      {
        [format]: isActive ? null : true,
      },
      {
        match: Text.isText,
        split: true,
      }
    );
  };

  const isFormatActive = (editor: Editor, format: string): boolean => {
    const [match] = Editor.nodes(editor, {
      match: (node: CustomText) => node[format] === true,
      mode: 'all',
    });

    return !!match;
  };

  return {
    isBlockActive,
    toggleBlock,
    linkWrap,
    linkUnWrap,
    toggleFormat,
    isFormatActive,
    toggleImageBlock,
    updateImageBlock,
  };
};
