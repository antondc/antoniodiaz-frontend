import React, { useCallback, useState } from 'react';
import { createEditor, Descendant, Text, Transforms } from 'slate';
import { Editable, Slate, withReact } from 'slate-react';

import './TextEditor.less';

// Define a React component renderer for our code blocks.
const CodeElement = (props) => (
  <pre {...props.attributes}>
    <code>{props.children}</code>
  </pre>
);

const DefaultElement = (props) => <p {...props.attributes}>{props.children}</p>;

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
        return <DefaultElement {...props} />;
    }
  }, []);

  const Leaf = (props) => (
    <span
      {...props.attributes}
      className={
        'TextEditor-span' +
        (props.leaf.bold ? ' TextEditor-span--bold' : '') +
        (props.leaf.italic ? ' TextEditor-span--italic' : '')
      }
    >
      {props.children}
    </span>
  );

  // Define a leaf rendering function that is memoized with `useCallback`.
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

  return (
    <div className="TextEditor">
      <Slate editor={editor} value={localValue} onChange={setLocalValue}>
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          onKeyDown={(event) => {
            if (!event.ctrlKey) {
              return;
            }

            switch (event.key) {
              case 'b': {
                event.preventDefault();
                Transforms.setNodes(
                  editor,
                  {
                    bold: true,
                  },
                  {
                    match: (node: Text) => Text.isText(node),
                    split: true,
                  }
                );
                break;
              }

              case 'i': {
                event.preventDefault();
                Transforms.setNodes(
                  editor,
                  {
                    italic: true,
                  },
                  {
                    match: (node: Text) => Text.isText(node),
                    split: true,
                  }
                );
                break;
              }
            }
          }}
        />
      </Slate>
    </div>
  );
};

export default TextEditor;
