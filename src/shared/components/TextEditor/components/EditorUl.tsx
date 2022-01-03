import React from 'react';

import './EditorUl.less';

export const EditorUl: React.FC = ({ children }) => (
  <ul className="EditorUl">
    <li>{children}</li>
  </ul>
);
