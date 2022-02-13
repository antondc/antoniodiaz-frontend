import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import { selectCurrentRoute } from 'Modules/Routes/selectors/selectCurrentRoute';
import { selectPathWithoutLanguageParam } from 'Modules/Routes/selectors/selectPathWithoutLanguageParam';
import { pathsByLayout, RouteLayout } from 'Router/routes';
import { Location } from 'Services/History';
import { FadeInOut } from '@antoniodcorrea/components';
import FullPage from './FullPage';

interface Props {
  location: Location;
}

const Router: React.FC<Props> = ({ location }) => {
  const pathsByLayoutFullPage = pathsByLayout(RouteLayout.fullPage);
  const currentRoute = useSelector(selectCurrentRoute);
  const currentLayout = currentRoute?.layout;
  const pathWithoutLanguageParam = useSelector(selectPathWithoutLanguageParam);

  return (
    <FadeInOut valueToUpdate={currentLayout} speed="fastest" appear>
      <Switch location={{ ...location, pathname: pathWithoutLanguageParam }}>
        <Route path={pathsByLayoutFullPage} component={FullPage} />
      </Switch>
    </FadeInOut>
  );
};

export default Router;
