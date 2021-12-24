import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';
import { AppThunk } from '../../..';
import {
  ARTICLES_LOAD_FAILURE,
  ARTICLES_LOAD_REQUEST,
  ARTICLES_LOAD_SUCCEED,
  ArticlesActions,
  ArticlesLoadApiResponse,
  ArticleState,
} from '../articles.types';
import { articlesMockData } from '../articlesData.mock';

export const articlesLoad =
  (): AppThunk<Promise<ArticleState[]>, ArticlesActions> =>
  async (dispatch, getState): Promise<ArticleState[]> => {
    const { Articles: articlesBeforeRequest } = getState();

    try {
      dispatch({
        type: ARTICLES_LOAD_REQUEST,
        payload: {
          ...articlesBeforeRequest,
          loading: true,
        },
      });

      // TODO: uncomment when API is ready
      // const { meta, data } = await HttpClient.get<void, ArticlesLoadApiResponse>(`/articles${window.location.search}`);
      const mockPromise: Promise<ArticlesLoadApiResponse> = new Promise((resolve) => {
        resolve(articlesMockData);
      });
      const { meta, data } = await mockPromise;

      const articlesArray = data?.map((item) => item.attributes);

      const { Articles: articlesAfterApiCall } = getState();

      dispatch({
        type: ARTICLES_LOAD_SUCCEED,
        payload: {
          ...articlesAfterApiCall,
          byKey: {
            ...articlesAfterApiCall.byKey,
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
