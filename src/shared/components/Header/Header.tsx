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
  routeName: string;
  controlHeader: boolean;
  onLogOut: () => void;
}

export const Header: React.FC<Props> = ({
  uiLanguagesModalMounted,
  logoActive,
  routeName,
  controlHeader,
  onLogOut,
}) => (
  <header className={'Header' + (controlHeader ? ' Header--control' : '')}>
    <div className="Header-logo">
      {!controlHeader && <Triangle className={'Header-logoIcon' + (logoActive ? ' isActive' : '')} />}
    </div>
    {controlHeader && (
      <div className="Header-navigation">
        <A
          className={'Header-navigationItem' + (routeName === 'ControlAbout' ? ' Header-navigationItem--active' : '')}
          href="/control/about"
          styled={false}
        >
          About
        </A>
        <A
          className={'Header-navigationItem' + (routeName === 'ControlBlog' ? ' Header-navigationItem--active' : '')}
          href="/control/blog"
          styled={false}
        >
          Blog
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
      <Fade mounted={uiLanguagesModalMounted} position="absolute">
        <LanguagesSwitch />
      </Fade>
    </div>
  </header>
);
