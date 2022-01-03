import React, { useCallback, useState } from 'react';
import { createEditor, Descendant } from 'slate';
import { Editable, Slate, withReact } from 'slate-react';

import { AElement } from './components/AElement';
import { CodeElement } from './components/CodeElement';
import { H1 } from './components/H1';
import { H2 } from './components/H2';
import { H3 } from './components/H3';
import { HoveringToolbar } from './components/HoveringToolbar';
import { P } from './components/P';
import { Quote } from './components/Quote';
import { Toolbar } from './components/Toolbar';
import { Ul } from './components/Ul';
import { CustomEditor } from './customEditor';
import { withInlines } from './withInlines';

import './TextEditor.less';

interface Props {
  value: string;
}

const TextEditor: React.FC<Props> = ({ value }) => {
  const parsedValue = JSON.parse(value) as Descendant[];

  const [editor] = useState(() => withInlines(withReact(createEditor())));
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
      case 'quote':
        return <Quote {...props} />;
      case 'link':
        return <AElement {...props} />;
      default:
        return <P {...props} />;
    }
  }, []);

  const renderLeaf = useCallback(({ attributes, children, leaf }) => {
    switch (true) {
      case leaf.bold:
        return <strong>{children}</strong>;
      case leaf.italic:
        return <em>{children}</em>;
      case leaf.underlined:
        return <u>{children}</u>;
      case leaf.uppercase:
        return <span className="TextEditor-uppercase">{children}</span>;
      case leaf.inlineCode:
        return <code className="TextEditor-inlineCode">{children}</code>;
      case leaf.underlined:
        return <u>{children}</u>;

      default:
        return <span {...attributes}>{children}</span>;
    }
  }, []);

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
        <Editable
          className="TextEditor-textBox"
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          onKeyDown={onKeyDown}
        />
      </Slate>
    </div>
  );
};

export default TextEditor;
