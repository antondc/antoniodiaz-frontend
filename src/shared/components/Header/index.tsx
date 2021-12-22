import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectCurrentLanguageSlug } from 'Modules/Languages/selectors/selectCurrentLanguageSlug';
import { selectCurrentPathname } from 'Modules/Routes/selectors/selectCurrentPathname';
import { sessionLogOut } from 'Modules/Session/actions/sessionLogOut';
import { selectSession } from 'Modules/Session/selectors/selectSession';
import { selectSessionLoading } from 'Modules/Session/selectors/selectSessionLoading';
import { switchLanguagesModal } from 'Modules/Ui/actions/switchLanguagesModal';
import { selectUiLanguagesModalMounted } from 'Modules/Ui/selectors/selectUiLanguagesModalMounted';
import { selectUsersLoading } from 'Modules/Users/selectors/selectUsersLoading';
import history from 'Services/History';
import { Routes } from '../../router/routes';
import { Header as HeaderUi } from './Header';

import './Header.less';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const usersLoading = useSelector(selectUsersLoading);
  const sessionLoading = useSelector(selectSessionLoading);
  const session = useSelector(selectSession);
  const logoLoadingHeartBeat = usersLoading;
  const logoLoadingColors = sessionLoading;
  const currentLanguageSlug = useSelector(selectCurrentLanguageSlug);
  const currentPathName = useSelector(selectCurrentPathname);
  const uiLanguagesModalMounted = useSelector(selectUiLanguagesModalMounted);

  const onLanguageItemClick = (): void => {
    dispatch(switchLanguagesModal());
  };

  const onLogout = async (): Promise<void> => {
    await dispatch(sessionLogOut());
    history.push(`/${currentLanguageSlug}${Routes.Login.route}`);
  };

  return (
    <HeaderUi
      session={session}
      logoLoadingHeartBeat={logoLoadingHeartBeat}
      logoLoadingColors={logoLoadingColors}
      currentLanguageSlug={currentLanguageSlug}
      currentPathName={currentPathName}
      onLanguageItemClick={onLanguageItemClick}
      uiLanguagesModalMounted={uiLanguagesModalMounted}
      onLogout={onLogout}
    />
  );
};

export default Header;
