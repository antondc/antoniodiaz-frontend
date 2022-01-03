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
        text: 'In addition to block nodes, you can create inline nodes. Here is a ',
      },
      {
        type: 'link',
        url: 'https://en.wikipedia.org/wiki/Hypertext',
        children: [{ text: 'hyperlink' }],
      },
      {
        text: ', and here is a more unusual inline: an ',
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text: 'There are two ways to add links. You can either add a link via the toolbar icon above, or if you want in on a little secret, copy a URL to your keyboard and paste it while a range of text is selected.',
      },
    ],
  },
]);

export const Control: React.FC<Props> = ({ glossary }) => (
  <div className="Control">
    <h1 className="Control-title">{glossary?.control}</h1>
    <TextEditor value={value} />
  </div>
);
