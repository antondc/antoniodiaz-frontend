import { RequestParameters } from 'Root/src/server/routes/allRoutes';
import HttpClient from 'Root/src/shared/services/HttpClient';
import { ArticleApiResponse, ArticlesState } from './articles.types';
import { getIdFromSlug } from '@antoniodcorrea/utils';

export const initialArticleLoader = async ({ params }: RequestParameters): Promise<{ Articles: ArticlesState }> => {
  try {
    const lang = params?.lang ? `/${params?.lang}` : '';

    const articleId = getIdFromSlug(String(params.articleId));
    if (!articleId) return;

    const { data: articleData, meta }: ArticleApiResponse = await HttpClient.get(`${lang}/articles/${articleId}`);

    const result = {
      Articles: {
        byKey: {
          [articleData?.attributes?.id]: {
            ...articleData.attributes,
          },
        },
        currentIds: [articleData?.attributes?.id],
        meta,
      },
    };

    return result;
  } catch (error) {
    console.log('Not Found');
  }
};
