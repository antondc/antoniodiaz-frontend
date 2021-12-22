import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { selectPathWithoutLanguageParam } from 'Modules/Routes/selectors/selectPathWithoutLanguageParam';
import NotFound from 'Pages/NotFound';
import ServerError from 'Pages/ServerError';
import { Routes } from 'Router/routes';
import { Location } from 'Services/History';
import { FadeInOut } from '@antoniodcorrea/components';

import './CustomHeader.less';

interface Props {
  location: Location;
  pathWithoutLanguageParam: string;
}

const CustomHeader: React.FC<Props> = ({ location, pathWithoutLanguageParam }) => (
  <div className="CustomHeader">
    <div className="CustomHeader-customHeaderBackground" />
    <FadeInOut valueToUpdate={pathWithoutLanguageParam} speed="fastest" appear>
      <Switch location={{ ...location, pathname: pathWithoutLanguageParam }}>
        {/* Redirects */}

        {/* General */}

        {/* Guards */}
        <Route exact={Routes.ServerError.exact} path={Routes.ServerError.path} component={ServerError} />
        <Route exact={Routes.NotFound.exact} path={Routes.NotFound.path} component={NotFound} />
      </Switch>
    </FadeInOut>
  </div>
);

const mapStateToProps = createStructuredSelector({
  pathWithoutLanguageParam: selectPathWithoutLanguageParam,
});

export default connect(mapStateToProps, {})(CustomHeader);
