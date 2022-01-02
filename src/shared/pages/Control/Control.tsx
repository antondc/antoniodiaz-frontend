import React from 'react';

import TextEditor from 'Components/TextEditor';
import { GlossaryState } from 'Modules/Languages/languages.types';

import './Control.less';

interface Props {
  glossary: GlossaryState;
}

export const Control: React.FC<Props> = ({ glossary }) => (
  <div className="Control">
    <h1 className="Control-title">{glossary?.control}</h1>
    <TextEditor />
  </div>
);
