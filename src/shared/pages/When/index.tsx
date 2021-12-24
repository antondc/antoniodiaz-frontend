import React from 'react';
import { useSelector } from 'react-redux';

import { selectCurrentGlossary } from 'Modules/Languages/selectors/selectCurrentGlossary';
import { When as WhenUi } from './When';

const When: React.FC = () => {
  const glossary = useSelector(selectCurrentGlossary);

  return <WhenUi glossary={glossary} />;
};
export default When;
