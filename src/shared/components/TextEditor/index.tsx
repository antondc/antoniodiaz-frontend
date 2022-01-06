import React, { useEffect, useState } from 'react';
import { createEditor, Descendant } from 'slate';
import { Editable, Slate, withReact } from 'slate-react';

import { EditorToolbar } from './toolbars/EditorToolbar';
import { EditorToolbarHover } from './toolbars/EditorToolbarHover';
import { ImageUpload } from './types';
import { useComponentRenders } from './useComponentRenders';
import { useEvents } from './useEvents';
import { useWrappers } from './useWrappers';

import './TextEditor.less';

const defaultValue = [
  {
    type: 'paragraph',
    children: [
      {
        text: 'DEFAULT VALUE',
      },
    ],
  },
];

export type TextEditorValue = Array<any>;

interface Props {
  imageUpload: ImageUpload;
  value: TextEditorValue;
  onChange: (value: TextEditorValue) => void;
}

const TextEditor: React.FC<Props> = ({ value, imageUpload, onChange }) => {
  // Bug on recent versions when initializing state from API
  // https://github.com/ianstormtaylor/slate/issues/4612
  // https://github.com/ianstormtaylor/slate/pull/4540#issuecomment-951380551
  // editor.children = futureValue; // Posible fix, causes re-renders
  // Viable fix defer rendering to available state
  if (!value) return <div />;

  const parsedValue = value as Descendant[];
  const [loaded, setLoaded] = useState(false);
  const { withInlinesWrapper, withHistoryWrapper, withCorrectVoidBehavior, withImages } = useWrappers(imageUpload);
  const [editor] = useState(() =>
    withImages(withInlinesWrapper(withCorrectVoidBehavior(withHistoryWrapper(withReact(createEditor())))))
  );
  const [localValue, setLocalValue] = useState<Descendant[]>(parsedValue);
  const { renderElement, renderLeaf } = useComponentRenders(imageUpload);
  const { onKeyDown } = useEvents(editor);

  // Avoid empty array as value using a default one
  const setLocalValueOrDefault = (value: Descendant[]) => {
    const futureValue = !!value.length ? value : defaultValue;
    onChange(futureValue);
    setLocalValue(futureValue);
  };

  useEffect(() => {
    setLocalValueOrDefault(parsedValue);

    setLoaded(true);
  }, [value]);

  // Don't render on server side
  if (!loaded) return null;

  return (
    <div className="TextEditor">
      <Slate editor={editor} value={localValue} onChange={setLocalValueOrDefault}>
        <EditorToolbarHover />
        <EditorToolbar />
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
