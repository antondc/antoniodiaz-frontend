import { createSelector } from 'reselect';

import { ArticlesState, ArticleState } from './../articles.types';
import { selectArticles } from './selectArticles';

export const selectArticlesCurrent = createSelector(selectArticles, (Articles: ArticlesState): ArticleState[] =>
  Articles.currentIds.map((item) => Articles.byKey[item])
);
