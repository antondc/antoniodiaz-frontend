import { LanguagesApiResponse } from './languages.types';

export const languagesData: LanguagesApiResponse = {
  links: {
    self: 'https://dev.antoniodiaz.me:3000/api/v1/languages',
  },
  data: [
    {
      type: 'languages',
      attributes: {
        id: 1,
        order: 1,
        name: 'English',
        isDefault: true,
        slug: 'en',
        glossary: {
          who: 'Who',
          whoHtmlText:
            "<p>I am a web developer currently focused on Javascript, both frontend and backend. </p><p>I am interested in the connections between design and technology; in fact I spent several years as project manager and curator in contemporary art related projects. </p><p></p><p>In 2012, I founded a publishing house, <a href='https://diazpons.antoniodiaz.me'>Díaz and Pons</a>, which I run for five years, and where we edited and designed good essays on contemporary society and culture. </p><p>Having spent most of my career writing and editing texts as well as designing layouts, it was natural for me to switch from texts to code. But it wasn&#x27;t until 2009 when, collaborating with Medialab-Prado, I realized about the connections between programming and design. Of course it took years, but finally, after some web projects, like Critik, in 2016 I switched careers definitely, working as web developer since then. </p><p>Currently I&#x27;m mainly interested in React and Node with TypeScript, stack which is the base for this site.</p>",
          what: 'What',
          whatSubtitle: "Things I've been involved in",
          when: 'When',
          post: 'This is a post',
          where: 'Where',
          serverError: 'Oops, something went wrong :(',
          control: 'Control',
          notFound: 'Not found',
        },
        links: {
          self: 'https://dev.antoniodiaz.me:3000/api/v1/languages/en',
        },
      },
    },
    {
      type: 'languages',
      attributes: {
        id: 2,
        order: 2,
        name: 'Español',
        isDefault: false,
        slug: 'es',
        glossary: {
          who: 'Quien',
          whoHtmlText:
            '<p>Soy un desarrollador web centrado en Javascript, tanto frontend como backend. </p><p>Siempre he estado interesado en los vínculos entre diseño y tecnología; de hecho, dediqué muchos años de mi carrera a coordinación y comisariado de proyectos relacionados con el arte contemporáneo. </p><p>En 2012 fundé una editorial, Díaz y Pons, que dirigí durante cinco años, y donde editamos una veintena de ensayos sobre sociedad y cultura contemporáneas. Habiendo pasado gran parte de mi carrera escribiendo y editando textos, así como diseñando maquetas, veía como un proceso natural el salto del texto al código. Pero no fue hasta 2009 cuando, en una colaboración con Medialab-Prado, descubrí cómo de imbricados están programación y diseño. </p><p>Fue un proceso gradual, por supuesto, pero finalmente, después de un tiempo desarrollando algunos proyectos web, como Critik, en 2016 dirigí definitivamente mi carrera hacia la programación, trabajando como desarrollador web desde entonces. </p><p>Actualmente estoy interesado sobre todo en React y NodeJS with TypeScript, stack con el que está realizado este sitio.</p>',
          what: 'Qué',
          whatSubtitle: 'Cosas en las que he estado metido',
          when: 'Cuándo',
          where: 'Dónde',
          post: 'Esto es un post',
          serverError: 'Oops, algo ha fallado :(',
          control: 'Control',
          notFound: 'Nada por aquí…',
        },
        links: {
          self: 'https://dev.antoniodiaz.me:3000/api/v1/languages/es',
        },
      },
    },
    // {
    //   type: 'languages',
    //   attributes: {
    //     id: 3,
    //     order: 3,
    //     name: 'Руский',
    //     isDefault: true,
    //     slug: 'ru',
    //     glossary: {
    //       who: 'Кто',
    //       whoHtmlText: '',
    //       what: 'Что',
    //       whatSubtitle: 'Вещи в которые я был вовлечен ',
    //       when: 'Когда',
    //       where: 'Где',
    //       post: 'Это пост',
    //       serverError: 'Опа!, всё плохо :(',
    //       control: 'Контроль',
    //       notFound: 'Не найден',
    //     },
    //     links: {
    //       self: 'https://dev.antoniodiaz.me:3000/api/v1/languages/en',
    //     },
    //   },
    // },
  ],
};
