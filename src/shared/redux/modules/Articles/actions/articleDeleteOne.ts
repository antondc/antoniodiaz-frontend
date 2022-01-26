import HttpClient from 'Root/src/shared/services/HttpClient';
import { serializerFromArrayToByKey } from '@antoniodcorrea/utils';
import { AppThunk } from '../../..';
import {
  ARTICLE_DELETE_ONE_FAILURE,
  ARTICLE_DELETE_ONE_REQUEST,
  ARTICLE_DELETE_ONE_SUCCEED,
  ArticleApiResponse,
  ArticlesActions,
  ArticleState,
} from '../articles.types';

export const articleDeleteOne =
  (articleId: number): AppThunk<Promise<Partial<ArticleState>>, ArticlesActions> =>
  async (dispatch, getState): Promise<Partial<ArticleState>> => {
    const { Articles: articlesBeforeRequest, Languages: languagesBeforeRequest } = getState();

    const articlesWithoutDeletedArticle = Object.values(articlesBeforeRequest.byKey).filter(
      (item) => item.id !== articleId
    );

    try {
      dispatch({
        type: ARTICLE_DELETE_ONE_REQUEST,
        payload: {
          ...articlesBeforeRequest,
          byKey: serializerFromArrayToByKey<ArticleState, ArticleState>({ data: articlesWithoutDeletedArticle }),
          currentIds: articlesWithoutDeletedArticle.map((item) => item.id),
          loading: true,
        },
      });

      await HttpClient.delete<void, ArticleApiResponse>(
        `${languagesBeforeRequest.currentLanguage.slug}/articles/${articleId}`
      );

      const { Articles: articlesAfterApiCall } = getState();

      dispatch({
        type: ARTICLE_DELETE_ONE_SUCCEED,
        payload: {
          ...articlesAfterApiCall,
          loading: false,
        },
      });

      return {
        id: articleId,
      };
    } catch (error) {
      const { Articles: articlesOnError } = getState();

      dispatch({
        type: ARTICLE_DELETE_ONE_FAILURE,
        payload: {
          ...articlesOnError,
          errors: [...(articlesOnError.errors || []), error],
        },
      });
    }
  };
