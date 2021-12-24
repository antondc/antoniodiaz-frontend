import React from 'react';

import { GlossaryState } from 'Modules/Languages/languages.types';

import './Where.less';

interface Props {
  glossary: GlossaryState;
}
export const Where: React.FC<Props> = ({ glossary }) => (
  <div className="Where">
    <h1 className="Where-title">{glossary.where}</h1>
  </div>
);
