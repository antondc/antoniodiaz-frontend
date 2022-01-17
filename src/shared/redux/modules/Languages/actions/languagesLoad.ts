import HttpClient from 'Root/src/shared/services/HttpClient';
import { serializerFromArrayToByKey } from '@antoniodcorrea/utils';
import { AppThunk } from '../../..';
import {
  LANGUAGES_LOAD_FAILURE,
  LANGUAGES_LOAD_REQUEST,
  LANGUAGES_LOAD_SUCCESS,
  LanguagesActions,
  LanguagesApiResponse,
  LanguageState,
} from '../languages.types';

export const languagesLoad =
  (): AppThunk<Promise<LanguageState[]>, LanguagesActions> =>
  async (dispatch, getState): Promise<LanguageState[]> => {
    const { Languages: languagesBeforeRequest } = getState();
    try {
      dispatch({
        type: LANGUAGES_LOAD_REQUEST,
        payload: {
          ...languagesBeforeRequest,
          loading: true,
        },
      });

      const { data } = await HttpClient.get<void, LanguagesApiResponse>(
        `${languagesBeforeRequest.currentLanguage.slug}/languages${window.location.search}`
      );

      const languagesArray = data?.map((item) => item.attributes);

      const { Languages: languagesAfterRequest } = getState();

      dispatch({
        type: LANGUAGES_LOAD_SUCCESS,
        payload: {
          ...languagesAfterRequest,
          byKey: {
            ...serializerFromArrayToByKey<LanguageState, LanguageState>({
              data: languagesArray,
            }),
          },
          loading: false,
        },
      });

      return languagesArray;
    } catch (error) {
      const { Languages: languagesOnError } = getState();

      dispatch({
        type: LANGUAGES_LOAD_FAILURE,
        payload: {
          ...languagesOnError,
          errors: [...(languagesOnError.errors || []), error],
        },
      });
    }
  };
