import history from 'Services/History';
import { AppThunk } from '../../..';
import {
  LANGUAGES_SWITCH_CURRENT_REQUEST,
  LANGUAGES_SWITCH_CURRENT_SUCCESS,
  LanguagesActions,
} from '../languages.types';

export const switchCurrentLanguage =
  (slug: string, link: string): AppThunk<void, LanguagesActions> =>
  async (dispatch, getState): Promise<void> => {
    const { Languages: languagesBeforeRequest } = getState();

    if (languagesBeforeRequest.currentLanguage.slug === slug) return;

    const newCurrentLanguage = languagesBeforeRequest.byKey[slug];

    dispatch({
      type: LANGUAGES_SWITCH_CURRENT_REQUEST,
      payload: {
        ...languagesBeforeRequest,
        loading: true,
      },
    });

    history.push(link);

    const { Languages: languagesAfterReponse } = getState();

    dispatch({
      type: LANGUAGES_SWITCH_CURRENT_SUCCESS,
      payload: {
        ...languagesAfterReponse,
        currentLanguage: newCurrentLanguage,
        loading: false,
      },
    });
  };
