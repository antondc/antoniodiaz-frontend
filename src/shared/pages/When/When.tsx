import React from 'react';

import { GlossaryState } from 'Modules/Languages/languages.types';

import './When.less';

interface Props {
  glossary: GlossaryState;
}

export const When: React.FC<Props> = ({ glossary }) => (
  <div className="When">
    <h1 className="When-title">{glossary.when}</h1>
  </div>
);
