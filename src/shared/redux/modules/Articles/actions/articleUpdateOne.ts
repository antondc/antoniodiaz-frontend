import HttpClient from 'Root/src/shared/services/HttpClient';
import { AppThunk } from '../../..';
import {
  ARTICLE_UPDATE_ONE_REQUEST,
  ARTICLES_LOAD_FAILURE,
  ARTICLES_LOAD_SUCCEED,
  ArticlesActions,
  ArticlesCreateOneApiResponse,
  ArticleState,
} from '../articles.types';

type Params = {
  articleId: number;
  articleData: Partial<ArticleState>;
};

export const articleUpdateOne =
  ({ articleId, articleData }: Params): AppThunk<Promise<ArticleState>, ArticlesActions> =>
  async (dispatch, getState): Promise<ArticleState> => {
    const { Articles: articlesBeforeRequest, Languages: languagesBeforeRequest } = getState();

    try {
      dispatch({
        type: ARTICLE_UPDATE_ONE_REQUEST,
        payload: {
          ...articlesBeforeRequest,
          byKey: {
            ...articlesBeforeRequest.byKey,
            [articleId]: {
              ...articlesBeforeRequest.byKey[articleId],
              ...articleData,
            },
          },
          loading: true,
        },
      });

      const { data } = await HttpClient.put<void, ArticlesCreateOneApiResponse>(
        `${languagesBeforeRequest.currentLanguage.slug}/articles/${articleId}`,
        articleData
      );

      const { Articles: articlesAfterApiCall } = getState();
      const article = data?.attributes;

      dispatch({
        type: ARTICLES_LOAD_SUCCEED,
        payload: {
          ...articlesAfterApiCall,
          byKey: {
            ...articlesAfterApiCall.byKey,
            [articleId]: {
              ...articlesBeforeRequest.byKey[articleId],
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
        type: ARTICLES_LOAD_FAILURE,
        payload: {
          ...articlesOnError,
          errors: [...(articlesOnError.errors || []), error],
        },
      });
    }
  };
