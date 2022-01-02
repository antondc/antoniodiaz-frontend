import React, { useMemo, useState } from 'react';
import { createEditor, Descendant } from 'slate';
import { Editable, Slate, withReact } from 'slate-react';

import './TextEditor.less';

const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.' }],
  },
];

interface Props {
  value?: any;
}

export const TextEditor: React.FC<Props> = () => {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState<Descendant[]>(initialValue);

  const insertAnd = (e: React.KeyboardEvent): void => {
    if (e.key === '&') {
      e.preventDefault();
      editor.insertText('and');
    }
  };

  return (
    <Slate editor={editor} value={value} onChange={setValue}>
      <Editable onKeyDown={insertAnd} />
    </Slate>
  );
};
