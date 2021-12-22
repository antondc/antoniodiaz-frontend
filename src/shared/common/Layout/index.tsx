import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectLanguageLoading } from 'Modules/Languages/selectors/selectLanguageLoading';
import { pushNewRoute } from 'Modules/Routes/actions/pushNewRoute';
import { RouteState } from 'Modules/Routes/routes.types';
import { selectCurrentPathAndQuery } from 'Modules/Routes/selectors/selectCurrentPathAndQuery';
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

import './Layout.less';

interface Props {
  location: Location;
}

const Layout: React.FC<Props> = ({ location }) => {
  const dispatch = useDispatch();
  const session = useSelector(selectSession);
  const locationPathAndSearchQuery = `${location.pathname}${location.search}`;
  const currentPathAndQuery = useSelector(selectCurrentPathAndQuery);
  const languageLoading = useSelector(selectLanguageLoading);
  const uiScreenLocked = useSelector(selectUiScreenLocked);
  const uiScreenMobileLocked = useSelector(selectUiScreenMobileLocked);
  const renderLoader = !!languageLoading; /* || otherVariables */

  const addBodyClasses = () => {
    document.body.classList.remove('preload'); // Preventing animations on load
    document.body.classList.add('isLoaded'); // Showing page on load
  };

  const testKeyDown = (e: KeyboardEvent): void => {
    if (e.key === ESCAPE_KEY_CODE) dispatch(uiResetModalsState());
  };

  useEffect(() => {
    window.addEventListener('load', addBodyClasses);
    document.addEventListener('keydown', testKeyDown);

    return () => {
      window.removeEventListener('load', addBodyClasses);
      document.removeEventListener('keydown', testKeyDown);
    };
  }, []);

  useEffect(() => {
    if (uiScreenLocked) {
      document.body.classList.add('scrollLocked');
    } else {
      document.body.classList.remove('scrollLocked');
    }
  }, [uiScreenLocked]);

  useEffect(() => {
    if (uiScreenMobileLocked) {
      document.body.classList.add('scrollMobileLocked');
    } else {
      document.body.classList.remove('scrollMobileLocked');
    }
  }, [uiScreenMobileLocked]);

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

  return <LayoutUi renderLoader={renderLoader} location={location} />;
};

export default Layout;
