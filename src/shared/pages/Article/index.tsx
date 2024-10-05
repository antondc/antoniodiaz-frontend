import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useHljs } from 'Hooks/useHljs/useHljs';
import { useLoadInitialData } from 'Hooks/useLoadInitialData';
import { useMathFormat } from 'Hooks/useMathFormat';
import { articlesLoad } from 'Modules/Articles/actions/articlesLoad';
import { selectArticle } from 'Modules/Articles/selectors/selectArticle';
import { selectCurrentGlossary } from 'Modules/Languages/selectors/selectCurrentGlossary';
import { selectCurrentLanguageSlug } from 'Modules/Languages/selectors/selectCurrentLanguageSlug';
import { RootState } from 'Modules/rootType';
import { selectCurrentRouteParams } from 'Modules/Routes/selectors/selectCurrentRouteParams';
import { getIdFromSlug, LocaleFormattedDate } from '@antoniodcorrea/utils';
import { selectSessionLoggedIn } from 'Modules/Session/selectors/selectSessionLoggedIn';
import { Article as ArticleUi } from './Article';

const Article: React.FC = () => {
  const dispatch = useDispatch();
  const params = useSelector(selectCurrentRouteParams);
  const currentLanguageSlug = useSelector(selectCurrentLanguageSlug);
  const article = useSelector((state: RootState) => selectArticle(state, Number(getIdFromSlug(params.articleId))));
  const date = new LocaleFormattedDate({ unixTime: Number(article?.createdAt), locale: currentLanguageSlug });
  const createdAtFormatted = date.getLocaleFormattedDate();
  const glossary = useSelector(selectCurrentGlossary);
  const isLoggedIn = useSelector(selectSessionLoggedIn);

  const loadInitialData = async () => {
    await dispatch(articlesLoad());
  };
  useLoadInitialData({ loadInitialData });
  useMathFormat({ id: 'Article', data: article });
  useHljs({ data: article });

  return <ArticleUi article={article} date={createdAtFormatted} glossary={glossary} isLoggedIn={isLoggedIn} />;
};
export default Article;
