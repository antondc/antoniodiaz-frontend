import React from 'react';
import { useSelector } from 'react-redux';

import { selectCurrentGlossary } from 'Modules/Languages/selectors/selectCurrentGlossary';
import { Where as WhereUi } from './Where';

const Where: React.FC = () => {
  const glossary = useSelector(selectCurrentGlossary);

  return <WhereUi glossary={glossary} />;
};
export default Where;
