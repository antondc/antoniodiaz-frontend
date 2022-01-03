import React from 'react';

import { LinkElement } from '../types';

import './EditorA.less';

interface Props {
  children: React.ReactChildren;
  element: LinkElement;
}

export const EditorA: React.FC<Props> = ({ children, element }) => (
  <a className="EditorA" href={element.url}>
    {children}
  </a>
);
