import HttpClient from 'Root/src/shared/services/HttpClient';
import { AppThunk } from '../../..';
import {
  GlossaryState,
  LANGUAGES_UPDATE_FAILURE,
  LANGUAGES_UPDATE_REQUEST,
  LANGUAGES_UPDATE_SUCCESS,
  LanguagesActions,
  LanguagesState,
} from '../languages.types';

type Params = {
  languageId: number;
  glossaryData: Partial<GlossaryState>;
};

export const languageUpdateOne =
  ({ languageId, glossaryData }: Params): AppThunk<Promise<LanguagesState>, LanguagesActions> =>
  async (dispatch, getState): Promise<LanguagesState> => {
    const { Languages: languagesBeforeRequest } = getState();
    const currentLanguageSlug = languagesBeforeRequest.currentLanguage.slug;

    try {
      dispatch({
        type: LANGUAGES_UPDATE_REQUEST,
        payload: {
          ...languagesBeforeRequest,
          byKey: {
            ...languagesBeforeRequest.byKey,
            [languageId]: {
              ...languagesBeforeRequest.byKey[languageId],
              glossary: {
                ...languagesBeforeRequest.byKey[languageId]?.glossary,
                ...glossaryData,
              },
            },
          },
          currentLanguage: {
            ...languagesBeforeRequest.currentLanguage,
            glossary: {
              ...languagesBeforeRequest.currentLanguage.glossary,
              ...glossaryData,
            },
          },
          loading: true,
        },
      });

      const { data } = await HttpClient.put<void, { data: { attributes: LanguagesState } }>(
        `${languagesBeforeRequest.currentLanguage.slug}/languages/${currentLanguageSlug}`,
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
          },
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
