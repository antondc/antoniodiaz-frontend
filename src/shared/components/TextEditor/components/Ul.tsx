import React from 'react';

import './Ul.less';

export const Ul: React.FC = ({ children }) => (
  <ul className="Ul">
    <li>{children}</li>
  </ul>
);
