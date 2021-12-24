import React from 'react';

import { GlossaryState } from 'Modules/Languages/languages.types';
import A from '../../components/A';

import './When.less';

interface Props {
  glossary: GlossaryState;
}

export const When: React.FC<Props> = ({ glossary }) => (
  <div className="When">
    <h1 className="When-title">{glossary.when}</h1>
    <A href="/when/1">Post 1</A>
    <br />
    <A href="/when/2">Post 2</A>
    <br />
    <A href="/when/3">Post 3</A>
    <br />
  </div>
);
