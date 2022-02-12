import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useLoadImages } from 'Hooks/loadImages';
import { useHljs } from 'Hooks/useHljs';
import { useLoadInitialData } from 'Hooks/useLoadInitialData';
import { articlesLoad } from 'Modules/Articles/actions/articlesLoad';
import { selectArticle } from 'Modules/Articles/selectors/selectArticle';
import { selectLanguageLoading } from 'Modules/Languages/selectors/selectLanguageLoading';
import { RootState } from 'Modules/rootType';
import { selectCurrentRouteParams } from 'Modules/Routes/selectors/selectCurrentRouteParams';
import { LocaleFormattedDate } from '@antoniodcorrea/utils';
import { Article as ArticleUi } from './Article';

const Article: React.FC = () => {
  const dispatch = useDispatch();
  const languageLoading = useSelector(selectLanguageLoading);
  const params = useSelector(selectCurrentRouteParams);
  const article = useSelector((state: RootState) => selectArticle(state, Number(params.articleId)));
  const renderContent = !languageLoading && article?.language === params?.lang;
  const date = new LocaleFormattedDate({ unixTime: Number(article?.createdAt), locale: params?.lang });
  const createdAtFormatted = date.getLocaleFormattedDate();

  const loadInitialData = async () => {
    await dispatch(articlesLoad());
  };

  useHljs({ data: article });
  useLoadImages({
    id: 'Article-content',
    className: 'Article-image--loaded',
    data: article,
  });
  useLoadInitialData({ loadInitialData });

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

  if (!Number(article?.id)) return <div />;

  return <ArticleUi article={article} date={createdAtFormatted} renderContent={renderContent} />;
};
export default Article;
