import React from 'react';
import ReactHtmlParser from 'react-html-parser';

import { GlossaryState } from 'Modules/Languages/languages.types';

import './Who.less';

interface Props {
  glossary: GlossaryState;
}

export const Who: React.FC<Props> = ({ glossary }) => (
  <div className="Who">
    <div className="Who-content">
      <div className="Who-title">
        {glossary.who}
        <span className="Who-icon">👨‍💻</span>
      </div>
      <div className="Who-text">{ReactHtmlParser(glossary.whoHtmlText)}</div>
    </div>
  </div>
);
