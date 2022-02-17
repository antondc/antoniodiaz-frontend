import { AppThunk } from '../../..';
import { LANGUAGES_SWITCH_CURRENT_REQUEST, LanguagesActions } from '../languages.types';

export const languagesSetLoading =
  (loading: boolean): AppThunk<void, LanguagesActions> =>
  async (dispatch, getState): Promise<void> => {
    const { Languages: languagesBeforeRequest } = getState();

    dispatch({
      type: LANGUAGES_SWITCH_CURRENT_REQUEST,
      payload: {
        ...languagesBeforeRequest,
        loading: loading,
      },
    });
  };
