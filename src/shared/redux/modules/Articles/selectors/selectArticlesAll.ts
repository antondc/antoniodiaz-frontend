import { createSelector } from 'reselect';

import { ArticlesState, ArticleState } from './../articles.types';
import { selectArticles } from './selectArticles';

export const selectArticlesAll = createSelector(selectArticles, (Articles: ArticlesState): ArticleState[] =>
  Object.values(Articles.byKey || {})
);
