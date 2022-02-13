import HttpClient from 'Root/src/shared/services/HttpClient';
import { mockAsync, serializerFromArrayToByKey } from '@antoniodcorrea/utils';
import { AppThunk } from '../../..';
import {
  ARTICLES_LOAD_FAILURE,
  ARTICLES_LOAD_REQUEST,
  ARTICLES_LOAD_SUCCEED,
  ArticlesActions,
  ArticlesApiResponse,
  ArticleState,
} from '../articles.types';

export const articlesLoad =
  (): AppThunk<Promise<ArticleState[]>, ArticlesActions> =>
  async (dispatch, getState): Promise<ArticleState[]> => {
    const { Articles: articlesBeforeRequest, Languages: languagesBeforeRequest } = getState();
    try {
      dispatch({
        type: ARTICLES_LOAD_REQUEST,
        payload: {
          ...articlesBeforeRequest,
          loading: true,
        },
      });

      const { meta, data } = await HttpClient.get<void, ArticlesApiResponse>(
        `${languagesBeforeRequest.currentLanguage.slug}/articles${window.location.search}`
      );

      const articlesArray = data?.map((item) => item.attributes);

      const { Articles: articlesAfterApiCall, Languages: languagesAfterRequest } = getState();

      // Filter out articles not matching current language
      const articlesFilteredByCurrentLanguage = Object.values(articlesAfterApiCall.byKey).filter(
        (item) => item.language === languagesAfterRequest.currentLanguage.slug
      );

      dispatch({
        type: ARTICLES_LOAD_SUCCEED,
        payload: {
          ...articlesAfterApiCall,
          byKey: {
            ...serializerFromArrayToByKey<ArticleState, ArticleState>({
              data: articlesFilteredByCurrentLanguage,
            }),
            ...serializerFromArrayToByKey<ArticleState, ArticleState>({
              data: articlesArray,
            }),
          },
          currentIds: data?.map((item) => item.id),
          meta,
          loading: false,
        },
      });

      return articlesArray;
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
