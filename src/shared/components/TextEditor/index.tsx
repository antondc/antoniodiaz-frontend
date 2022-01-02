import React, { useState } from 'react';
import { createEditor, Descendant } from 'slate';
import { Editable, Slate, withReact } from 'slate-react';

import './TextEditor.less';

interface Props {
  value: string;
}

const TextEditor: React.FC<Props> = ({ value }) => {
  const parsedValue = JSON.parse(value) as Descendant[];

  const [editor] = useState(() => withReact(createEditor()));
  const [localValue, setLocalValue] = useState<Descendant[]>(parsedValue);

  return (
    <Slate editor={editor} value={localValue} onChange={setLocalValue}>
      <Editable />
    </Slate>
  );
};

export default TextEditor;
