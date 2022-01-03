import React from 'react';

import './EditorCode.less';

export const EditorCode: React.FC = ({ children }) => (
  <pre className="EditorCode">
    <code>{children}</code>
  </pre>
);
