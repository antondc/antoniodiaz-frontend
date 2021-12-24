import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';
import { ArticlesLoadApiResponse, ArticlesState, ArticleState } from './articles.types';
import { articlesMockData } from './articlesData.mock';

export const initialArticlesLoader = async (): Promise<{ Articles: ArticlesState }> => {
  // const { data }: ArticlesLoadApiResponse = await HttpClient.get(`when/articles${window.location.search}`);

  const mockPromise: Promise<ArticlesLoadApiResponse> = new Promise((resolve) => {
    resolve(articlesMockData);
  });
  const { data } = await mockPromise;
  const articlesArray = data?.map((item) => item.attributes);

  const result = {
    Articles: {
      byKey: {
        ...serializerFromArrayToByKey<ArticleState, ArticleState>({
          data: articlesArray,
        }),
      },
    },
  };

  return result;
};
