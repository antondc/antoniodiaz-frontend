import { RequestParameters } from 'Root/src/server/routes/allRoutes';
import HttpClient from 'Root/src/shared/services/HttpClient';
import { serializerFromArrayToByKey } from '@antoniodcorrea/utils';
import { ArticlesApiResponse, ArticlesState, ArticleState } from './articles.types';

export const initialArticlesLoader = async ({ params }: RequestParameters): Promise<{ Articles: ArticlesState }> => {
  try {
    const { data, meta }: ArticlesApiResponse = await HttpClient.get('/articles');

    const articlesArray = data?.map((item) => item.attributes);

    const result = {
      Articles: {
        byKey: {
          ...serializerFromArrayToByKey<ArticleState, ArticleState>({
            data: articlesArray,
          }),
        },
        currentIds: data?.map((item) => item.id),
        meta,
      },
    };

    return result;
  } catch (error) {
    console.log('Not Found');
  }
};
