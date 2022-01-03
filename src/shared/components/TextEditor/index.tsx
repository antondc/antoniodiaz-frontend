import React, { useCallback, useState } from 'react';
import { createEditor, Descendant } from 'slate';
import { Editable, Slate, withReact } from 'slate-react';

import { CodeElement } from './components/CodeElement';
import { H1 } from './components/H1';
import { H2 } from './components/H2';
import { H3 } from './components/H3';
import { HoveringToolbar } from './components/HoveringToolbar';
import { P } from './components/P';
import { Toolbar } from './components/Toolbar';
import { Ul } from './components/Ul';
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
      case 'h1':
        return <H1 {...props} />;
      case 'h2':
        return <H2 {...props} />;
      case 'h3':
        return <H3 {...props} />;
      case 'ul':
        return <Ul {...props} />;
      case 'code':
        return <CodeElement {...props} />;
      default:
        return <P {...props} />;
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

    if (leaf.uppercase) {
      children = <span className="TextEditor-uppercase">{children}</span>;
    }

    if (leaf.center) {
      children = <span className="TextEditor-center">{children}</span>;
    }

    if (leaf.inlineCode) {
      children = <code className="TextEditor-inlineCode">{children}</code>;
    }

    return <span {...attributes}>{children}</span>;
  };

  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if ((!e.metaKey && !e.ctrlKey) || (e.key !== 'b' && e.key !== 'i' && e.key !== 'u')) {
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
