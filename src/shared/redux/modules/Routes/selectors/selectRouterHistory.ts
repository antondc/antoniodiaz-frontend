import { createSelector } from 'reselect';

import { RoutesState, RouteState } from './../routes.types';
import { selectRoutes } from './selectRoutes';

export const selectRouterHistory = createSelector(
  selectRoutes,
  (routes: RoutesState): Array<RouteState> => routes.history
);
