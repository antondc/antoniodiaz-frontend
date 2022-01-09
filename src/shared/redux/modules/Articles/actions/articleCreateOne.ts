import HttpClient from 'Root/src/shared/services/HttpClient';
import { AppThunk } from '../../..';
import {
  ARTICLE_CREATE_ONE_FAILURE,
  ARTICLE_CREATE_ONE_REQUEST,
  ARTICLE_CREATE_ONE_SUCCEED,
  ArticleApiResponse,
  ArticlesActions,
  ArticleState,
} from '../articles.types';

type Params = {
  articleData: Partial<ArticleState>;
};

export const articleCreateOne =
  ({ articleData }: Params): AppThunk<Promise<ArticleState>, ArticlesActions> =>
  async (dispatch, getState): Promise<ArticleState> => {
    const { Articles: articlesBeforeRequest, Languages: languagesBeforeRequest } = getState();

    try {
      dispatch({
        type: ARTICLE_CREATE_ONE_REQUEST,
        payload: {
          ...articlesBeforeRequest,
          loading: true,
        },
      });

      const { data } = await HttpClient.post<void, ArticleApiResponse>(
        `${languagesBeforeRequest.currentLanguage.slug}/articles/`,
        articleData
      );

      const { Articles: articlesAfterApiCall } = getState();
      const article = data?.attributes;

      dispatch({
        type: ARTICLE_CREATE_ONE_SUCCEED,
        payload: {
          ...articlesAfterApiCall,
          byKey: {
            ...articlesAfterApiCall.byKey,
            [article?.id]: {
              ...article,
            },
          },
          loading: false,
        },
      });

      return article;
    } catch (error) {
      const { Articles: articlesOnError } = getState();

      dispatch({
        type: ARTICLE_CREATE_ONE_FAILURE,
        payload: {
          ...articlesOnError,
          errors: [...(articlesOnError.errors || []), error],
        },
      });
    }
  };
