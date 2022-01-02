import React from 'react';

import './CodeElement.less';

export const CodeElement: React.FC = ({ children }) => (
  <pre className="CodeElement">
    <code>{children}</code>
  </pre>
);
