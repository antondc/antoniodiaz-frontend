import { RootState } from 'Modules/rootType';
import { ArticleState } from '../articles.types';

export const selectArticle = (state: RootState, articleId: number): ArticleState => state.Articles?.byKey[articleId];
