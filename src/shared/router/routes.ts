import omit from 'lodash/omit';

import { initialArticlesLoader } from 'Modules/Articles/articles.loader';
import { RequestParameters } from 'Root/src/server/routes/allRoutes';
import { initialArticleLoader } from '../redux/modules/Articles/articleLoader';

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
  ControlAbout: Route;
  ControlArticle: Route;
  ControlArticleCreate: Route;
  About: Route;
  Article: Route;
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
    initialDataLoadersVisitor: [initialArticlesLoader],
    initialDataLoadersSession: [initialArticlesLoader],
    layout: RouteLayout.fullPage,
  },

  About: {
    name: 'About',
    path: '/:lang([a-z]{2})?/about',
    route: '/about',
    exact: true,
    auth: false,
    initialDataLoadersVisitor: [],
    initialDataLoadersSession: [],
    layout: RouteLayout.fullPage,
  },

  Article: {
    name: 'Article',
    path: '/:lang([a-z]{2})?/blog/:articleId',
    route: '/blog',
    exact: false,
    auth: false,
    initialDataLoadersVisitor: [initialArticleLoader],
    initialDataLoadersSession: [initialArticleLoader],
    layout: RouteLayout.fullPage,
  },

  Control: {
    name: 'Control',
    path: '/:lang([a-z]{2})?/control',
    route: '/control',
    exact: true,
    auth: true,
    initialDataLoadersVisitor: [initialArticlesLoader],
    initialDataLoadersSession: [initialArticlesLoader],
    layout: RouteLayout.fullPage,
  },

  ControlAbout: {
    name: 'ControlAbout',
    path: '/:lang([a-z]{2})?/control/about',
    route: '/control/about',
    exact: true,
    auth: true,
    initialDataLoadersVisitor: [],
    initialDataLoadersSession: [],
    layout: RouteLayout.fullPage,
  },

  ControlArticle: {
    name: 'ControlArticle',
    path: '/:lang([a-z]{2})?/control/blog/:articleId',
    route: '/control/blog',
    exact: true,
    auth: true,
    initialDataLoadersVisitor: [],
    initialDataLoadersSession: [],
    layout: RouteLayout.fullPage,
  },

  ControlArticleCreate: {
    name: 'ControlArticleCreate',
    path: '/:lang([a-z]{2})?/control/blog/new',
    route: '/control/blog/new',
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
