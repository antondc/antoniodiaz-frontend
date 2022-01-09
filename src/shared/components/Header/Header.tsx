import React from 'react';

import LogOut from 'Assets/svg/logOut.svg';
import Triangle from 'Assets/svg/triangle.svg';
import A from 'Components/A';
import LanguagesSwitch from 'Components/LanguagesSwitch';
import LanguageSwitchButton from 'Components/LanguageSwitchButton';
import { Fade } from '@antoniodcorrea/components';

import './Header.less';

interface Props {
  loggedIn: boolean;
  uiLanguagesModalMounted: boolean;
  logoActive: boolean;
  backRoute: string;
  routeName: string;
  onLogOut: () => void;
}

export const Header: React.FC<Props> = ({
  loggedIn,
  uiLanguagesModalMounted,
  logoActive,
  backRoute,
  routeName,
  onLogOut,
}) => (
  <header className={'Header' + (loggedIn ? ' Header--loggedIn' : '')}>
    <A href={backRoute} className="Header-logo">
      <Triangle className={'Header-logoIcon' + (logoActive ? ' isActive' : '')} />
    </A>
    {loggedIn && (
      <>
        <A
          className={'Header-item' + (routeName === 'ControlWhen' ? ' Header-item--active' : '')}
          href="/control/when"
          styled={false}
        >
          When
        </A>
        <A
          className={'Header-item' + (routeName === 'ControlWhat' ? ' Header-item--active' : '')}
          href="/control/what"
          styled={false}
        >
          What
        </A>
        <div className="Header-item Header-logOut" onClick={onLogOut}>
          <LogOut />
        </div>
      </>
    )}
    <div>
      <Fade mounted={uiLanguagesModalMounted}>
        <LanguagesSwitch />
      </Fade>
      <LanguageSwitchButton />
    </div>
  </header>
);
