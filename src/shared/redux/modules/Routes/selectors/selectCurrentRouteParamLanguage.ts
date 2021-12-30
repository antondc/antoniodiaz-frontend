import { createSelector } from 'reselect';
import get from 'lodash/get';

import { DEFAULT_LANG_SLUG } from 'Root/src/shared/constants';
import { RouteState } from '../routes.types';
import { selectCurrentRoute } from './selectCurrentRoute';

export const selectCurrentRouteParamLanguage = createSelector(selectCurrentRoute, (currentRoute: RouteState): string =>
  get(currentRoute, 'params.lang', DEFAULT_LANG_SLUG)
);
