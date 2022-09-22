import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useCachedData } from 'Hooks/useCachedData';
import { useHljs } from 'Hooks/useHljs';
import { useLoadInitialData } from 'Hooks/useLoadInitialData';
import { useMathFormat } from 'Hooks/useMathFormat';
import { articlesLoad } from 'Modules/Articles/actions/articlesLoad';
import { ArticleState } from 'Modules/Articles/articles.types';
import { selectArticle } from 'Modules/Articles/selectors/selectArticle';
import { selectCurrentGlossary } from 'Modules/Languages/selectors/selectCurrentGlossary';
import { selectCurrentLanguageSlug } from 'Modules/Languages/selectors/selectCurrentLanguageSlug';
import { RootState } from 'Modules/rootType';
import { selectCurrentRouteParams } from 'Modules/Routes/selectors/selectCurrentRouteParams';
import { LocaleFormattedDate } from '@antoniodcorrea/utils';
import { Article as ArticleUi } from './Article';

const Article: React.FC = () => {
  const dispatch = useDispatch();
  const params = useSelector(selectCurrentRouteParams);
  const currentLanguageSlug = useSelector(selectCurrentLanguageSlug);
  const article = useSelector((state: RootState) => selectArticle(state, Number(params.articleId)));
  const cachedArticle = useCachedData<ArticleState>(article);
  const date = new LocaleFormattedDate({ unixTime: Number(cachedArticle?.createdAt), locale: currentLanguageSlug });
  const createdAtFormatted = date.getLocaleFormattedDate();
  const glossary = useSelector(selectCurrentGlossary);

  const loadInitialData = async () => {
    await dispatch(articlesLoad());
  };
  useLoadInitialData({ loadInitialData });
  useMathFormat({ id: 'Article', data: cachedArticle });
  useHljs({ data: cachedArticle });

  return <ArticleUi article={cachedArticle} date={createdAtFormatted} glossary={glossary} />;
};
export default Article;
