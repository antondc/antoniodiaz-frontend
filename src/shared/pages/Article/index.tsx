import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import highlight from 'highlight.js';

import { useLoadImages } from 'Hooks/loadImages';
import { articlesLoad } from 'Modules/Articles/actions/articlesLoad';
import { selectArticle } from 'Modules/Articles/selectors/selectArticle';
import { selectCurrentLanguageSlug } from 'Modules/Languages/selectors/selectCurrentLanguageSlug';
import { selectLanguageLoading } from 'Modules/Languages/selectors/selectLanguageLoading';
import { RootState } from 'Modules/rootType';
import { selectCurrentRouteParams } from 'Modules/Routes/selectors/selectCurrentRouteParams';
import { LocaleFormattedDate } from 'Tools/utils/Date/localeFormattedDate';
import { Article as ArticleUi } from './Article';

const Article: React.FC = () => {
  const dispatch = useDispatch();
  const language = useSelector(selectCurrentLanguageSlug);
  const languageLoading = useSelector(selectLanguageLoading);
  const params = useSelector(selectCurrentRouteParams);
  const article = useSelector((state: RootState) => selectArticle(state, Number(params.articleId)));
  const renderContent = !languageLoading && article?.language === params?.lang;
  const date = new LocaleFormattedDate({ unixTime: Number(article?.createdAt), locale: params?.lang });
  const createdAtFormatted = date.getLocaleFormattedDate();

  useLoadImages({ wrapperClass: 'Article-content', data: article });

  useEffect(() => {
    dispatch(articlesLoad());
  }, [language]);

  // Load images from blog
  useEffect(() => {
    const childDivs = document.getElementById('Article-content')?.getElementsByTagName('img');
    const images = Array.from(childDivs || []);

    images?.forEach((element) => element.decode().then(() => element.classList.add('Article-image--loaded')));
  }, [article]);

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

  return <ArticleUi article={article} date={createdAtFormatted} renderContent={renderContent} />;
};
export default Article;
