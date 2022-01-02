import { mockProject } from './mockProject';
import { ProjectsLoadApiResponse } from './projects.types';

export const projectsMockData: ProjectsLoadApiResponse = {
  data: [
    {
      type: 'project',
      id: 1,
      attributes: {
        id: 1,
        order: 5,
        images: [
          {
            original:
              'https://antoniodiaz.me:3000/project_images_img/original/feba4583-d416-4db0-aff1-2a03ad888625.png',
            w200: 'https://antoniodiaz.me:3000/project_images_img/w200/feba4583-d416-4db0-aff1-2a03ad888625.png',
            w400: 'https://antoniodiaz.me:3000/project_images_img/w400/feba4583-d416-4db0-aff1-2a03ad888625.png',
            w1200: 'https://antoniodiaz.me:3000/project_images_img/w1200/feba4583-d416-4db0-aff1-2a03ad888625.png',
            w2400: 'https://antoniodiaz.me:3000/project_images_img/w2400/feba4583-d416-4db0-aff1-2a03ad888625.png',
          },
          {
            original:
              'https://antoniodiaz.me:3000/project_images_img/original/d2f819c5-cf00-471c-a7c1-53a4c0f15b5a.png',
            w200: 'https://antoniodiaz.me:3000/project_images_img/w200/d2f819c5-cf00-471c-a7c1-53a4c0f15b5a.png',
            w400: 'https://antoniodiaz.me:3000/project_images_img/w400/d2f819c5-cf00-471c-a7c1-53a4c0f15b5a.png',
            w1200: 'https://antoniodiaz.me:3000/project_images_img/w1200/d2f819c5-cf00-471c-a7c1-53a4c0f15b5a.png',
            w2400: 'https://antoniodiaz.me:3000/project_images_img/w2400/d2f819c5-cf00-471c-a7c1-53a4c0f15b5a.png',
          },
        ],
        translations: {
          es: {
            title: 'Linii',
            subtitle: 'Desarrollo de sitio web para el estudio de diseño Linii, con Astroshock',
            htmlContent: mockProject,
          },
          en: {
            title: 'Linii',
            subtitle: 'Web development for Linii studio, with Astroshock.',
            htmlContent: mockProject,
          },
        },
      },
    },
    {
      type: 'project',
      id: 2,
      attributes: {
        id: 2,
        order: 1,
        images: [
          {
            original:
              'https://antoniodiaz.me:3000/project_images_img/original/d2f819c5-cf00-471c-a7c1-53a4c0f15b5a.png',
            w200: 'https://antoniodiaz.me:3000/project_images_img/w200/d2f819c5-cf00-471c-a7c1-53a4c0f15b5a.png',
            w400: 'https://antoniodiaz.me:3000/project_images_img/w400/d2f819c5-cf00-471c-a7c1-53a4c0f15b5a.png',
            w1200: 'https://antoniodiaz.me:3000/project_images_img/w1200/d2f819c5-cf00-471c-a7c1-53a4c0f15b5a.png',
            w2400: 'https://antoniodiaz.me:3000/project_images_img/w2400/d2f819c5-cf00-471c-a7c1-53a4c0f15b5a.png',
          },
        ],
        translations: {
          es: {
            title: 'La ciudad en movimiento',
            subtitle: 'Edición y maqueta, publicado por Díaz & Pons, 2015, cubierta por Luis Vassallo.',
            htmlContent: mockProject,
          },
          en: {
            title: 'La ciudad en movimiento',
            subtitle: 'Editor and layouts, published with Díaz & Pons, 2015.',
            htmlContent: mockProject,
          },
        },
      },
    },

    {
      type: 'project',
      id: 3,
      attributes: {
        id: 3,
        order: 2,
        images: [
          {
            original:
              'https://antoniodiaz.me:3000/project_images_img/original/4aec89fb-3dcb-4000-88fb-066af839e42a.png',
            w200: 'https://antoniodiaz.me:3000/project_images_img/w200/4aec89fb-3dcb-4000-88fb-066af839e42a.png',
            w400: 'https://antoniodiaz.me:3000/project_images_img/w400/4aec89fb-3dcb-4000-88fb-066af839e42a.png',
            w1200: 'https://antoniodiaz.me:3000/project_images_img/w1200/4aec89fb-3dcb-4000-88fb-066af839e42a.png',
            w2400: 'https://antoniodiaz.me:3000/project_images_img/w2400/4aec89fb-3dcb-4000-88fb-066af839e42a.png',
          },
        ],
        translations: {
          en: {
            title: 'Critik: prototype for reviews website',
            subtitle: 'Book reviews social network, 2015',
            htmlContent: mockProject,
          },
          es: {
            title: 'Critik: prototipo para sitio web de crítica literaria',
            subtitle: 'Sitio web de crítica de libros, 2015',
            htmlContent: mockProject,
          },
        },
      },
    },
    {
      type: 'project',
      id: 4,
      attributes: {
        id: 4,
        order: 3,
        images: [
          {
            original:
              'https://antoniodiaz.me:3000/project_images_img/original/343d7954-bb23-4422-a79f-e58611b8b366.png',
            w200: 'https://antoniodiaz.me:3000/project_images_img/w200/343d7954-bb23-4422-a79f-e58611b8b366.png',
            w400: 'https://antoniodiaz.me:3000/project_images_img/w400/343d7954-bb23-4422-a79f-e58611b8b366.png',
            w1200: 'https://antoniodiaz.me:3000/project_images_img/w1200/343d7954-bb23-4422-a79f-e58611b8b366.png',
            w2400: 'https://antoniodiaz.me:3000/project_images_img/w2400/343d7954-bb23-4422-a79f-e58611b8b366.png',
          },
        ],
        translations: {
          es: {
            title: 'La excepción permanente',
            subtitle: 'Edición y maqueta, publicado por Díaz & Pons, 2014, cubierta por Luis Vassallo.',
            htmlContent: mockProject,
          },
          en: {
            title: 'La excepción permanente',
            subtitle: 'Edition and layout, published with Díaz & Pons, 2014, cover by Luis Vassallo.',
            htmlContent: mockProject,
          },
        },
      },
    },
    {
      type: 'project',
      id: 5,
      attributes: {
        id: 5,
        order: 4,
        images: [
          {
            original:
              'https://antoniodiaz.me:3000/project_images_img/original/2105f946-dac2-458b-ab6a-4dad6b9e0b12.png',
            w200: 'https://antoniodiaz.me:3000/project_images_img/w200/2105f946-dac2-458b-ab6a-4dad6b9e0b12.png',
            w400: 'https://antoniodiaz.me:3000/project_images_img/w400/2105f946-dac2-458b-ab6a-4dad6b9e0b12.png',
            w1200: 'https://antoniodiaz.me:3000/project_images_img/w1200/2105f946-dac2-458b-ab6a-4dad6b9e0b12.png',
            w2400: 'https://antoniodiaz.me:3000/project_images_img/w2400/2105f946-dac2-458b-ab6a-4dad6b9e0b12.png',
          },
        ],
        translations: {
          es: {
            title: 'El festín de la vivienda',
            subtitle: 'Edición y maqueta, publicado por Díaz & Pons, 2013, cubierta por Luis Vassallo.',
            htmlContent: mockProject,
          },
          en: {
            title: 'El festín de la vivienda',
            subtitle: 'Edition and layout, published with Díaz & Pons, 2013, cover by Luis Vassallo.',
            htmlContent: mockProject,
          },
        },
      },
    },

    {
      type: 'project',
      id: 6,
      attributes: {
        id: 6,
        order: 7,
        images: [
          {
            original:
              'https://antoniodiaz.me:3000/project_images_img/original/3781ea52-3d16-423c-950f-cc1c628c51c7.png',
            w200: 'https://antoniodiaz.me:3000/project_images_img/w200/3781ea52-3d16-423c-950f-cc1c628c51c7.png',
            w400: 'https://antoniodiaz.me:3000/project_images_img/w400/3781ea52-3d16-423c-950f-cc1c628c51c7.png',
            w1200: 'https://antoniodiaz.me:3000/project_images_img/w1200/3781ea52-3d16-423c-950f-cc1c628c51c7.png',
            w2400: 'https://antoniodiaz.me:3000/project_images_img/w2400/3781ea52-3d16-423c-950f-cc1c628c51c7.png',
          },
        ],
        translations: {
          es: {
            title: 'Moderar Extremistán',
            subtitle: 'Edición y maqueta, publicado por Díaz & Pons, 2014, cubierta por Luis Vassallo.',
            htmlContent: mockProject,
          },
          en: {
            title: 'Moderar Extremistán',
            subtitle: 'Edition and layout, published with Díaz & Pons, 2014, cover by Luis Vassallo.',
            htmlContent: mockProject,
          },
        },
      },
    },
    {
      type: 'project',
      id: 7,
      attributes: {
        id: 7,
        order: 8,
        images: [
          {
            original:
              'https://antoniodiaz.me:3000/project_images_img/original/4d23cf36-018c-47a4-ab9b-d157c2812449.png',
            w200: 'https://antoniodiaz.me:3000/project_images_img/w200/4d23cf36-018c-47a4-ab9b-d157c2812449.png',
            w400: 'https://antoniodiaz.me:3000/project_images_img/w400/4d23cf36-018c-47a4-ab9b-d157c2812449.png',
            w1200: 'https://antoniodiaz.me:3000/project_images_img/w1200/4d23cf36-018c-47a4-ab9b-d157c2812449.png',
            w2400: 'https://antoniodiaz.me:3000/project_images_img/w2400/4d23cf36-018c-47a4-ab9b-d157c2812449.png',
          },
        ],
        translations: {
          es: {
            title: 'La sociedad del desperdicio',
            subtitle: 'Edición y maqueta, publicado por Díaz & Pons, 2014, cubierta por Luis Vassallo.',
            htmlContent: mockProject,
          },
          en: {
            title: 'La sociedad del desperdicio',
            subtitle: 'Edition and layout, published with Díaz & Pons, 2014, cover by Luis Vassallo.',
            htmlContent: mockProject,
          },
        },
      },
    },
    {
      type: 'project',
      id: 8,
      attributes: {
        id: 8,
        order: 9,
        images: [
          {
            original:
              'https://antoniodiaz.me:3000/project_images_img/original/c29c89c0-f91c-49dd-b0c2-1b2467ca99b7.png',
            w200: 'https://antoniodiaz.me:3000/project_images_img/w200/c29c89c0-f91c-49dd-b0c2-1b2467ca99b7.png',
            w400: 'https://antoniodiaz.me:3000/project_images_img/w400/c29c89c0-f91c-49dd-b0c2-1b2467ca99b7.png',
            w1200: 'https://antoniodiaz.me:3000/project_images_img/w1200/c29c89c0-f91c-49dd-b0c2-1b2467ca99b7.png',
            w2400: 'https://antoniodiaz.me:3000/project_images_img/w2400/c29c89c0-f91c-49dd-b0c2-1b2467ca99b7.png',
          },
        ],
        translations: {
          es: {
            title: 'Energía y equidad',
            subtitle: 'Edición y diseño, publicado por Díaz & Pons, 2015.',
            htmlContent: mockProject,
          },
          en: {
            title: 'Energía y equidad',
            subtitle: 'Edition and design, published with Díaz & Pons, 2015.',
            htmlContent: mockProject,
          },
        },
      },
    },
    {
      type: 'project',
      id: 9,
      attributes: {
        id: 9,
        order: 10,
        images: [
          {
            original:
              'https://antoniodiaz.me:3000/project_images_img/original/2d8c6f44-0c20-44c9-9487-10beceabe981.png',
            w200: 'https://antoniodiaz.me:3000/project_images_img/w200/2d8c6f44-0c20-44c9-9487-10beceabe981.png',
            w400: 'https://antoniodiaz.me:3000/project_images_img/w400/2d8c6f44-0c20-44c9-9487-10beceabe981.png',
            w1200: 'https://antoniodiaz.me:3000/project_images_img/w1200/2d8c6f44-0c20-44c9-9487-10beceabe981.png',
            w2400: 'https://antoniodiaz.me:3000/project_images_img/w2400/2d8c6f44-0c20-44c9-9487-10beceabe981.png',
          },
        ],
        translations: {
          es: {
            title: 'El nuevo Leviatán',
            subtitle: 'Edición y diseño, publicado por Díaz & Pons, 2015.',
            htmlContent: mockProject,
          },
          en: {
            title: 'El nuevo Leviatán',
            subtitle: 'Edition and design, published with Díaz & Pons, 2015.',
            htmlContent: mockProject,
          },
        },
      },
    },
    {
      type: 'project',
      id: 10,
      attributes: {
        id: 10,
        order: 12,
        images: [
          {
            original:
              'https://antoniodiaz.me:3000/project_images_img/original/1eb5a27b-3b88-4b3c-8642-f15761f62414.png',
            w200: 'https://antoniodiaz.me:3000/project_images_img/w200/1eb5a27b-3b88-4b3c-8642-f15761f62414.png',
            w400: 'https://antoniodiaz.me:3000/project_images_img/w400/1eb5a27b-3b88-4b3c-8642-f15761f62414.png',
            w1200: 'https://antoniodiaz.me:3000/project_images_img/w1200/1eb5a27b-3b88-4b3c-8642-f15761f62414.png',
            w2400: 'https://antoniodiaz.me:3000/project_images_img/w2400/1eb5a27b-3b88-4b3c-8642-f15761f62414.png',
          },
        ],
        translations: {
          es: {
            title: 'Postfascismos',
            subtitle: 'Edición y maqueta, publicado por Díaz & Pons, 2014, cubierta por Luis Vassallo.',
            htmlContent: mockProject,
          },
          en: {
            title: 'Postfascismos',
            subtitle: 'Edition and layout, published with Díaz & Pons, 2014, cover by Luis Vassallo.',
            htmlContent: mockProject,
          },
        },
      },
    },
    {
      type: 'project',
      id: 11,
      attributes: {
        id: 11,
        order: 13,
        images: [
          {
            original:
              'https://antoniodiaz.me:3000/project_images_img/original/3233e674-510d-4bdc-94bc-69d9a2f97b40.png',
            w200: 'https://antoniodiaz.me:3000/project_images_img/w200/3233e674-510d-4bdc-94bc-69d9a2f97b40.png',
            w400: 'https://antoniodiaz.me:3000/project_images_img/w400/3233e674-510d-4bdc-94bc-69d9a2f97b40.png',
            w1200: 'https://antoniodiaz.me:3000/project_images_img/w1200/3233e674-510d-4bdc-94bc-69d9a2f97b40.png',
            w2400: 'https://antoniodiaz.me:3000/project_images_img/w2400/3233e674-510d-4bdc-94bc-69d9a2f97b40.png',
          },
        ],
        translations: {
          es: {
            title: 'Economía y pseudociencia',
            subtitle: 'Edición y maqueta, publicado por Díaz & Pons, 2015, cubierta por Luis Vassallo.',
            htmlContent: mockProject,
          },
          en: {
            title: 'Economía y pseudociencia',
            subtitle: 'Edition and layout, published with Díaz & Pons, 2015, cover by Luis Vassallo.',
            htmlContent: mockProject,
          },
        },
      },
    },
    {
      type: 'project',
      id: 12,
      attributes: {
        id: 12,
        order: 14,
        images: [
          {
            original:
              'https://antoniodiaz.me:3000/project_images_img/original/84222b2d-87cf-465d-b83d-028500d878eb.png',
            w200: 'https://antoniodiaz.me:3000/project_images_img/w200/84222b2d-87cf-465d-b83d-028500d878eb.png',
            w400: 'https://antoniodiaz.me:3000/project_images_img/w400/84222b2d-87cf-465d-b83d-028500d878eb.png',
            w1200: 'https://antoniodiaz.me:3000/project_images_img/w1200/84222b2d-87cf-465d-b83d-028500d878eb.png',
            w2400: 'https://antoniodiaz.me:3000/project_images_img/w2400/84222b2d-87cf-465d-b83d-028500d878eb.png',
          },
        ],
        translations: {
          es: {
            title: 'Economía, poder y política',
            subtitle: 'Edición y maqueta, publicado por Díaz & Pons, 2015, cubierta por Luis Vassallo.',
            htmlContent: mockProject,
          },
          en: {
            title: 'Economía, poder y política',
            subtitle: 'Edition and layout, published with Díaz & Pons, 2015, cover by Luis Vassallo.',
            htmlContent: mockProject,
          },
        },
      },
    },
    {
      type: 'project',
      id: 13,
      attributes: {
        id: 13,
        order: 15,
        images: [
          {
            original:
              'https://antoniodiaz.me:3000/project_images_img/original/83f8bb45-ade1-4b11-8668-06607b9d937c.png',
            w200: 'https://antoniodiaz.me:3000/project_images_img/w200/83f8bb45-ade1-4b11-8668-06607b9d937c.png',
            w400: 'https://antoniodiaz.me:3000/project_images_img/w400/83f8bb45-ade1-4b11-8668-06607b9d937c.png',
            w1200: 'https://antoniodiaz.me:3000/project_images_img/w1200/83f8bb45-ade1-4b11-8668-06607b9d937c.png',
            w2400: 'https://antoniodiaz.me:3000/project_images_img/w2400/83f8bb45-ade1-4b11-8668-06607b9d937c.png',
          },
        ],
        translations: {
          es: {
            title: 'El derecho al desempleo útil',
            subtitle: 'Editor y cubierta, publicado por Díaz & Pons, 2015',
            htmlContent: mockProject,
          },
          en: {
            title: 'The right to useful unemployment',
            subtitle: 'Editor and designer, published with Díaz & Pons, 2015.',
            htmlContent: mockProject,
          },
        },
      },
    },
    {
      type: 'project',
      id: 14,
      attributes: {
        id: 14,
        order: 16,
        images: [
          {
            original:
              'https://antoniodiaz.me:3000/project_images_img/original/76edf103-2cfe-46e2-a4a0-22480694f5d6.png',
            w200: 'https://antoniodiaz.me:3000/project_images_img/w200/76edf103-2cfe-46e2-a4a0-22480694f5d6.png',
            w400: 'https://antoniodiaz.me:3000/project_images_img/w400/76edf103-2cfe-46e2-a4a0-22480694f5d6.png',
            w1200: 'https://antoniodiaz.me:3000/project_images_img/w1200/76edf103-2cfe-46e2-a4a0-22480694f5d6.png',
            w2400: 'https://antoniodiaz.me:3000/project_images_img/w2400/76edf103-2cfe-46e2-a4a0-22480694f5d6.png',
          },
        ],
        translations: {
          es: {
            title: 'La vida frente al espejo',
            subtitle: 'Edición y maqueta, publicado por Díaz & Pons, 2015, cubierta por Luis Vassallo.',
            htmlContent: mockProject,
          },
          en: {
            title: 'La vida frente al espejo',
            subtitle: 'Edition and layout, published with Díaz & Pons, 2015, cover by Luis Vassallo.',
            htmlContent: mockProject,
          },
        },
      },
    },
    {
      type: 'project',
      id: 15,
      attributes: {
        id: 15,
        order: 1,
        images: [
          {
            original:
              'https://antoniodiaz.me:3000/project_images_img/original/d2f819c5-cf00-471c-a7c1-53a4c0f15b5a.png',
            w200: 'https://antoniodiaz.me:3000/project_images_img/w200/d2f819c5-cf00-471c-a7c1-53a4c0f15b5a.png',
            w400: 'https://antoniodiaz.me:3000/project_images_img/w400/d2f819c5-cf00-471c-a7c1-53a4c0f15b5a.png',
            w1200: 'https://antoniodiaz.me:3000/project_images_img/w1200/d2f819c5-cf00-471c-a7c1-53a4c0f15b5a.png',
            w2400: 'https://antoniodiaz.me:3000/project_images_img/w2400/d2f819c5-cf00-471c-a7c1-53a4c0f15b5a.png',
          },
        ],
        translations: {
          es: {
            title: 'El derecho al desempleo útil',
            subtitle: 'Edición y maqueta, publicado por Díaz & Pons, 2015, cubierta por Luis Vassallo.',
            htmlContent: mockProject,
          },
          en: {
            title: 'The right to useful unemployment',
            subtitle: 'Editor and designer, published with Díaz & Pons, 2015.',
            htmlContent: mockProject,
          },
        },
      },
    },
  ],
  meta: {
    totalItems: 15,
    sort: 'order',
  },
};
