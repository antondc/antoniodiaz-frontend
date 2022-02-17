import React from 'react';
import { useSelector } from 'react-redux';

import { selectCurrentLanguage } from 'Modules/Languages/selectors/selectCurrentLanguage';
import { Where as WhereUi } from './Where';

const Where: React.FC = () => {
  const language = useSelector(selectCurrentLanguage);

  return <WhereUi language={language} />;
};
export default Where;
