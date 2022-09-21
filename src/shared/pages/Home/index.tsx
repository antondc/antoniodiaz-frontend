import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useLoadInitialData } from 'Hooks/useLoadInitialData';
import { articlesLoad } from 'Modules/Articles/actions/articlesLoad';
import { selectArticlesCurrent } from 'Modules/Articles/selectors/selectArticlesCurrent';
import { selectCurrentGlossary } from 'Modules/Languages/selectors/selectCurrentGlossary';
import { selectCurrentRouteParams } from 'Modules/Routes/selectors/selectCurrentRouteParams';
import { LocaleFormattedDate } from '@antoniodcorrea/utils';
import { Home as HomeUi } from './Home';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const glossary = useSelector(selectCurrentGlossary);
  const params = useSelector(selectCurrentRouteParams);
  const articles = useSelector(selectArticlesCurrent);
  const articlesWithDates = articles.map((item) => {
    const date = new LocaleFormattedDate({ unixTime: Number(item?.createdAt), locale: params?.lang });
    const formattedDate = date.getLocaleFormattedDate();

    return {
      ...item,
      date: formattedDate,
    };
  });

  const loadInitialData = async () => {
    await dispatch(articlesLoad());
  };

  useLoadInitialData({ loadInitialData });

  return <HomeUi glossary={glossary} articlesWithDates={articlesWithDates} />;
};
export default Home;
