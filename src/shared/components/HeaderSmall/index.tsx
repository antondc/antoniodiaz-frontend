import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectCurrentGlossary } from 'Modules/Languages/selectors/selectCurrentGlossary';
import { selectSession } from 'Modules/Session/selectors/selectSession';
import { selectSessionLoading } from 'Modules/Session/selectors/selectSessionLoading';
import { switchLoginModal } from 'Modules/Ui/actions/switchLoginModal';
import { userModalMount } from 'Modules/Ui/actions/userModalMount';
import { selectUsersLoading } from 'Modules/Users/selectors/selectUsersLoading';
import { HeaderSmall as HeaderSmallUi } from './HeaderSmall';

import './HeaderSmall.less';

const HeaderSmall: React.FC = () => {
  const dispatch = useDispatch();
  const session = useSelector(selectSession);
  const currentGlossary = useSelector(selectCurrentGlossary);
  const usersLoading = useSelector(selectUsersLoading);
  const sessionLoading = useSelector(selectSessionLoading);
  const logoLoadingHeartBeat = !!usersLoading;
  const logoLoadingColors = sessionLoading;

  const onUserClick = () => {
    if (session?.id) {
      dispatch(userModalMount());

      return;
    }
    dispatch(switchLoginModal(true));
  };

  return (
    <HeaderSmallUi
      session={session}
      currentGlossary={currentGlossary}
      onUserClick={onUserClick}
      logoLoadingHeartBeat={logoLoadingHeartBeat}
      logoLoadingColors={logoLoadingColors}
      sessionLoading={sessionLoading}
    />
  );
};

export default HeaderSmall;
