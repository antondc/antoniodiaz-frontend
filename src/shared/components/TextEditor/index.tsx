import React, { useCallback, useState } from 'react';
import { createEditor, Descendant } from 'slate';
import { Editable, Slate, withReact } from 'slate-react';

import { CodeElement } from './components/CodeElement';
import { HoveringToolbar } from './components/HoveringToolbar';
import { ParagraphElement } from './components/ParagraphElement';
import { Toolbar } from './components/Toolbar';
import { CustomEditor } from './customEditor';

import './TextEditor.less';

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
