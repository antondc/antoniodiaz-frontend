import { RootState } from 'Modules/rootType';
import { ArticlesState } from '../articles.types';

export const selectArticles = (state: RootState): ArticlesState => state.Articles;
