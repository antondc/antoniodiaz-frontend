import React, { useEffect } from 'react';
import { Editor, Range } from 'slate';
import { ReactEditor, useSlate } from 'slate-react';

import { CustomEditor } from '.';

import './HoveringToolbar.less';

export const HoveringToolbar: React.FC = () => {
  const editor = useSlate();

  useEffect(() => {
    const toolbarElement = document.getElementById('HoveringToolbar');
    const { selection } = editor;

    if (!toolbarElement) {
      return;
    }

    if (
      !selection ||
      !ReactEditor.isFocused(editor) ||
      Range.isCollapsed(selection) ||
      Editor.string(editor, selection) === ''
    ) {
      toolbarElement.classList.remove('HoveringToolbar--active');

      return;
    }

    const domSelection = window.getSelection();
    const domRange = domSelection.getRangeAt(0);
    const rect = domRange.getBoundingClientRect();

    toolbarElement.classList.add('HoveringToolbar--active');
    toolbarElement.style.top = `${rect.top + window.pageYOffset - toolbarElement.offsetHeight}px`;
    toolbarElement.style.left = `${rect.left + window.pageXOffset - toolbarElement.offsetWidth / 2 + rect.width / 2}px`;
  });

  const onMouseLeave = (e: React.MouseEvent) => {
    e.preventDefault();

    const toolbarElement = document.getElementById('HoveringToolbar');
    toolbarElement.classList.remove('HoveringToolbar--active');
  };

  return (
    <div className="HoveringToolbar" id="HoveringToolbar" onMouseLeave={onMouseLeave}>
      <strong
        className={
          'HoveringToolbar-button' +
          (CustomEditor.isFormatActive(editor, 'bold') ? ' HoveringToolbar-button--active' : '')
        }
        onMouseDown={(event) => {
          event.preventDefault();
          CustomEditor.toggleFormat(editor, 'bold');
        }}
      >
        B
      </strong>
      <em
        className={
          'HoveringToolbar-button' +
          (CustomEditor.isFormatActive(editor, 'italic') ? ' HoveringToolbar-button--active' : '')
        }
        onMouseDown={(event) => {
          event.preventDefault();
          CustomEditor.toggleFormat(editor, 'italic');
        }}
      >
        I
      </em>
      <u
        className={
          'HoveringToolbar-button' +
          (CustomEditor.isFormatActive(editor, 'underlined') ? ' HoveringToolbar-button--active' : '')
        }
        onMouseDown={(event) => {
          event.preventDefault();
          CustomEditor.toggleFormat(editor, 'underlined');
        }}
      >
        U
      </u>
    </div>
  );
};
