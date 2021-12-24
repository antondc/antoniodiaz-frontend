import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { articlesLoad } from 'Modules/Articles/actions/articlesLoad';
import { selectCurrentArticleTranslation } from 'Modules/Articles/selectors/selectCurrentArticleTranslation';
import { RootState } from 'Modules/rootType';
import { selectCurrentRouteParams } from 'Modules/Routes/selectors/selectCurrentRouteParams';
import { Post as PostUi } from './Post';

const Post: React.FC = () => {
  const dispatch = useDispatch();
  const params = useSelector(selectCurrentRouteParams);
  const articleTranslation = useSelector((state: RootState) =>
    selectCurrentArticleTranslation(state, { lang: String(params.lang), articleId: Number(params.articleId) })
  );

  useEffect(() => {
    dispatch(articlesLoad());
  }, []);

  const id = Number(params?.articleId);

  if (!id) return null;

  return <PostUi articleTranslation={articleTranslation} />;
};
export default Post;
