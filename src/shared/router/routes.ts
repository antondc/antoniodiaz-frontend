import omit from 'lodash/omit';

import { initialArticlesLoader } from 'Modules/Articles/articles.loader';
import { RequestParameters } from 'Root/src/server/routes/allRoutes';

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
  ControlWhen: Route;
  ControlWho: Route;
  ControlArticle: Route;
  ControlArticleCreate: Route;
  Who: Route;
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
  ControlWho: {
    name: 'ControlWho',
    path: '/:lang([a-z]{2})?/control/who',
    route: '/control/who',
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
