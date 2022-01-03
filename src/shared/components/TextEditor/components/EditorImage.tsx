import React from 'react';

import { ImageElement } from '../types';

import './EditorImage.less';

interface Props {
  element: ImageElement;
}

export const EditorImage: React.FC<Props> = ({ element }) => (
  <img className="EditorImage" src={element.src || 'https://picsum.photos/1000'} />
);
