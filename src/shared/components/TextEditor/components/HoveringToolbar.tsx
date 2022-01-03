import React, { useEffect } from 'react';
import { Editor, Range } from 'slate';
import { ReactEditor, useSlate } from 'slate-react';

import { HOVERING_TOOLBAR_ENABLED } from '../constants';
import { CustomEditor } from '../customEditor';

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

  const onFormatClick = (e: React.MouseEvent, format: string) => {
    e.preventDefault();
    CustomEditor.toggleFormat(editor, format);
  };

  const onBlockClick = (e: React.MouseEvent, block: string) => {
    e.preventDefault();
    CustomEditor.toggleBlock(editor, block);
  };

  if (!HOVERING_TOOLBAR_ENABLED) return null;

  return (
    <div className="HoveringToolbar" id="HoveringToolbar" onMouseLeave={onMouseLeave}>
      <button
        className={
          'HoveringToolbar-button' +
          (CustomEditor.isFormatActive(editor, 'bold') ? ' HoveringToolbar-button--active' : '')
        }
        onMouseDown={(e) => onFormatClick(e, 'bold')}
      >
        <b>B</b>
      </button>
      <button
        className={
          'HoveringToolbar-button' +
          (CustomEditor.isFormatActive(editor, 'italic') ? ' HoveringToolbar-button--active' : '')
        }
        onMouseDown={(e) => onFormatClick(e, 'italic')}
      >
        <em>I</em>
      </button>
      <button
        className={
          'HoveringToolbar-button' +
          (CustomEditor.isFormatActive(editor, 'underlined') ? ' HoveringToolbar-button--active' : '')
        }
        onMouseDown={(e) => onFormatClick(e, 'underlined')}
      >
        <u>U</u>
      </button>
      <button
        className={
          'HoveringToolbar-button' +
          (CustomEditor.isBlockActive(editor, 'code') ? ' HoveringToolbar-button--active' : '')
        }
        onMouseDown={(e) => onBlockClick(e, 'code')}
      >
        Code
      </button>
      <button
        className={
          'HoveringToolbar-button' + (CustomEditor.isBlockActive(editor, 'h1') ? ' HoveringToolbar-button--active' : '')
        }
        onMouseDown={(e) => onBlockClick(e, 'h1')}
      >
        H1
      </button>
      <button
        className={
          'HoveringToolbar-button' + (CustomEditor.isBlockActive(editor, 'h2') ? ' HoveringToolbar-button--active' : '')
        }
        onMouseDown={(e) => onBlockClick(e, 'h2')}
      >
        H2
      </button>
      <button
        className={
          'HoveringToolbar-button' + (CustomEditor.isBlockActive(editor, 'h3') ? ' HoveringToolbar-button--active' : '')
        }
        onMouseDown={(e) => onBlockClick(e, 'h3')}
      >
        H3
      </button>
      <button
        className={
          'HoveringToolbar-button' + (CustomEditor.isBlockActive(editor, 'ul') ? ' HoveringToolbar-button--active' : '')
        }
        onMouseDown={(e) => onBlockClick(e, 'ul')}
      >
        Ul
      </button>
      <button
        className={
          'HoveringToolbar-button' +
          (CustomEditor.isFormatActive(editor, 'center') ? ' HoveringToolbar-button--active' : '')
        }
        onMouseDown={(e) => onFormatClick(e, 'center')}
      >
        ...
      </button>
    </div>
  );
};
