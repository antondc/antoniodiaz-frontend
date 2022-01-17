import React from 'react';
import { useSelector } from 'react-redux';

import { useLoadImages } from 'Hooks/loadImages';
import { selectCurrentGlossary } from 'Modules/Languages/selectors/selectCurrentGlossary';
import { Who as WhoUi } from './Who';

const Who: React.FC = () => {
  const glossary = useSelector(selectCurrentGlossary);

  useLoadImages({
    id: 'Who-content',
    className: 'Who-image--loaded',
    data: glossary,
  });

  return <WhoUi glossary={glossary} />;
};
export default Who;
