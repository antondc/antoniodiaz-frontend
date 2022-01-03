import React from 'react';

import './Quote.less';

export const Quote: React.FC = ({ children }) => <blockquote className="Quote">{children}</blockquote>;
