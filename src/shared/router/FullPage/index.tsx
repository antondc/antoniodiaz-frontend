import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import Header from 'Components/Header';
import { selectCurrentLanguageSlug } from 'Modules/Languages/selectors/selectCurrentLanguageSlug';
import { selectPathWithoutLanguageParam } from 'Modules/Routes/selectors/selectPathWithoutLanguageParam';
import { selectSessionLoggedIn } from 'Modules/Session/selectors/selectSessionLoggedIn';
import Control from 'Pages/Control';
import Home from 'Pages/Home';
import Login from 'Pages/Login';
import NotFound from 'Pages/NotFound';
import Post from 'Pages/Post';
import Project from 'Pages/Project';
import ServerError from 'Pages/ServerError';
import What from 'Pages/What';
import When from 'Pages/When';
import Where from 'Pages/Where';
import Who from 'Pages/Who';
import { Routes } from 'Router/routes';
import { Location } from 'Services/History';
import { FadeInOut } from '@antoniodcorrea/components';

import './FullPage.less';

interface Props {
  loggedIn: boolean;
  location: Location;
  defaultCurrentSlug: string;
  pathWithoutLanguageParam: string;
}

const FullPage: React.FC<Props> = ({ loggedIn, location, defaultCurrentSlug, pathWithoutLanguageParam }) => (
  <div className="FullPage">
    <div className="FullPage-background" />
    <Header />
    <FadeInOut className="FullPage-content" valueToUpdate={pathWithoutLanguageParam} speed="fastest" appear>
      <Switch location={{ ...location, pathname: pathWithoutLanguageParam }}>
        {/* Redirects */}

        {loggedIn && <Redirect from={Routes.Login.path} to={'/' + defaultCurrentSlug + '/'} />}
        {!loggedIn && <Redirect from={Routes.Control.path} to={'/' + defaultCurrentSlug + '/login'} />}

        {/* General */}
        <Route exact={Routes.Home.exact} path={Routes.Home.path} component={Home} />
        <Route exact={Routes.Who.exact} path={Routes.Who.path} component={Who} />
        <Route exact={Routes.What.exact} path={Routes.What.path} component={What} />
        <Route exact={Routes.Project.exact} path={Routes.Project.path} component={Project} />
        <Route exact={Routes.When.exact} path={Routes.When.path} component={When} />
        <Route exact={Routes.Post.exact} path={Routes.Post.path} component={Post} />
        <Route exact={Routes.Where.exact} path={Routes.Where.path} component={Where} />
        <Route exact={Routes.Control.exact} path={Routes.Control.path} component={Control} />
        <Route exact={Routes.Login.exact} path={Routes.Login.path} component={Login} />

        {/* Guards */}
        <Route exact={Routes.ServerError.exact} path={Routes.ServerError.path} component={ServerError} />
        <Route exact={Routes.NotFound.exact} path={Routes.NotFound.path} component={NotFound} />
      </Switch>
    </FadeInOut>
  </div>
);

const mapStateToProps = createStructuredSelector({
  loggedIn: selectSessionLoggedIn,
  defaultCurrentSlug: selectCurrentLanguageSlug,
  pathWithoutLanguageParam: selectPathWithoutLanguageParam,
});

export default connect(mapStateToProps, {})(FullPage);
