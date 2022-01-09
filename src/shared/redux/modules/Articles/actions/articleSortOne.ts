import HttpClient from 'Root/src/shared/services/HttpClient';
import { AppThunk } from '../../..';
import {
  ARTICLE_SORT_ONE_FAILURE,
  ARTICLE_SORT_ONE_REQUEST,
  ARTICLE_SORT_ONE_SUCCEED,
  ArticleApiResponse,
  ArticlesActions,
  ArticleState,
} from '../articles.types';

type Params = {
  articleId: number;
  order: number;
};

export const articleSortOne =
  ({ articleId, order }: Params): AppThunk<Promise<ArticleState>, ArticlesActions> =>
  async (dispatch, getState): Promise<ArticleState> => {
    const { Articles: articlesBeforeRequest, Languages: languagesBeforeRequest } = getState();

    try {
      dispatch({
        type: ARTICLE_SORT_ONE_REQUEST,
        payload: {
          ...articlesBeforeRequest,
          loading: true,
        },
      });

      const { data } = await HttpClient.patch<void, ArticleApiResponse>(
        `${languagesBeforeRequest.currentLanguage.slug}/articles/${articleId}`,
        { order }
      );

      const { Articles: articlesAfterApiCall } = getState();
      const article = data?.attributes;

      dispatch({
        type: ARTICLE_SORT_ONE_SUCCEED,
        payload: {
          ...articlesAfterApiCall,
          loading: false,
        },
      });

      return article;
    } catch (error) {
      const { Articles: articlesOnError } = getState();

      dispatch({
        type: ARTICLE_SORT_ONE_FAILURE,
        payload: {
          ...articlesOnError,
          errors: [...(articlesOnError.errors || []), error],
        },
      });
    }
  };
