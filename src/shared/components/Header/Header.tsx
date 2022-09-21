import React from 'react';

import Exit from 'Assets/svg/exit.svg';
import A from 'Components/A';
import LanguagesSwitch from 'Components/LanguagesSwitch';

import './Header.less';

interface Props {
  routeName: string;
  controlHeader: boolean;
  onLogOut: () => void;
}

export const Header: React.FC<Props> = ({ routeName, controlHeader, onLogOut }) => (
  <header className={'Header' + (controlHeader ? ' Header--control' : '')}>
    {!controlHeader && (
      <div className="Header-navigation">
        <A
          className={'Header-navigationItem' + (routeName === 'Home' ? ' Header-navigationItem--active' : '')}
          href="/"
          styled={false}
        >
          Blog
        </A>
        <A
          className={'Header-navigationItem' + (routeName === 'About' ? ' Header-navigationItem--active' : '')}
          href="/about"
          styled={false}
        >
          About
        </A>
      </div>
    )}
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
      <LanguagesSwitch />
    </div>
  </header>
);
