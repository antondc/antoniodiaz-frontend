import { createSelector } from 'reselect';

import { RoutesState } from './../routes.types';
import { selectRoutes } from './selectRoutes';

export const selectCurrentRouteName = createSelector(
  selectRoutes,
  (routes: RoutesState): string => routes.currentRoute?.name
);
