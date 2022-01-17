import React from 'react';
import { useSelector } from 'react-redux';

import { selectCurrentGlossary } from 'Modules/Languages/selectors/selectCurrentGlossary';
import { ControlWho as ControlWhoUi } from './ControlWho';

const ControlWho: React.FC = () => {
  const glossary = useSelector(selectCurrentGlossary);

  return <ControlWhoUi glossary={glossary} />;
};
export default ControlWho;
