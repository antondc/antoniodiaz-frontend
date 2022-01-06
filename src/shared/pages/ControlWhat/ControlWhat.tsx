import React from 'react';

import A from 'Components/A';
import { GlossaryState } from 'Modules/Languages/languages.types';

import './ControlWhat.less';

interface Props {
  glossary: GlossaryState;
}

export const ControlWhat: React.FC<Props> = ({ glossary }) => (
  <div className="ControlWhat">
    <h1 className="ControlWhat-title">{glossary?.control}What</h1>
    <A href="/control/when/new">Create new article</A>
  </div>
);
