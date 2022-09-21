import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectCurrentRoute } from 'Modules/Routes/selectors/selectCurrentRoute';
import { selectCurrentRouteName } from 'Modules/Routes/selectors/selectCurrentRouteName';
import { sessionLogOut } from 'Modules/Session/actions/sessionLogOut';
import { selectUiLanguagesModalMounted } from 'Modules/Ui/selectors/selectUiLanguagesModalMounted';
import { Routes } from 'Router/routes';
import { Header as HeaderUi } from './Header';

import './Header.less';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const currentRoute = useSelector(selectCurrentRoute);
  const routeName = useSelector(selectCurrentRouteName);
  const logoActive = currentRoute?.name !== Routes.Home.name;
  const uiLanguagesModalMounted = useSelector(selectUiLanguagesModalMounted);
  const controlHeader = currentRoute.auth;

  const onLogOut = () => {
    dispatch(sessionLogOut());
  };

  return (
    <HeaderUi
      uiLanguagesModalMounted={uiLanguagesModalMounted}
      logoActive={logoActive}
      routeName={routeName}
      onLogOut={onLogOut}
      controlHeader={controlHeader}
    />
  );
};

export default Header;
