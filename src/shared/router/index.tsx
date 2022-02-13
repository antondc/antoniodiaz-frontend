import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import { selectPathWithoutLanguageParam } from 'Modules/Routes/selectors/selectPathWithoutLanguageParam';
import { pathsByLayout, RouteLayout } from 'Router/routes';
import { Location } from 'Services/History';
import FullPage from './FullPage';

interface Props {
  location: Location;
}

const Router: React.FC<Props> = ({ location }) => {
  const pathsByLayoutFullPage = pathsByLayout(RouteLayout.fullPage);
  const pathWithoutLanguageParam = useSelector(selectPathWithoutLanguageParam);

  return (
    <Switch location={{ ...location, pathname: pathWithoutLanguageParam }}>
      <Route path={pathsByLayoutFullPage} component={FullPage} />
    </Switch>
  );
};

export default Router;
