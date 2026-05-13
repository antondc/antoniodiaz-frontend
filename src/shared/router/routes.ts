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
    path: '/login',
    route: '/login',
    exact: true,
    auth: false,
    initialDataLoadersVisitor: [],
    initialDataLoadersSession: [],
    layout: RouteLayout.fullPage,
  },

  Home: {
    name: 'Home',
    path: '/',
    route: '/',
    exact: true,
    auth: false,
    initialDataLoadersVisitor: [initialArticlesLoader],
    initialDataLoadersSession: [initialArticlesLoader],
    layout: RouteLayout.fullPage,
  },

  About: {
    name: 'About',
    path: '/about',
    route: '/about',
    exact: true,
    auth: false,
    initialDataLoadersVisitor: [],
    initialDataLoadersSession: [],
    layout: RouteLayout.fullPage,
  },

  Article: {
    name: 'Article',
    path: '/blog/:articleId',
    route: '/blog',
    exact: false,
    auth: false,
    initialDataLoadersVisitor: [initialArticleLoader],
    initialDataLoadersSession: [initialArticleLoader],
    layout: RouteLayout.fullPage,
  },

  Control: {
    name: 'Control',
    path: '/control',
    route: '/control',
    exact: true,
    auth: true,
    initialDataLoadersVisitor: [initialArticlesLoader],
    initialDataLoadersSession: [initialArticlesLoader],
    layout: RouteLayout.fullPage,
  },

  ControlAbout: {
    name: 'ControlAbout',
    path: '/control/about',
    route: '/control/about',
    exact: true,
    auth: true,
    initialDataLoadersVisitor: [],
    initialDataLoadersSession: [],
    layout: RouteLayout.fullPage,
  },

  ControlArticle: {
    name: 'ControlArticle',
    path: '/control/blog/:articleId',
    route: '/control/blog',
    exact: true,
    auth: true,
    initialDataLoadersVisitor: [],
    initialDataLoadersSession: [],
    layout: RouteLayout.fullPage,
  },

  ControlArticleCreate: {
    name: 'ControlArticleCreate',
    path: '/control/blog/new',
    route: '/control/blog/new',
    exact: true,
    auth: true,
    initialDataLoadersVisitor: [],
    initialDataLoadersSession: [],
    layout: RouteLayout.fullPage,
  },

  ServerError: {
    name: 'ServerError',
    path: '/500-server-error',
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
    path: '/:path*',
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
