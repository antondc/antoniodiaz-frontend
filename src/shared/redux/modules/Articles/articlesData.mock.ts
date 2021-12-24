import { ArticlesLoadApiResponse } from './articles.types';

export const articlesMockData: ArticlesLoadApiResponse = {
  data: [
    {
      type: 'project',
      id: 1,
      attributes: {
        id: 1,
        order: 0,
        translations: {
          en: {
            title: '¡Fronteras!',
            htmlContent:
              '<div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque ab neque ex ipsam excepturi nemo autem, voluptatum repellendus! Voluptates deserunt ex cupiditate minus quasi ipsa blanditiis facere quas consequatur illo.</div>',
          },
          es: {
            title: '¡Fronteras!',
            htmlContent:
              '<div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque ab neque ex ipsam excepturi nemo autem, voluptatum repellendus! Voluptates deserunt ex cupiditate minus quasi ipsa blanditiis facere quas consequatur illo.</div>',
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
        translations: {
          en: {
            title: 'Article 1',
            htmlContent:
              '<div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque ab neque ex ipsam excepturi nemo autem, voluptatum repellendus! Voluptates deserunt ex cupiditate minus quasi ipsa blanditiis facere quas consequatur illo.</div>',
          },
          es: {
            title: 'Articulo 1',
            htmlContent:
              '<div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque ab neque ex ipsam excepturi nemo autem, voluptatum repellendus! Voluptates deserunt ex cupiditate minus quasi ipsa blanditiis facere quas consequatur illo.</div>',
          },
          ru: {
            title: 'Статия 1',
            htmlContent:
              '<div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque ab neque ex ipsam excepturi nemo autem, voluptatum repellendus! Voluptates deserunt ex cupiditate minus quasi ipsa blanditiis facere quas consequatur illo.</div>',
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
        translations: {
          en: {
            title: 'Article 2',
            htmlContent:
              '<div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque ab neque ex ipsam excepturi nemo autem, voluptatum repellendus! Voluptates deserunt ex cupiditate minus quasi ipsa blanditiis facere quas consequatur illo.</div>',
          },
          es: {
            title: 'Articulo 2',
            htmlContent:
              '<div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque ab neque ex ipsam excepturi nemo autem, voluptatum repellendus! Voluptates deserunt ex cupiditate minus quasi ipsa blanditiis facere quas consequatur illo.</div>',
          },
          ru: {
            title: 'Статия 2',
            htmlContent:
              '<div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque ab neque ex ipsam excepturi nemo autem, voluptatum repellendus! Voluptates deserunt ex cupiditate minus quasi ipsa blanditiis facere quas consequatur illo.</div>',
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
        translations: {
          en: {
            title: 'Article 3',
            htmlContent:
              '<div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque ab neque ex ipsam excepturi nemo autem, voluptatum repellendus! Voluptates deserunt ex cupiditate minus quasi ipsa blanditiis facere quas consequatur illo.</div>',
          },
          es: {
            title: 'Articulo 3',
            htmlContent:
              '<div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque ab neque ex ipsam excepturi nemo autem, voluptatum repellendus! Voluptates deserunt ex cupiditate minus quasi ipsa blanditiis facere quas consequatur illo.</div>',
          },
          ru: {
            title: 'Статия 3',
            htmlContent:
              '<div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque ab neque ex ipsam excepturi nemo autem, voluptatum repellendus! Voluptates deserunt ex cupiditate minus quasi ipsa blanditiis facere quas consequatur illo.</div>',
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
