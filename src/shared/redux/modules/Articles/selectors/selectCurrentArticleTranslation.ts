import { RootState } from 'Modules/rootType';
import { ArticleTranslationState } from '../articles.types';

export const selectCurrentArticleTranslation = (
  state: RootState,
  { lang, articleId }: { articleId: number; lang: string }
): ArticleTranslationState => state.Articles?.byKey[articleId]?.translations[lang];
