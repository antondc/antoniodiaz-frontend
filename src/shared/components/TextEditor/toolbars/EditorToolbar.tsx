import React from 'react';
import { useSlate } from 'slate-react';

import { ENTER_URL_MESSAGE } from '../constants';
import { useCustomEditor } from '../useCustomEditor';

import './EditorToolbar.less';

export const EditorToolbar: React.FC = () => {
  const editor = useSlate();

  const {
    isBlockActive,
    isFormatActive,
    wrapLink,
    unWrapLink,
    toggleBlock,
    toggleFormat,
    insertImageBlockFromToolbar,
  } = useCustomEditor();

  const onFormatClick = (e: React.MouseEvent, format: string) => {
    e.preventDefault();
    toggleFormat(editor, format);
  };

  const onBlockClick = (e: React.MouseEvent, block: string) => {
    e.preventDefault();
    toggleBlock(editor, block);
  };

  const onImageClick = (e: React.MouseEvent) => {
    e.preventDefault();
    insertImageBlockFromToolbar(editor);
  };

  const onLinkClick = (e: React.MouseEvent) => {
    e.preventDefault();

    const linkBlockActive = isBlockActive(editor, 'link');

    if (linkBlockActive) {
      unWrapLink(editor);

      return;
    }

    const url = window.prompt(ENTER_URL_MESSAGE);
    if (!url) return;

    wrapLink(editor, url);
  };

  return (
    <div className="EditorToolbar">
      <button
        className={'EditorToolbar-button' + (isBlockActive(editor, 'link') ? ' EditorToolbar-button--active' : '')}
        onClick={onLinkClick}
      >
        ℋ
      </button>
      <button
        className={'EditorToolbar-button' + (isBlockActive(editor, 'image') ? ' EditorToolbar-button--active' : '')}
        onClick={onImageClick}
      >
        ⨕
      </button>
      <button
        className={'EditorToolbar-button' + (isFormatActive(editor, 'bold') ? ' EditorToolbar-button--active' : '')}
        onClick={(e) => onFormatClick(e, 'bold')}
      >
        <b>B</b>
      </button>
      <button
        className={'EditorToolbar-button' + (isFormatActive(editor, 'italic') ? ' EditorToolbar-button--active' : '')}
        onClick={(e) => onFormatClick(e, 'italic')}
      >
        <em>I</em>
      </button>
      <button
        className={
          'EditorToolbar-button' + (isFormatActive(editor, 'underlined') ? ' EditorToolbar-button--active' : '')
        }
        onClick={(e) => onFormatClick(e, 'underlined')}
      >
        <u>U</u>
      </button>
      <button
        className={
          'EditorToolbar-button' + (isFormatActive(editor, 'inlineCode') ? ' EditorToolbar-button--active' : '')
        }
        onClick={(e) => onFormatClick(e, 'inlineCode')}
      >
        <code>{`< >`}</code>
      </button>
      <button
        className={'EditorToolbar-button' + (isBlockActive(editor, 'quote') ? ' EditorToolbar-button--active' : '')}
        onClick={(e) => onBlockClick(e, 'quote')}
      >
        <blockquote>„</blockquote>
      </button>
      <button
        className={'EditorToolbar-button' + (isBlockActive(editor, 'code') ? ' EditorToolbar-button--active' : '')}
        onClick={(e) => onBlockClick(e, 'code')}
      >
        Code
      </button>
      <button
        className={'EditorToolbar-button' + (isBlockActive(editor, 'h1') ? ' EditorToolbar-button--active' : '')}
        onClick={(e) => onBlockClick(e, 'h1')}
      >
        H1
      </button>
      <button
        className={'EditorToolbar-button' + (isBlockActive(editor, 'h2') ? ' EditorToolbar-button--active' : '')}
        onClick={(e) => onBlockClick(e, 'h2')}
      >
        H2
      </button>
      <button
        className={'EditorToolbar-button' + (isBlockActive(editor, 'h3') ? ' EditorToolbar-button--active' : '')}
        onClick={(e) => onBlockClick(e, 'h3')}
      >
        H3
      </button>
      <button
        className={'EditorToolbar-button' + (isBlockActive(editor, 'ul') ? ' EditorToolbar-button--active' : '')}
        onClick={(e) => onBlockClick(e, 'ul')}
      >
        Ul
      </button>
    </div>
  );
};
