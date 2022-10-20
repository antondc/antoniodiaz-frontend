import { RequestParameters } from 'Root/src/server/routes/allRoutes';
import HttpClient from 'Root/src/shared/services/HttpClient';
import { ArticleApiResponse, ArticlesState } from './articles.types';

export const initialArticleLoader = async ({ params }: RequestParameters): Promise<{ Articles: ArticlesState }> => {
  try {
    const lang = params?.lang ? `/${params?.lang}` : '';

    const { data: articleData, meta }: ArticleApiResponse = await HttpClient.get(
      `${lang}/articles/${params.articleId}`
    );

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
