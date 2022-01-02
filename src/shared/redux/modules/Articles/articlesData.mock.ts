import { ArticlesLoadApiResponse } from './articles.types';
import { mockArticle } from './mockArticle';

export const articlesMockData: ArticlesLoadApiResponse = {
  data: [
    {
      type: 'project',
      id: 1,
      attributes: {
        id: 1,
        order: 0,
        date: '1621092353',
        translations: {
          en: {
            title: '¡Fronteras!',
            htmlContent: mockArticle,
          },
          es: {
            title: '¡Fronteras!',
            htmlContent: mockArticle,
          },
        },
      },
    },
    {
      type: 'project',
      id: 1,
      attributes: {
        id: 1,
        order: 0,
        date: '1621092353',
        translations: {
          en: {
            title: 'Article 1',
            htmlContent: mockArticle,
          },
          es: {
            title: 'Articulo 1',
            htmlContent: mockArticle,
          },
        },
      },
    },
    {
      type: 'project',
      id: 2,
      attributes: {
        id: 2,
        order: 0,
        date: '1621092353',
        translations: {
          en: {
            title: 'Article 2',
            htmlContent: mockArticle,
          },
          es: {
            title: 'Articulo 2',
            htmlContent: mockArticle,
          },
        },
      },
    },
    {
      type: 'project',
      id: 3,
      attributes: {
        id: 3,
        order: 0,
        date: '1621092353',
        translations: {
          en: {
            title: 'Article 3',
            htmlContent: mockArticle,
          },
          es: {
            title: 'Articulo 3',
            htmlContent: mockArticle,
          },
        },
      },
    },
  ],
  meta: {
    totalItems: 17,
    sort: 'order',
  },
};
