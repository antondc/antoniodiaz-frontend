import React from 'react';

import TextEditor from 'Components/TextEditor';
import { GlossaryState } from 'Modules/Languages/languages.types';

import './Control.less';

interface Props {
  glossary: GlossaryState;
}

const value: string = JSON.stringify([
  {
    type: 'h1',
    children: [
      {
        text: 'Title here',
      },
    ],
  },
  {
    type: 'image',
    src: 'https://picsum.photos/id/175/1000',
    children: [
      {
        text: '',
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text: 'Lorem ipsum dolor ',
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni quod molestiae alias neque corrupti, sequi quibusdam, quasi perferendis omnis maiores rem doloremque officia at repudiandae voluptatem voluptates doloribus aspernatur ',
      },
      {
        type: 'link',
        url: 'https://en.wikipedia.org/wiki/Hypertext',
        children: [{ text: 'hyperlink' }],
      },
      {
        text: ' lorem ipsum dolor sit amet consectetur adipisicing elit. Magni quod molestiae alias neque corrupti, sequi quibusdam, quasi perferendis omnis maiores rem doloremque officia at repudiandae voluptatem voluptates doloribus aspernatur aliquam?. ',
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni quod molestiae alias neque corrupti, sequi quibusdam, quasi perferendis omnis maiores rem doloremque officia at repudiandae voluptatem voluptates doloribus aspernatur aliquam?. Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni quod molestiae alias neque corrupti, sequi quibusdam, quasi perferendis omnis maiores rem doloremque officia at repudiandae voluptatem voluptates doloribus aspernatur aliquam?.',
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni quod molestiae alias neque corrupti, sequi quibusdam, quasi perferendis omnis maiores rem doloremque officia at repudiandae voluptatem voluptates doloribus aspernatur aliquam?. Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni quod molestiae alias neque corrupti, sequi quibusdam, quasi perferendis omnis maiores rem doloremque officia at repudiandae voluptatem voluptates doloribus aspernatur aliquam?.',
      },
    ],
  },
  {
    type: 'code',
    children: [
      {
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni quod molestiae alias neque corrupti, sequi quibusdam, quasi perferendis omnis maiores rem doloremque officia at repudiandae voluptatem voluptates doloribus aspernatur aliquam?. Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni quod molestiae alias neque corrupti, sequi quibusdam, quasi perferendis omnis maiores rem doloremque officia at repudiandae voluptatem voluptates doloribus aspernatur aliquam?.',
      },
    ],
  },
  {
    type: 'image',
    src: 'https://picsum.photos/1000',
    children: [
      {
        text: '',
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni quod molestiae alias neque corrupti, sequi quibusdam, quasi perferendis omnis maiores rem doloremque officia at repudiandae voluptatem voluptates doloribus aspernatur aliquam?. Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni quod molestiae alias neque corrupti, sequi quibusdam, quasi perferendis omnis maiores rem doloremque officia at repudiandae voluptatem voluptates doloribus aspernatur aliquam?.',
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni quod molestiae alias neque corrupti, sequi quibusdam, quasi perferendis omnis maiores rem doloremque officia at repudiandae voluptatem voluptates doloribus aspernatur aliquam?. Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni quod molestiae alias neque corrupti, sequi quibusdam, quasi perferendis omnis maiores rem doloremque officia at repudiandae voluptatem voluptates doloribus aspernatur aliquam?.',
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni quod molestiae alias neque corrupti, sequi quibusdam, quasi perferendis omnis maiores rem doloremque officia at repudiandae voluptatem voluptates doloribus aspernatur aliquam?. Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni quod molestiae alias neque corrupti, sequi quibusdam, quasi perferendis omnis maiores rem doloremque officia at repudiandae voluptatem voluptates doloribus aspernatur aliquam?.',
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
