import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useLoadImages } from 'Hooks/loadImages';
import { useLoadInitialData } from 'Hooks/useLoadInitialData';
import { articlesLoad } from 'Modules/Articles/actions/articlesLoad';
import { selectCurrentGlossary } from 'Modules/Languages/selectors/selectCurrentGlossary';
import { Who as WhoUi } from './Who';

const Who: React.FC = () => {
  const dispatch = useDispatch();
  const glossary = useSelector(selectCurrentGlossary);

  const loadInitialData = async () => {
    await dispatch(articlesLoad());
  };
  useLoadInitialData({ loadInitialData });

  useLoadImages({
    id: 'Who-content',
    className: 'Who-image--loaded',
    data: glossary,
  });

  return <WhoUi glossary={glossary} />;
};
export default Who;
