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
        text: '',
      },
    ],
  },
];

interface Props {
  imageUpload: ImageUpload;
  value: string;
}

const TextEditor: React.FC<Props> = ({ value, imageUpload }) => {
  const parsedValue = JSON.parse(value) as Descendant[];
  const [loaded, setLoaded] = useState(false);
  const { withInlinesWrapper, withHistoryWrapper, withCorrectVoidBehavior, withImages } = useWrappers(imageUpload);
  const [editor] = useState(() =>
    withImages(withInlinesWrapper(withCorrectVoidBehavior(withHistoryWrapper(withReact(createEditor())))))
  );
  const [localValue, setLocalValue] = useState<Descendant[]>(defaultValue);
  const { renderElement, renderLeaf } = useComponentRenders(imageUpload);
  const { onKeyDown } = useEvents(editor);

  // Avoid empty array as value using a default one
  const setLocalValueOrDefault = (value: Descendant[]) => {
    const futureValue = value.length ? value : defaultValue;
    setLocalValue(futureValue);
  };

  useEffect(() => {
    setLocalValueOrDefault(parsedValue);
    setLoaded(true);
  }, []);

  // useEffect(() => {
  //   console.log('=======');
  //   console.log('localValue:');
  //   console.log(JSON.stringify(localValue, null, 4));
  //   console.log('=======');
  // }, [localValue]);

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
