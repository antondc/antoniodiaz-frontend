import React from 'react';
import { useSelector } from 'react-redux';

import { selectCurrentRouteName } from 'Modules/Routes/selectors/selectCurrentRouteName';
import { selectUiLanguagesModalMounted } from 'Modules/Ui/selectors/selectUiLanguagesModalMounted';
import { Routes } from '../../router/routes';
import { Header as HeaderUi } from './Header';

import './Header.less';

const Header: React.FC = () => {
  const currentRoute = useSelector(selectCurrentRouteName);

  const logoActive = currentRoute !== Routes.Home.name;
  const currentRoutePost = currentRoute === Routes.Post.name;
  const currentRouteProject = currentRoute === Routes.Project.name;
  const uiLanguagesModalMounted = useSelector(selectUiLanguagesModalMounted);
  const backRoute = currentRoutePost ? '/when' : currentRouteProject ? '/what' : '/';

  return <HeaderUi uiLanguagesModalMounted={uiLanguagesModalMounted} logoActive={logoActive} backRoute={backRoute} />;
};

export default Header;
