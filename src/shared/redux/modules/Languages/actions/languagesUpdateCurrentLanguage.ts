import HttpClient from 'Root/src/shared/services/HttpClient';
import { AppThunk } from '../../..';
import {
  GlossaryState,
  LANGUAGES_UPDATE_FAILURE,
  LANGUAGES_UPDATE_REQUEST,
  LANGUAGES_UPDATE_SUCCESS,
  LanguagesActions,
  LanguageState,
} from '../languages.types';

export const languagesUpdateCurrentLanguage =
  (glossaryData: Partial<GlossaryState>): AppThunk<Promise<LanguageState>, LanguagesActions> =>
  async (dispatch, getState): Promise<LanguageState> => {
    const { Languages: languagesBeforeRequest } = getState();

    try {
      dispatch({
        type: LANGUAGES_UPDATE_REQUEST,
        payload: {
          ...languagesBeforeRequest,
          loading: true,
        },
      });

      const { data } = await HttpClient.put<void, { data: { attributes: LanguageState } }>(
        `${languagesBeforeRequest.currentLanguage.slug}/languages/${languagesBeforeRequest.currentLanguage.slug}`,
        glossaryData
      );

      const { Languages: languagesAfterApiCall } = getState();

      dispatch({
        type: LANGUAGES_UPDATE_SUCCESS,
        payload: {
          ...languagesBeforeRequest,
          ...languagesAfterApiCall,
          byKey: {
            ...languagesAfterApiCall.byKey,
            [data.attributes.id]: data.attributes,
          },
          currentLanguage: data.attributes,
          loading: false,
        },
      });

      return data.attributes;
    } catch (error) {
      const { Languages: languagesOnError } = getState();

      dispatch({
        type: LANGUAGES_UPDATE_FAILURE,
        payload: {
          ...languagesOnError,
          errors: [...(languagesOnError.errors || []), error],
        },
      });
    }
  };
