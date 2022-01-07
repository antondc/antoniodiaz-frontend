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

export const textEditorDefaultValue = [
  {
    type: 'paragraph',
    children: [
      {
        text: 'Edit me...',
      },
    ],
  },
];

export type TextEditorValue = Array<any>;

interface Props {
  initialValue: TextEditorValue;
  imageUploadService: ImageUpload;
  onChange: (value: TextEditorValue) => void;
}

const TextEditor: React.FC<Props> = ({ initialValue, imageUploadService, onChange }) => {
  const [loaded, setLoaded] = useState(false);
  const { withInlinesWrapper, withHistoryWrapper, withCorrectVoidBehavior, withImages } =
    useWrappers(imageUploadService);
  const [editor] = useState(() =>
    withImages(withInlinesWrapper(withCorrectVoidBehavior(withHistoryWrapper(withReact(createEditor())))))
  );
  const [localValue, setLocalValue] = useState<Descendant[]>(textEditorDefaultValue);
  const { renderElement, renderLeaf } = useComponentRenders(imageUploadService);
  const { onKeyDown } = useEvents(editor);

  // Avoid empty array as value using a default one
  const setLocalValueOrDefault = (value: Descendant[]) => {
    onChange(value);
    setLocalValue(value);
  };

  useEffect(() => {
    setLoaded(true);
  }, []);

  // Bug on recent versions when initializing state from API
  // https://github.com/ianstormtaylor/slate/issues/4612
  // https://github.com/ianstormtaylor/slate/pull/4540#issuecomment-951380551
  // Viable fix:
  // 1. defer rendering to available state: if (!value) return <div />;
  // 2. editor.children within useEffect
  useEffect(() => {
    if (!!initialValue && initialValue?.length) {
      editor.children = initialValue;
    } else if (!initialValue) {
      editor.children = textEditorDefaultValue;
    }
  }, [initialValue]);

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
