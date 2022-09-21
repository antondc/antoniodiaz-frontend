import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useLoadImages } from 'Hooks/loadImages';
import { useLoadInitialData } from 'Hooks/useLoadInitialData';
import { articlesLoad } from 'Modules/Articles/actions/articlesLoad';
import { selectCurrentGlossary } from 'Modules/Languages/selectors/selectCurrentGlossary';
import { About as AboutUi } from './About';

const About: React.FC = () => {
  const dispatch = useDispatch();
  const glossary = useSelector(selectCurrentGlossary);

  const loadInitialData = async () => {
    await dispatch(articlesLoad());
  };
  useLoadInitialData({ loadInitialData });

  useLoadImages({
    id: 'About-content',
    className: 'About-image--loaded',
    data: glossary,
  });

  return <AboutUi glossary={glossary} />;
};
export default About;
