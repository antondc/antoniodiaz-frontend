import React from 'react';
import { useSlate } from 'slate-react';

import { ENTER_URL_MESSAGE } from '../constants';
import { useCustomEditor } from '../useCustomEditor';

import './EditorToolbar.less';

export const EditorToolbar: React.FC = () => {
  const editor = useSlate();

  const { isBlockActive, isFormatActive, linkWrap, linkUnWrap, toggleBlock, toggleFormat } = useCustomEditor();

  const onFormatClick = (e: React.MouseEvent, format: string) => {
    e.preventDefault();
    toggleFormat(editor, format);
  };

  const onBlockClick = (e: React.MouseEvent, block: string) => {
    e.preventDefault();
    toggleBlock(editor, block);
  };

  const onLinkClick = (e: React.MouseEvent) => {
    e.preventDefault();

    const linkBlockActive = isBlockActive(editor, 'link');

    if (linkBlockActive) {
      linkUnWrap(editor);

      return;
    }

    const url = window.prompt(ENTER_URL_MESSAGE);
    if (!url) return;

    linkWrap(editor, url);
  };

  return (
    <div className="EditorToolbar">
      <button
        className={'EditorToolbar-button' + (isBlockActive(editor, 'link') ? ' EditorToolbar-button--active' : '')}
        onMouseDown={onLinkClick}
      >
        ℋ
      </button>
      <button
        className={'EditorToolbar-button' + (isFormatActive(editor, 'bold') ? ' EditorToolbar-button--active' : '')}
        onMouseDown={(e) => onFormatClick(e, 'bold')}
      >
        <b>B</b>
      </button>
      <button
        className={'EditorToolbar-button' + (isFormatActive(editor, 'italic') ? ' EditorToolbar-button--active' : '')}
        onMouseDown={(e) => onFormatClick(e, 'italic')}
      >
        <em>I</em>
      </button>
      <button
        className={
          'EditorToolbar-button' + (isFormatActive(editor, 'underlined') ? ' EditorToolbar-button--active' : '')
        }
        onMouseDown={(e) => onFormatClick(e, 'underlined')}
      >
        <u>U</u>
      </button>
      <button
        className={
          'EditorToolbar-button' + (isFormatActive(editor, 'inlineCode') ? ' EditorToolbar-button--active' : '')
        }
        onMouseDown={(e) => onFormatClick(e, 'inlineCode')}
      >
        <code>{`< >`}</code>
      </button>
      <button
        className={'EditorToolbar-button' + (isBlockActive(editor, 'quote') ? ' EditorToolbar-button--active' : '')}
        onMouseDown={(e) => onBlockClick(e, 'quote')}
      >
        <blockquote>„</blockquote>
      </button>
      <button
        className={'EditorToolbar-button' + (isBlockActive(editor, 'code') ? ' EditorToolbar-button--active' : '')}
        onMouseDown={(e) => onBlockClick(e, 'code')}
      >
        Code
      </button>
      <button
        className={'EditorToolbar-button' + (isBlockActive(editor, 'h1') ? ' EditorToolbar-button--active' : '')}
        onMouseDown={(e) => onBlockClick(e, 'h1')}
      >
        H1
      </button>
      <button
        className={'EditorToolbar-button' + (isBlockActive(editor, 'h2') ? ' EditorToolbar-button--active' : '')}
        onMouseDown={(e) => onBlockClick(e, 'h2')}
      >
        H2
      </button>
      <button
        className={'EditorToolbar-button' + (isBlockActive(editor, 'h3') ? ' EditorToolbar-button--active' : '')}
        onMouseDown={(e) => onBlockClick(e, 'h3')}
      >
        H3
      </button>
      <button
        className={'EditorToolbar-button' + (isBlockActive(editor, 'ul') ? ' EditorToolbar-button--active' : '')}
        onMouseDown={(e) => onBlockClick(e, 'ul')}
      >
        Ul
      </button>
      <button
        className={'EditorToolbar-button' + (isFormatActive(editor, 'center') ? ' EditorToolbar-button--active' : '')}
        onMouseDown={(e) => onFormatClick(e, 'center')}
      >
        ...
      </button>
    </div>
  );
};
