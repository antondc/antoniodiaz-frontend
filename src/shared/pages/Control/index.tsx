import React from 'react';
import { useSelector } from 'react-redux';

import { selectCurrentGlossary } from 'Modules/Languages/selectors/selectCurrentGlossary';
import { Control as ControlUi } from './Control';

import './Control.less';

const Control: React.FC = () => {
  const glossary = useSelector(selectCurrentGlossary);

  return <ControlUi glossary={glossary} />;
};

export default Control;
