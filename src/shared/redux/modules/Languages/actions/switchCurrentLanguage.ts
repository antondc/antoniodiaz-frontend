import history from 'Services/History';
import { AppThunk } from '../../..';
import {
  LANGUAGES_SWITCH_CURRENT_REQUEST,
  LANGUAGES_SWITCH_CURRENT_SUCCESS,
  LanguagesActions,
} from '../languages.types';

export const switchCurrentLanguage =
  (slug: string, link: string): AppThunk<void, LanguagesActions> =>
  (dispatch, getState): void => {
    const { Languages } = getState();

    if (Languages.currentLanguage.slug !== slug) {
      const newCurrentLanguage = Languages.byKey[slug];

      dispatch({
        type: LANGUAGES_SWITCH_CURRENT_REQUEST,
        payload: {
          ...Languages,
          currentLanguage: {
            ...Languages.currentLanguage,
            loading: true,
          },
        },
      });

      // Timeout due to language loading faster than page reload
      setTimeout(() => {
        dispatch({
          type: LANGUAGES_SWITCH_CURRENT_SUCCESS,
          payload: {
            ...Languages,
            currentLanguage: newCurrentLanguage,
          },
        });

        history.push(link);
      }, 150);
    }
  };
