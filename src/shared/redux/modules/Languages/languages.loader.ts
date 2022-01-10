import {
  LanguagesApiResponse,
  LanguagesApiResponseItem,
  LanguagesState,
  LanguageState,
} from 'Modules/Languages/languages.types';
import { serializerFromArrayToByKey } from '@antoniodcorrea/utils';
import { languagesData } from './languagesData.mock';
import { getCurrentOrDefaultLanguage } from './utils/getCurrentOrDefaultLanguage';

export const initialLanguagesLoader = async (lang: string): Promise<{ Languages: LanguagesState }> => {
  try {
    // TODO: uncomment when API is ready
    // const { data }: LanguagesApiResponse = await HttpClient.get('/languages');
    const mockPromise: Promise<LanguagesApiResponse> = new Promise((resolve) => {
      resolve(languagesData);
    });
    const { data } = await mockPromise;
    const languagesByKey: LanguagesState = {
      byKey: serializerFromArrayToByKey<LanguagesApiResponseItem, LanguageState>({
        data,
        contentPath: 'attributes',
        keyPath: 'attributes.slug',
      }),
    };

    const currentLanguage = getCurrentOrDefaultLanguage(languagesByKey, lang);

    const result = {
      Languages: {
        ...languagesByKey,
        currentLanguage,
      },
    };

    return result;
  } catch (err) {
    console.log(err);
  }
};
