import React from 'react';

import TextEditor from 'Components/TextEditor';
import { GlossaryState } from 'Modules/Languages/languages.types';

import './Control.less';

interface Props {
  glossary: GlossaryState;
}

const value: string = JSON.stringify([
  {
    type: 'paragraph',
    children: [
      {
        text: 'This example shows how you can make a hovering menu appear above your content, which you can use to make text ',
      },
      { text: 'bold', bold: true },
      { text: ', ' },
      { text: 'italic', italic: true },
      { text: ', or anything else you might want to do!' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      { text: 'Try it out yourself! Just ' },
      { text: 'select any piece of text and the menu will appear', bold: true },
      { text: '.' },
    ],
  },
]);

export const Control: React.FC<Props> = ({ glossary }) => (
  <div className="Control">
    <h1 className="Control-title">{glossary?.control}</h1>
    <TextEditor value={value} />
  </div>
);
