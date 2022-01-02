import React, { useCallback, useState } from 'react';
import { createEditor, Descendant, Editor, Text, Transforms } from 'slate';
import { Editable, Slate, withReact } from 'slate-react';

import { CodeElement } from './CodeElement';
import { HoveringToolbar } from './HoveringToolbar';
import { ParagraphElement } from './ParagraphElement';
import { Toolbar } from './Toolbar';
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

interface Props {
  value: string;
}

const TextEditor: React.FC<Props> = ({ value }) => {
  const parsedValue = JSON.parse(value) as Descendant[];

  const [editor] = useState(() => withReact(createEditor()));
  const [localValue, setLocalValue] = useState<Descendant[]>(parsedValue);

  const renderElement = useCallback((props) => {
    switch (props.element.type) {
      case 'code':
        return <CodeElement {...props} />;
      default:
        return <ParagraphElement {...props} />;
    }
  }, []);

  const Leaf = ({ attributes, children, leaf }) => {
    if (leaf.bold) {
      children = <strong>{children}</strong>;
    }

    if (leaf.italic) {
      children = <em>{children}</em>;
    }

    if (leaf.underlined) {
      children = <u>{children}</u>;
    }

    return <span {...attributes}>{children}</span>;
  };

  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!e.metaKey && !e.ctrlKey) {
      return;
    }

    let key;

    switch (e.key) {
      case 'b':
        key = 'bold';

        break;
      case 'i':
        key = 'italic';

        break;
      case 'u':
        key = 'underlined';

        break;
    }

    e.preventDefault();
    CustomEditor.toggleFormat(editor, key);
  };

  return (
    <div className="TextEditor">
      <Slate editor={editor} value={localValue} onChange={setLocalValue}>
        <HoveringToolbar />
        <Toolbar />
        <Editable renderElement={renderElement} renderLeaf={renderLeaf} onKeyDown={onKeyDown} />
      </Slate>
    </div>
  );
};

export default TextEditor;
