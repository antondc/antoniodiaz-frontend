import React from 'react';
import { useSelector } from 'react-redux';

import { selectCurrentGlossary } from 'Modules/Languages/selectors/selectCurrentGlossary';
import { ControlWhat as ControlWhatUi } from './ControlWhat';

import './ControlWhat.less';

const ControlWhat: React.FC = () => {
  const glossary = useSelector(selectCurrentGlossary);

  return <ControlWhatUi glossary={glossary} />;
};

export default ControlWhat;
