import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import highlight from 'highlight.js';

import { articlesLoad } from 'Modules/Articles/actions/articlesLoad';
import { selectArticle } from 'Modules/Articles/selectors/selectArticle';
import { RootState } from 'Modules/rootType';
import { selectCurrentRouteParams } from 'Modules/Routes/selectors/selectCurrentRouteParams';
import { LocaleFormattedDate } from 'Tools/utils/Date/localeFormattedDate';
import { Article as ArticleUi } from './Article';

const Article: React.FC = () => {
  const dispatch = useDispatch();
  const params = useSelector(selectCurrentRouteParams);
  const article = useSelector((state: RootState) => selectArticle(state, Number(params.articleId)));

  const articleTranslation = article?.translations[params?.lang];
  const date = new LocaleFormattedDate({ unixTime: Number(article?.date), locale: params?.lang });
  const createdAtFormatted = date.getLocaleFormattedDate();

  useEffect(() => {
    dispatch(articlesLoad());
  }, []);

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

  // Style embedded html code blocks
  useEffect(() => {
    const codeElements = document.getElementsByTagName('pre');
    const codeElementsArray = Array.from(codeElements);

    codeElementsArray.forEach((codeElement) => {
      highlight.highlightElement(codeElement);
    });
  }, []);

  if (!Number(article?.id)) return <div />;

  return <ArticleUi articleTranslation={articleTranslation} date={createdAtFormatted} />;
};
export default Article;
