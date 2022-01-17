import React from 'react';
import ReactHtmlParser from 'react-html-parser';

import { GlossaryState } from 'Modules/Languages/languages.types';

import './ControlWho.less';

interface Props {
  glossary: GlossaryState;
}

export const ControlWho: React.FC<Props> = ({ glossary }) => (
  <div className="ControlWho">
    <div className="ControlWho-content">
      <div className="ControlWho-title">{glossary.who}</div>
      <div className="ControlWho-text">{ReactHtmlParser(glossary.whoHtmlText)}</div>
    </div>
  </div>
);
