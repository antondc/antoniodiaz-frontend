import {
  LanguagesApiResponse,
  LanguagesApiResponseItem,
  LanguagesState,
  LanguageState,
} from 'Modules/Languages/languages.types';
import HttpClient from 'Root/src/shared/services/HttpClient';
import { NotFoundError } from 'Root/src/shared/types/error/NotFoundError';
import { serializerFromArrayToByKey } from '@antoniodcorrea/utils';
import { getCurrentOrDefaultLanguage } from './utils/getCurrentOrDefaultLanguage';

export const initialLanguagesLoader = async (lang: string): Promise<{ Languages: LanguagesState }> => {
  try {
    const { data }: LanguagesApiResponse = await HttpClient.get('/languages');

    const languagesByKey: LanguagesState = {
      byKey: serializerFromArrayToByKey<LanguagesApiResponseItem, LanguageState>({
        data,
        contentPath: 'attributes',
        keyPath: 'attributes.slug',
      }),
      errors: [],
      loading: false,
    };

    const currentLanguage = getCurrentOrDefaultLanguage(languagesByKey, lang);

    const result = {
      Languages: {
        ...languagesByKey,
        currentLanguage,
        loading: false,
      },
    };

    return result;
  } catch (err) {
    throw new NotFoundError('Not Found');
  }
};
