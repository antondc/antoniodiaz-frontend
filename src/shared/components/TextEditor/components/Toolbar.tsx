import React from 'react';
import { useSlate } from 'slate-react';

import { ENTER_URL_MESSAGE } from '../constants';
import { CustomEditor } from '../customEditor';

import './Toolbar.less';

export const Toolbar: React.FC = () => {
  const editor = useSlate();

  const onFormatClick = (e: React.MouseEvent, format: string) => {
    e.preventDefault();
    CustomEditor.toggleFormat(editor, format);
  };

  const onBlockClick = (e: React.MouseEvent, block: string) => {
    e.preventDefault();
    CustomEditor.toggleBlock(editor, block);
  };

  const onLinkClick = (e: React.MouseEvent) => {
    e.preventDefault();

    const linkBlockActive = CustomEditor.isBlockActive(editor, 'link');

    if (linkBlockActive) {
      CustomEditor.linkUnWrap(editor);

      return;
    }

    const url = window.prompt(ENTER_URL_MESSAGE);
    if (!url) return;

    CustomEditor.linkWrap(editor, url);
  };

  return (
    <div className="Toolbar">
      <button
        className={'Toolbar-button' + (CustomEditor.isBlockActive(editor, 'link') ? ' Toolbar-button--active' : '')}
        onMouseDown={onLinkClick}
      >
        ℋ
      </button>
      <button
        className={'Toolbar-button' + (CustomEditor.isFormatActive(editor, 'bold') ? ' Toolbar-button--active' : '')}
        onMouseDown={(e) => onFormatClick(e, 'bold')}
      >
        <b>B</b>
      </button>
      <button
        className={'Toolbar-button' + (CustomEditor.isFormatActive(editor, 'italic') ? ' Toolbar-button--active' : '')}
        onMouseDown={(e) => onFormatClick(e, 'italic')}
      >
        <em>I</em>
      </button>
      <button
        className={
          'Toolbar-button' + (CustomEditor.isFormatActive(editor, 'underlined') ? ' Toolbar-button--active' : '')
        }
        onMouseDown={(e) => onFormatClick(e, 'underlined')}
      >
        <u>U</u>
      </button>
      <button
        className={
          'Toolbar-button' + (CustomEditor.isFormatActive(editor, 'inlineCode') ? ' Toolbar-button--active' : '')
        }
        onMouseDown={(e) => onFormatClick(e, 'inlineCode')}
      >
        <code>{`< >`}</code>
      </button>
      <button
        className={'Toolbar-button' + (CustomEditor.isBlockActive(editor, 'quote') ? ' Toolbar-button--active' : '')}
        onMouseDown={(e) => onBlockClick(e, 'quote')}
      >
        <blockquote>„</blockquote>
      </button>
      <button
        className={'Toolbar-button' + (CustomEditor.isBlockActive(editor, 'code') ? ' Toolbar-button--active' : '')}
        onMouseDown={(e) => onBlockClick(e, 'code')}
      >
        Code
      </button>
      <button
        className={'Toolbar-button' + (CustomEditor.isBlockActive(editor, 'h1') ? ' Toolbar-button--active' : '')}
        onMouseDown={(e) => onBlockClick(e, 'h1')}
      >
        H1
      </button>
      <button
        className={'Toolbar-button' + (CustomEditor.isBlockActive(editor, 'h2') ? ' Toolbar-button--active' : '')}
        onMouseDown={(e) => onBlockClick(e, 'h2')}
      >
        H2
      </button>
      <button
        className={'Toolbar-button' + (CustomEditor.isBlockActive(editor, 'h3') ? ' Toolbar-button--active' : '')}
        onMouseDown={(e) => onBlockClick(e, 'h3')}
      >
        H3
      </button>
      <button
        className={'Toolbar-button' + (CustomEditor.isBlockActive(editor, 'ul') ? ' Toolbar-button--active' : '')}
        onMouseDown={(e) => onBlockClick(e, 'ul')}
      >
        Ul
      </button>
      <button
        className={'Toolbar-button' + (CustomEditor.isFormatActive(editor, 'center') ? ' Toolbar-button--active' : '')}
        onMouseDown={(e) => onFormatClick(e, 'center')}
      >
        ...
      </button>
    </div>
  );
};
