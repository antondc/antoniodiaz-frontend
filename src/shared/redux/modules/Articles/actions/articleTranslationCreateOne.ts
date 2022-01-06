import HttpClient from 'Root/src/shared/services/HttpClient';
import { AppThunk } from '../../..';
import {
  ARTICLE_TRANSLATION_CREATE_ONE_FAILURE,
  ARTICLE_TRANSLATION_CREATE_ONE_REQUEST,
  ARTICLE_TRANSLATION_CREATE_ONE_SUCCEED,
  ArticlesActions,
  ArticlesCreateOneApiResponse,
  ArticleState,
} from '../articles.types';

type Params = {
  articleId: number;
  articleData: Partial<ArticleState>;
};

export const articleTranslationCreateOne =
  ({ articleId, articleData }: Params): AppThunk<Promise<ArticleState>, ArticlesActions> =>
  async (dispatch, getState): Promise<ArticleState> => {
    const { Articles: articlesBeforeRequest, Languages: languagesBeforeRequest } = getState();

    try {
      dispatch({
        type: ARTICLE_TRANSLATION_CREATE_ONE_REQUEST,
        payload: {
          ...articlesBeforeRequest,
          loading: true,
        },
      });

      const { data } = await HttpClient.patch<void, ArticlesCreateOneApiResponse>(
        `${languagesBeforeRequest.currentLanguage.slug}/articles/${articleId}`,
        articleData
      );

      const { Articles: articlesAfterApiCall } = getState();
      const article = data?.attributes;

      dispatch({
        type: ARTICLE_TRANSLATION_CREATE_ONE_SUCCEED,
        payload: {
          ...articlesAfterApiCall,
          byKey: {
            ...articlesAfterApiCall.byKey,
            [article?.id]: {
              ...articleData,
            },
          },
          loading: false,
        },
      });

      return article;
    } catch (error) {
      const { Articles: articlesOnError } = getState();

      dispatch({
        type: ARTICLE_TRANSLATION_CREATE_ONE_FAILURE,
        payload: {
          ...articlesOnError,
          errors: [...(articlesOnError.errors || []), error],
        },
      });
    }
  };
