import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectCurrentRoute } from 'Modules/Routes/selectors/selectCurrentRoute';
import { selectCurrentRouteName } from 'Modules/Routes/selectors/selectCurrentRouteName';
import { sessionLogOut } from 'Modules/Session/actions/sessionLogOut';
import { selectSessionLoggedIn } from 'Modules/Session/selectors/selectSessionLoggedIn';
import { Header as HeaderUi } from './Header';

import './Header.less';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const currentRoute = useSelector(selectCurrentRoute);
  const routeName = useSelector(selectCurrentRouteName);
  const controlHeader = currentRoute.auth;
  const isLoggedIn = useSelector(selectSessionLoggedIn);

  const onLogOut = () => {
    dispatch(sessionLogOut());
  };

  return <HeaderUi routeName={routeName} onLogOut={onLogOut} isLoggedIn={isLoggedIn} controlHeader={controlHeader} />;
};

export default Header;
