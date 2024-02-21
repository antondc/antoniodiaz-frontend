import { Route } from 'Router/routes';
import { Location } from 'Services/History';
import { UnknownAction } from 'redux';

export const ROUTES_NEW_ROUTE_PUSH = 'ROUTES_NEW_ROUTE_PUSH';

export interface RoutesState {
  routes: RouteState[];
  history: RouteState[];
  currentRoute?: RouteState;
}

export interface ParamsState {
  lang?: string;
  articleId?: string;
}

export interface RouteState extends Route, Location {
  domain?: string;
  href: string;
  pathAndQuery: string;
  params?: ParamsState;
  queryParams?: ParamsState;
}

interface PushNewRouteAction extends UnknownAction {
  type: typeof ROUTES_NEW_ROUTE_PUSH;
  payload: RoutesState;
}

export type RoutesActions = PushNewRouteAction;
