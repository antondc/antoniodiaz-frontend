import { Editor, Element, Range, Text, Transforms } from 'slate';

import { CustomElement, CustomText, ImageElement, LinkElement } from './types';

type UseCustomEditor = () => {
  isBlockActive: (editor: Editor, blockType: string) => boolean;
  toggleBlock: (editor: Editor, blockType: string) => void;
  wrapLink: (editor: Editor, url: string) => void;
  unWrapLink: (editor: Editor) => void;
  toggleFormat: (editor: Editor, format: string) => void;
  isFormatActive: (editor: Editor, format: string) => boolean;
  insertImageBlockFromToolbar: (editor: Editor) => void;
  updateImageBlock: (editor: Editor, element: ImageElement, path: number[]) => void;
  removeImageBlock: (editor: Editor, path: number[]) => void;
  insertImageBlockFromUserSelect: (editor: Editor, src: string | ArrayBuffer) => void;
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

  const insertImageBlockFromToolbar = (editor: Editor): void => {
    const isActive = isBlockActive(editor, 'image');
    const image: ImageElement = {
      type: isActive ? null : 'image',
      src: '',
    };

    Transforms.setNodes(editor, image, {
      match: (node) =>
        // Add nodes only when selected block is either paragraph or has no node type, and has no content
        Editor.isBlock(editor, node) && (node.type === 'paragraph' || !node.type) && node.children[0].text === '',
    });
  };

  const insertImageBlockFromUserSelect = (editor: Editor, src: string | ArrayBuffer): void => {
    const image: ImageElement = {
      type: 'image',
      src,
      children: [
        {
          text: '',
        },
      ],
    };

    Transforms.insertNodes(editor, image);
  };

  const updateImageBlock = (editor: Editor, element: ImageElement, path: number[]): void => {
    Transforms.removeNodes(editor, { at: path });
    Transforms.insertNodes(editor, element, { at: path });
  };

  const removeImageBlock = (editor: Editor, path: number[]): void => {
    const text = {
      type: 'paragraph',
      children: [
        {
          text: '',
        },
      ],
    };
    Transforms.removeNodes(editor, { at: path });
    Transforms.insertNodes(editor, text, { at: path });
  };

  const wrapLink = (editor: Editor, url: string): void => {
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

  const unWrapLink = (editor: Editor): void => {
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
    wrapLink,
    unWrapLink,
    toggleFormat,
    isFormatActive,
    insertImageBlockFromToolbar,
    insertImageBlockFromUserSelect,
    updateImageBlock,
    removeImageBlock,
  };
};
