import omit from 'lodash/omit';

import { initialProjectsLoader } from 'Modules/Projects/projects.loader';
import { RequestParameters } from 'Root/src/server/routes/allRoutes';
import { initialArticlesLoader } from '../redux/modules/Articles/articles.loader';

export enum RouteLayout {
  fullPage,
}

export interface Route {
  name: string;
  path: string;
  route?: string;
  exact: boolean;
  auth: boolean;
  header?: boolean;
  initialDataLoadersVisitor?: Array<(params: RequestParameters) => void>;
  initialDataLoadersSession?: Array<(params: RequestParameters) => void>;
  layout?: RouteLayout;
}

interface RoutesInterface {
  Home: Route;
  Login: Route;
  Control: Route;
  ControlWhat: Route;
  ControlProject: Route;
  ControlProjectCreate: Route;
  ControlWhen: Route;
  ControlArticle: Route;
  ControlArticleCreate: Route;
  Who: Route;
  What: Route;
  Project: Route;
  When: Route;
  Article: Route;
  Where: Route;
  ServerError: Route;
  NotFound: Route;
}

export const Routes: RoutesInterface = {
  Login: {
    name: 'Login',
    path: '/:lang([a-z]{2})?/login',
    route: '/login',
    exact: true,
    auth: false,
    initialDataLoadersVisitor: [],
    initialDataLoadersSession: [],
    layout: RouteLayout.fullPage,
  },
  Home: {
    name: 'Home',
    path: '/:lang([a-z]{2})?',
    route: '/',
    exact: true,
    auth: false,
    initialDataLoadersVisitor: [],
    initialDataLoadersSession: [],
    layout: RouteLayout.fullPage,
  },
  Who: {
    name: 'Who',
    path: '/:lang([a-z]{2})?/who',
    route: '/who',
    exact: true,
    auth: false,
    initialDataLoadersVisitor: [],
    initialDataLoadersSession: [],
    layout: RouteLayout.fullPage,
  },
  What: {
    name: 'What',
    path: '/:lang([a-z]{2})?/what',
    route: '/what',
    exact: true,
    auth: false,
    initialDataLoadersVisitor: [initialProjectsLoader],
    initialDataLoadersSession: [initialProjectsLoader],
    layout: RouteLayout.fullPage,
  },
  Project: {
    name: 'Project',
    path: '/:lang([a-z]{2})?/what/:projectId',
    route: '/what',
    exact: false,
    auth: false,
    initialDataLoadersVisitor: [initialProjectsLoader],
    initialDataLoadersSession: [initialProjectsLoader],
    layout: RouteLayout.fullPage,
  },
  When: {
    name: 'When',
    path: '/:lang([a-z]{2})?/when',
    route: '/when',
    exact: true,
    auth: false,
    initialDataLoadersVisitor: [initialArticlesLoader],
    initialDataLoadersSession: [initialArticlesLoader],
    layout: RouteLayout.fullPage,
  },
  Article: {
    name: 'Article',
    path: '/:lang([a-z]{2})?/when/:articleId',
    route: '/when',
    exact: false,
    auth: false,
    initialDataLoadersVisitor: [initialArticlesLoader],
    initialDataLoadersSession: [initialArticlesLoader],
    layout: RouteLayout.fullPage,
  },
  Where: {
    name: 'Where',
    path: '/:lang([a-z]{2})?/where',
    route: '/where',
    exact: true,
    auth: false,
    initialDataLoadersVisitor: [],
    initialDataLoadersSession: [],
    layout: RouteLayout.fullPage,
  },
  Control: {
    name: 'Control',
    path: '/:lang([a-z]{2})?/control',
    route: '/control',
    exact: true,
    auth: true,
    initialDataLoadersVisitor: [],
    initialDataLoadersSession: [],
    layout: RouteLayout.fullPage,
  },
  ControlWhat: {
    name: 'ControlWhat',
    path: '/:lang([a-z]{2})?/control/what',
    route: '/control/what',
    exact: true,
    auth: true,
    initialDataLoadersVisitor: [],
    initialDataLoadersSession: [],
    layout: RouteLayout.fullPage,
  },
  ControlProject: {
    name: 'ControlProject',
    path: '/:lang([a-z]{2})?/control/what/:projectId',
    route: '/control/what',
    exact: true,
    auth: true,
    initialDataLoadersVisitor: [],
    initialDataLoadersSession: [],
    layout: RouteLayout.fullPage,
  },
  ControlProjectCreate: {
    name: 'ControlProjectCreate',
    path: '/:lang([a-z]{2})?/control/what/new',
    route: '/control/what/new',
    exact: true,
    auth: true,
    initialDataLoadersVisitor: [],
    initialDataLoadersSession: [],
    layout: RouteLayout.fullPage,
  },
  ControlWhen: {
    name: 'ControlWhen',
    path: '/:lang([a-z]{2})?/control/when',
    route: '/control/when',
    exact: true,
    auth: true,
    initialDataLoadersVisitor: [],
    initialDataLoadersSession: [],
    layout: RouteLayout.fullPage,
  },
  ControlArticle: {
    name: 'ControlArticle',
    path: '/:lang([a-z]{2})?/control/when/:articleId',
    route: '/control/when',
    exact: true,
    auth: true,
    initialDataLoadersVisitor: [],
    initialDataLoadersSession: [],
    layout: RouteLayout.fullPage,
  },
  ControlArticleCreate: {
    name: 'ControlArticleCreate',
    path: '/:lang([a-z]{2})?/control/when/new',
    route: '/control/when/new',
    exact: true,
    auth: true,
    initialDataLoadersVisitor: [],
    initialDataLoadersSession: [],
    layout: RouteLayout.fullPage,
  },
  ServerError: {
    name: 'ServerError',
    path: '/:lang([a-z]{2})?/500-server-error',
    route: '/500-server-error',
    exact: true,
    auth: false,
    header: false,
    initialDataLoadersVisitor: [],
    initialDataLoadersSession: [],
    layout: RouteLayout.fullPage,
  },

  NotFound: {
    name: 'NotFound',
    path: '/:lang([a-z]{2})?/:path*',
    route: '/not-found',
    exact: false,
    auth: false,
    header: false,
    initialDataLoadersVisitor: [],
    initialDataLoadersSession: [],
    layout: RouteLayout.fullPage,
  },
};

// Export routes without specific values values
export const routesWithoutOmmitedValues: Partial<RoutesInterface> = Object.entries(Routes).reduce(
  (acc, [key, value]) => {
    const valuesToRemove = ['initialDataLoadersVisitor', 'initialDataLoadersSession' /* etc. */];
    const routeWithoutOmmitedValues = omit(value, valuesToRemove);

    return { ...acc, [key]: routeWithoutOmmitedValues };
  },
  {}
);

export const pathsByLayout = (routeLayout: RouteLayout): string[] =>
  Object.values(Routes)
    .filter((value) => value.layout === routeLayout)
    .map((item) => item.path);

export const routesPathsList: string[] = Object.values(Routes).map((item) => item.path);

export const routesList: Route[] = Object.values(Routes);
