import React from 'react';
import { useSlate } from 'slate-react';

import { CustomEditor } from '.';

import './Toolbar.less';

export const Toolbar: React.FC = () => {
  const editor = useSlate();

  return (
    <div>
      <button
        className="Toolbar-button"
        onMouseDown={(event) => {
          event.preventDefault();
          CustomEditor.toggleFormat(editor, 'bold');
        }}
      >
        <b>B</b>
      </button>
      <button
        className="Toolbar-button"
        onMouseDown={(event) => {
          event.preventDefault();
          CustomEditor.toggleFormat(editor, 'italic');
        }}
      >
        <em>I</em>
      </button>
      <button
        className="Toolbar-button"
        onMouseDown={(event) => {
          event.preventDefault();
          CustomEditor.toggleFormat(editor, 'underlined');
        }}
      >
        <u>U</u>
      </button>
      <button
        className="Toolbar-button"
        onMouseDown={(event) => {
          event.preventDefault();
          CustomEditor.toggleCodeBlock(editor);
        }}
      >
        Code
      </button>
    </div>
  );
};
