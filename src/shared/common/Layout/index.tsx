import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { pushNewRoute } from 'Modules/Routes/actions/pushNewRoute';
import { RouteState } from 'Modules/Routes/routes.types';
import { selectCurrentPathAndQuery } from 'Modules/Routes/selectors/selectCurrentPathAndQuery';
import { selectCurrentRoute } from 'Modules/Routes/selectors/selectCurrentRoute';
import { selectCurrentRouteName } from 'Modules/Routes/selectors/selectCurrentRouteName';
import { selectSession } from 'Modules/Session/selectors/selectSession';
import { uiResetModalsState } from 'Modules/Ui/actions/uiResetModalsState';
import { selectUiScreenLocked } from 'Modules/Ui/selectors/selectUiScreenLocked';
import { selectUiScreenMobileLocked } from 'Modules/Ui/selectors/selectUiScreenMobileLocked';
import { userLoad } from 'Modules/Users/actions/userLoad';
import { routesList, routesWithoutOmmitedValues } from 'Router/routes';
import { Location } from 'Services/History';
import enhanceRouteWithParams from 'Tools/utils/url/enhanceRouteWithParams';
import findActiveRouteKey from 'Tools/utils/url/findActiveRouteKey';
import { ESCAPE_KEY_CODE } from './constants';
import { Layout as LayoutUi } from './Layout';
import { useShowPageOnLoad } from '@antoniodcorrea/components';

import './Layout.less';

interface Props {
  location: Location;
}

const Layout: React.FC<Props> = ({ location }) => {
  const dispatch = useDispatch();
  const session = useSelector(selectSession);
  const locationPathAndSearchQuery = `${location.pathname}${location.search}`;
  const currentPathAndQuery = useSelector(selectCurrentPathAndQuery);
  const uiScreenLocked = useSelector(selectUiScreenLocked);
  const uiScreenMobileLocked = useSelector(selectUiScreenMobileLocked);
  const renderLoader = false; /* || otherVariables */
  const routeName = useSelector(selectCurrentRouteName);
  const currentRoute = useSelector(selectCurrentRoute);
  const control = currentRoute.auth;

  useShowPageOnLoad();

  const testKeyDown = (e: KeyboardEvent): void => {
    if (e.key === ESCAPE_KEY_CODE) dispatch(uiResetModalsState());
  };

  useEffect(() => {
    window.addEventListener('keydown', testKeyDown);

    return () => {
      window.removeEventListener('keydown', testKeyDown);
    };
  }, []);

  useEffect(() => {
    if (uiScreenLocked || renderLoader) {
      document.body.classList.add('scrollLocked');
    } else {
      document.body.classList.remove('scrollLocked');
    }
  }, [uiScreenLocked, renderLoader]);

  useEffect(() => {
    if (uiScreenMobileLocked || renderLoader) {
      document.body.classList.add('scrollMobileLocked');
    } else {
      document.body.classList.remove('scrollMobileLocked');
    }
  }, [uiScreenMobileLocked, renderLoader]);

  useEffect(() => {
    if (currentPathAndQuery === locationPathAndSearchQuery) return; // For first render: if the route coming from server is the same as the one rendered by client, return

    const activeRouteKey = findActiveRouteKey({
      urlPath: location.pathname,
      routes: routesList,
    });

    const enhancedRoute: RouteState = {
      ...enhanceRouteWithParams({
        route: routesWithoutOmmitedValues[activeRouteKey],
        location,
      }),
      domain: `${window.location.protocol}//${window.location.hostname}`,
      href: window.location.href,
      pathAndQuery: `${window.location.pathname}${window.location.search}`,
    };

    dispatch(pushNewRoute(enhancedRoute));
  }, [locationPathAndSearchQuery]); // Update by props, not by state, as this useEffect aims to update the state

  useEffect(() => {
    if (!session?.id) return;
    dispatch(userLoad(session?.id));
  }, [session?.id]);

  return <LayoutUi renderLoader={renderLoader} location={location} routeName={routeName} control={control} />;
};

export default Layout;
