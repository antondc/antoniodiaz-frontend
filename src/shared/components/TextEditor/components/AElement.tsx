import React from 'react';

import { LinkElement } from '../types';

import './AElement.less';

interface Props {
  children: React.ReactChildren;
  element: LinkElement;
  attributes: any;
}

export const AElement: React.FC<Props> = ({ children, element, attributes }) => (
  <a className="AElement" href={element.url} {...attributes}>
    {children}
  </a>
);
