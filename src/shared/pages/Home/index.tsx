import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useLoadInitialData } from 'Hooks/useLoadInitialData';
import { articlesLoad } from 'Modules/Articles/actions/articlesLoad';
import { selectArticlesCurrent } from 'Modules/Articles/selectors/selectArticlesCurrent';
import { selectCurrentGlossary } from 'Modules/Languages/selectors/selectCurrentGlossary';
import { selectCurrentLanguageSlug } from 'Modules/Languages/selectors/selectCurrentLanguageSlug';
import { LocaleFormattedDate } from '@antoniodcorrea/utils';
import { selectSessionLoggedIn } from '../../redux/modules/Session/selectors/selectSessionLoggedIn';
import { Home as HomeUi } from './Home';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const glossary = useSelector(selectCurrentGlossary);
  const currentLanguageSlug = useSelector(selectCurrentLanguageSlug);
  const articles = useSelector(selectArticlesCurrent);
  const articlesWithDates = articles.map((item) => {
    const date = new LocaleFormattedDate({ unixTime: Number(item?.createdAt), locale: currentLanguageSlug });
    const formattedDate = date.getLocaleFormattedDate();

    return {
      ...item,
      date: formattedDate,
    };
  });
  const isLoggedIn = useSelector(selectSessionLoggedIn);

  const loadInitialData = async () => {
    await dispatch(articlesLoad());
  };

  useLoadInitialData({ loadInitialData });

  return <HomeUi glossary={glossary} articlesWithDates={articlesWithDates} isLoggedIn={isLoggedIn} />;
};
export default Home;
