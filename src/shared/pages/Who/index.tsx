import React from 'react';
import { useSelector } from 'react-redux';

import { selectCurrentGlossary } from 'Modules/Languages/selectors/selectCurrentGlossary';
import { Who as WhoUi } from './Who';

const Who: React.FC = () => {
  const glossary = useSelector(selectCurrentGlossary);

  return <WhoUi glossary={glossary} />;
};
export default Who;
