import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { useCachedData } from 'Hooks/useCachedData';
import { useHljs } from 'Hooks/useHljs';
import { useLoadInitialData } from 'Hooks/useLoadInitialData';
import { articlesLoad } from 'Modules/Articles/actions/articlesLoad';
import { ArticleState } from 'Modules/Articles/articles.types';
import { selectArticle } from 'Modules/Articles/selectors/selectArticle';
import { RootState } from 'Modules/rootType';
import { selectCurrentRouteParams } from 'Modules/Routes/selectors/selectCurrentRouteParams';
import { LocaleFormattedDate } from '@antoniodcorrea/utils';
import { Article as ArticleUi } from './Article';

const Article: React.FC = () => {
  const dispatch = useDispatch();
  const params = useSelector(selectCurrentRouteParams);
  const article = useSelector((state: RootState) => selectArticle(state, Number(params.articleId)), shallowEqual);
  const cachedArticle = useCachedData<ArticleState>(article);
  const date = new LocaleFormattedDate({ unixTime: Number(cachedArticle?.createdAt), locale: params?.lang });
  const createdAtFormatted = date.getLocaleFormattedDate();

  const loadInitialData = async () => {
    await dispatch(articlesLoad());
  };
  useLoadInitialData({ loadInitialData });

  useHljs({ data: article });

  // Load embedded html images
  useEffect(() => {
    const imageElements = document.getElementsByTagName('img');
    const imageElementsArray = Array.from(imageElements);

    imageElementsArray.forEach((imageElement) => {
      imageElement.decode().then(() => {
        imageElement.classList.add('Article-image--loaded');
      });
    });
  }, []);

  return <ArticleUi article={article} date={createdAtFormatted} />;
};
export default Article;
