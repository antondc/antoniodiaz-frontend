import React from 'react';
import Helmet from 'react-helmet';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { Route, Switch } from 'react-router-dom';

import Header from 'Components/Header';
import { selectCurrentGlossary } from 'Modules/Languages/selectors/selectCurrentGlossary';
import { selectCurrentLanguageSlug } from 'Modules/Languages/selectors/selectCurrentLanguageSlug';
import { selectLanguageLoading } from 'Modules/Languages/selectors/selectLanguageLoading';
import { selectCurrentRoute } from 'Modules/Routes/selectors/selectCurrentRoute';
import { selectPathWithoutLanguageParam } from 'Modules/Routes/selectors/selectPathWithoutLanguageParam';
import { selectSessionLoggedIn } from 'Modules/Session/selectors/selectSessionLoggedIn';
import { selectUiMounted } from 'Modules/Ui/selectors/selectUiMounted';
import Article from 'Pages/Article';
import Control from 'Pages/Control';
import ControlArticle from 'Pages/ControlArticle';
import ControlArticleCreate from 'Pages/ControlArticleCreate';
import ControlProject from 'Pages/ControlProject';
import ControlProjectCreate from 'Pages/ControlProjectCreate';
import ControlWhat from 'Pages/ControlWhat';
import ControlWhen from 'Pages/ControlWhen';
import ControlWho from 'Pages/ControlWho';
import Home from 'Pages/Home';
import Login from 'Pages/Login';
import NotFound from 'Pages/NotFound';
import Project from 'Pages/Project';
import ServerError from 'Pages/ServerError';
import What from 'Pages/What';
import When from 'Pages/When';
import Where from 'Pages/Where';
import Who from 'Pages/Who';
import { Routes } from 'Router/routes';
import { Location } from 'Services/History';
import { Fade, FadeInOut } from '@antoniodcorrea/components';

import './FullPage.less';

interface Props {
  location: Location;
}

const FullPage: React.FC<Props> = ({ location }) => {
  const loggedIn = useSelector(selectSessionLoggedIn);
  const defaultCurrentSlug = useSelector(selectCurrentLanguageSlug);
  const currentGlossary = useSelector(selectCurrentGlossary);
  const languageLoading = useSelector(selectLanguageLoading);
  const pathWithoutLanguageParam = useSelector(selectPathWithoutLanguageParam);
  const uiMounted = useSelector(selectUiMounted);
  const renderUi = uiMounted && !languageLoading;
  const route = useSelector(selectCurrentRoute);

  return (
    <div className="FullPage">
      <div className="FullPage-background" />
      <Helmet>
        <title>{currentGlossary.siteTitle}</title>
        <meta name="description" content={currentGlossary.siteDescription} />
        <meta name="author" content={currentGlossary.author} />
        <meta property="og:locale" content={`${defaultCurrentSlug}-${defaultCurrentSlug.toUpperCase()}`} />
        <meta property="og:title" content={currentGlossary.siteTitle} />
        <meta property="og:url" content={route.href} />
        <meta property="og:site_name" content={currentGlossary.siteTitle} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${route.domain}/images/site-image.png`} />
        <meta property="twitter:url" content={route.href} />
        <meta property="twitter:title" content={currentGlossary.siteTitle} />
        <meta property="twitter:image" content={`${route.domain}/images/site-image.png`} />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="RSS 2.0"
          href={`${route.domain}/${defaultCurrentSlug}/rss/blog`}
        />
      </Helmet>
      <Header />
      <FadeInOut
        className="FullPage-content"
        valueToUpdate={pathWithoutLanguageParam}
        unmountOnExit={false}
        speed="fastest"
        appear
      >
        <Fade className="FullPage-content" mounted={renderUi} unmountOnExit={false} speed="fastest" appear>
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
            <Route exact={Routes.Article.exact} path={Routes.Article.path} component={Article} />
            <Route exact={Routes.Where.exact} path={Routes.Where.path} component={Where} />
            <Route exact={Routes.Control.exact} path={Routes.Control.path} component={Control} />
            <Route exact={Routes.ControlWhat.exact} path={Routes.ControlWhat.path} component={ControlWhat} />
            <Route exact={Routes.ControlWho.exact} path={Routes.ControlWho.path} component={ControlWho} />
            <Route
              exact={Routes.ControlProjectCreate.exact}
              path={Routes.ControlProjectCreate.path}
              component={ControlProjectCreate}
            />
            <Route exact={Routes.ControlProject.exact} path={Routes.ControlProject.path} component={ControlProject} />
            <Route exact={Routes.ControlWhen.exact} path={Routes.ControlWhen.path} component={ControlWhen} />
            <Route
              exact={Routes.ControlArticleCreate.exact}
              path={Routes.ControlArticleCreate.path}
              component={ControlArticleCreate}
            />
            <Route exact={Routes.ControlArticle.exact} path={Routes.ControlArticle.path} component={ControlArticle} />
            <Route exact={Routes.Login.exact} path={Routes.Login.path} component={Login} />

            {/* Guards */}
            <Route exact={Routes.ServerError.exact} path={Routes.ServerError.path} component={ServerError} />
            <Route exact={Routes.NotFound.exact} path={Routes.NotFound.path} component={NotFound} />
          </Switch>
        </Fade>
      </FadeInOut>
    </div>
  );
};

export default FullPage;
