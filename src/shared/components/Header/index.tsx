import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectCurrentRouteName } from 'Modules/Routes/selectors/selectCurrentRouteName';
import { sessionLogOut } from 'Modules/Session/actions/sessionLogOut';
import { selectSessionLoggedIn } from 'Modules/Session/selectors/selectSessionLoggedIn';
import { selectUiLanguagesModalMounted } from 'Modules/Ui/selectors/selectUiLanguagesModalMounted';
import { Routes } from 'Router/routes';
import { Header as HeaderUi } from './Header';

import './Header.less';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const currentRoute = useSelector(selectCurrentRouteName);
  const loggedIn = useSelector(selectSessionLoggedIn);
  const routeName = useSelector(selectCurrentRouteName);
  const logoActive = currentRoute !== Routes.Home.name;
  const currentRouteArticle = currentRoute === Routes.Article.name;
  const currentRouteProject = currentRoute === Routes.Project.name;
  const uiLanguagesModalMounted = useSelector(selectUiLanguagesModalMounted);
  const backRoute = currentRouteArticle ? '/when' : currentRouteProject ? '/what' : '/';

  const onLogOut = () => {
    dispatch(sessionLogOut());
  };

  return (
    <HeaderUi
      uiLanguagesModalMounted={uiLanguagesModalMounted}
      logoActive={logoActive}
      backRoute={backRoute}
      loggedIn={loggedIn}
      routeName={routeName}
      onLogOut={onLogOut}
    />
  );
};

export default Header;
