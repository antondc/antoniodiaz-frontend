import React, { useState } from 'react';
import { createEditor, Descendant } from 'slate';
import { Editable, Slate, withReact } from 'slate-react';

import { EditorToolbar } from './toolbars/EditorToolbar';
import { EditorToolbarHover } from './toolbars/EditorToolbarHover';
import { useComponentRenders } from './useComponentRenders';
import { useEvents } from './useEvents';
import { useWrappers } from './useWrappers';

import './TextEditor.less';

interface Props {
  value: string;
}

const TextEditor: React.FC<Props> = ({ value }) => {
  const parsedValue = JSON.parse(value) as Descendant[];
  const { withInlines } = useWrappers();
  const [editor] = useState(() => withInlines(withReact(createEditor())));
  const [localValue, setLocalValue] = useState<Descendant[]>(parsedValue);

  const { renderElement, renderLeaf } = useComponentRenders();
  const { onKeyDown } = useEvents(editor);

  return (
    <div className="TextEditor">
      <Slate editor={editor} value={localValue} onChange={setLocalValue}>
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
