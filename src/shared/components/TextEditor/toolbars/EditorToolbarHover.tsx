import React, { useEffect } from 'react';
import { Editor, Range } from 'slate';
import { ReactEditor, useSlate } from 'slate-react';

import { HOVERING_TOOLBAR_ENABLED } from '../constants';
import { useCustomEditor } from '../useCustomEditor';

import './EditorToolbarHover.less';

export const EditorToolbarHover: React.FC = () => {
  const editor = useSlate();
  const { toggleBlock, toggleFormat, isFormatActive, isBlockActive } = useCustomEditor();

  useEffect(() => {
    const toolbarElement = document.getElementById('EditorToolbarHover');
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
      toolbarElement.classList.remove('EditorToolbarHover--active');

      return;
    }

    const domSelection = window.getSelection();
    const domRange = domSelection.getRangeAt(0);
    const rect = domRange.getBoundingClientRect();

    toolbarElement.classList.add('EditorToolbarHover--active');
    toolbarElement.style.top = `${rect.top + window.pageYOffset - toolbarElement.offsetHeight}px`;
    toolbarElement.style.left = `${rect.left + window.pageXOffset - toolbarElement.offsetWidth / 2 + rect.width / 2}px`;
  });

  const onMouseLeave = (e: React.MouseEvent) => {
    e.preventDefault();

    const toolbarElement = document.getElementById('EditorToolbarHover');
    toolbarElement.classList.remove('EditorToolbarHover--active');
  };

  const onFormatClick = (e: React.MouseEvent, format: string) => {
    e.preventDefault();
    toggleFormat(editor, format);
  };

  const onBlockClick = (e: React.MouseEvent, block: string) => {
    e.preventDefault();
    toggleBlock(editor, block);
  };

  if (!HOVERING_TOOLBAR_ENABLED) return null;

  return (
    <div className="EditorToolbarHover" id="EditorToolbarHover" onMouseLeave={onMouseLeave}>
      <button
        className={
          'EditorToolbarHover-button' + (isFormatActive(editor, 'bold') ? ' EditorToolbarHover-button--active' : '')
        }
        onMouseDown={(e) => onFormatClick(e, 'bold')}
      >
        <b>B</b>
      </button>
      <button
        className={
          'EditorToolbarHover-button' + (isFormatActive(editor, 'italic') ? ' EditorToolbarHover-button--active' : '')
        }
        onMouseDown={(e) => onFormatClick(e, 'italic')}
      >
        <em>I</em>
      </button>
      <button
        className={
          'EditorToolbarHover-button' +
          (isFormatActive(editor, 'underlined') ? ' EditorToolbarHover-button--active' : '')
        }
        onMouseDown={(e) => onFormatClick(e, 'underlined')}
      >
        <u>U</u>
      </button>
      <button
        className={
          'EditorToolbarHover-button' + (isBlockActive(editor, 'code') ? ' EditorToolbarHover-button--active' : '')
        }
        onMouseDown={(e) => onBlockClick(e, 'code')}
      >
        Code
      </button>
      <button
        className={
          'EditorToolbarHover-button' + (isBlockActive(editor, 'h1') ? ' EditorToolbarHover-button--active' : '')
        }
        onMouseDown={(e) => onBlockClick(e, 'h1')}
      >
        H1
      </button>
      <button
        className={
          'EditorToolbarHover-button' + (isBlockActive(editor, 'h2') ? ' EditorToolbarHover-button--active' : '')
        }
        onMouseDown={(e) => onBlockClick(e, 'h2')}
      >
        H2
      </button>
      <button
        className={
          'EditorToolbarHover-button' + (isBlockActive(editor, 'h3') ? ' EditorToolbarHover-button--active' : '')
        }
        onMouseDown={(e) => onBlockClick(e, 'h3')}
      >
        H3
      </button>
      <button
        className={
          'EditorToolbarHover-button' + (isBlockActive(editor, 'ul') ? ' EditorToolbarHover-button--active' : '')
        }
        onMouseDown={(e) => onBlockClick(e, 'ul')}
      >
        Ul
      </button>
    </div>
  );
};
