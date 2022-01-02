import React, { useMemo, useState } from 'react';
import { BaseEditor, createEditor, Descendant } from 'slate';
import { Editable, ReactEditor, Slate, withReact } from 'slate-react';

import { GlossaryState } from 'Modules/Languages/languages.types';

import './Control.less';

interface Props {
  glossary: GlossaryState;
}

type CustomElement = {
  type: 'paragraph';
  children: CustomText[];
};

type CustomText = {
  text: string;
};

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

export const Control: React.FC<Props> = () => {
  const editor = useMemo(() => withReact(createEditor()), []);
  // Add the initial value when setting up our state.
  const [value, setValue] = useState<Descendant[]>([
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
  ]);

  return (
    <div className="Control">
      <Slate editor={editor} value={value} onChange={(newValue) => setValue(newValue)}>
        <Editable />
      </Slate>
    </div>
  );
};
