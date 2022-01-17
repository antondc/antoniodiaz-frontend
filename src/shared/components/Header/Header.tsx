import React from 'react';

import Exit from 'Assets/svg/exit.svg';
import Triangle from 'Assets/svg/triangle.svg';
import A from 'Components/A';
import LanguagesSwitch from 'Components/LanguagesSwitch';
import LanguageSwitchButton from 'Components/LanguageSwitchButton';
import { Fade } from '@antoniodcorrea/components';

import './Header.less';

interface Props {
  uiLanguagesModalMounted: boolean;
  logoActive: boolean;
  backRoute: string;
  routeName: string;
  controlHeader: boolean;
  onLogOut: () => void;
}

export const Header: React.FC<Props> = ({
  uiLanguagesModalMounted,
  logoActive,
  backRoute,
  routeName,
  controlHeader,
  onLogOut,
}) => (
  <header className={'Header' + (controlHeader ? ' Header--control' : '')}>
    {!controlHeader && (
      <A href={backRoute} className="Header-logo">
        <Triangle className={'Header-logoIcon' + (logoActive ? ' isActive' : '')} />
      </A>
    )}
    {controlHeader && (
      <div className="Header-navigation">
        <A
          className={'Header-navigationItem' + (routeName === 'ControlWho' ? ' Header-navigationItem--active' : '')}
          href="/control/who"
          styled={false}
        >
          Who
        </A>
        <A
          className={'Header-navigationItem' + (routeName === 'ControlWhat' ? ' Header-navigationItem--active' : '')}
          href="/control/what"
          styled={false}
        >
          What
        </A>
        <A
          className={'Header-navigationItem' + (routeName === 'ControlWhen' ? ' Header-navigationItem--active' : '')}
          href="/control/when"
          styled={false}
        >
          When
        </A>
      </div>
    )}
    <div className="Header-buttons">
      {controlHeader && (
        <div className="Header-item Header-logOut" onClick={onLogOut}>
          <Exit />
        </div>
      )}
      <LanguageSwitchButton />
      <Fade mounted={uiLanguagesModalMounted}>
        <LanguagesSwitch />
      </Fade>
    </div>
  </header>
);
