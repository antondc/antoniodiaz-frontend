import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useCachedData } from 'Hooks/useCachedData';
import { useHljs } from 'Hooks/useHljs';
import { useLoadInitialData } from 'Hooks/useLoadInitialData';
import { useMathFormat } from 'Hooks/useMathFormat';
import { articlesLoad } from 'Modules/Articles/actions/articlesLoad';
import { ArticleState } from 'Modules/Articles/articles.types';
import { selectArticle } from 'Modules/Articles/selectors/selectArticle';
import { RootState } from 'Modules/rootType';
import { selectCurrentRouteParams } from 'Modules/Routes/selectors/selectCurrentRouteParams';

const Article: React.FC = () => {
  const dispatch = useDispatch();
  const params = useSelector(selectCurrentRouteParams);
  const article = useSelector((state: RootState) => selectArticle(state, Number(params.articleId)));
  const cachedArticle = useCachedData<ArticleState>(article);

  const loadInitialData = async () => {
    await dispatch(articlesLoad());
  };
  useLoadInitialData({ loadInitialData });

  useMathFormat({ id: 'Article', data: cachedArticle });

  useHljs({ data: article });

  return <div>ARTICLE UI</div>;
};
export default Article;
