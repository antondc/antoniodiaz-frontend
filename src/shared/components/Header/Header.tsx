import React from 'react';

import A from 'Components/A';
import LanguagesSwitch from 'Components/LanguagesSwitch';
import { Routes } from 'Router/routes';

import './Header.less';

interface Props {
  routeName: string;
  controlHeader: boolean;
  isLoggedIn: boolean;
  onLogOut: () => void;
}

export const Header: React.FC<Props> = ({ routeName, controlHeader, isLoggedIn, onLogOut }) => (
  <header className={'Header' + (controlHeader ? ' Header--control' : '')}>
    {!controlHeader && (
      <div className="Header-navigation">
        <A
          className={
            'Header-navigationItem' +
            (routeName === Routes.Home.name || routeName === Routes.Article.name
              ? ' Header-navigationItem--active'
              : '')
          }
          href="/"
          styled={false}
        >
          Home
        </A>
        <A
          className={
            'Header-navigationItem' + (routeName === Routes.About.name ? ' Header-navigationItem--active' : '')
          }
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
          className={
            'Header-navigationItem' +
            (routeName === Routes.ControlBlog.name || routeName === Routes.ControlArticle.name
              ? ' Header-navigationItem--active'
              : '')
          }
          href="/control/blog"
          styled={false}
        >
          Blog
        </A>
        <A
          className={
            'Header-navigationItem' + (routeName === Routes.ControlAbout.name ? ' Header-navigationItem--active' : '')
          }
          href="/control/about"
          styled={false}
        >
          About
        </A>
      </div>
    )}
    <div className="Header-buttons">
      <LanguagesSwitch />
      {isLoggedIn && (
        <div className="Header-item Header-logOut" onClick={onLogOut}>
          Log out
        </div>
      )}
    </div>
  </header>
);
