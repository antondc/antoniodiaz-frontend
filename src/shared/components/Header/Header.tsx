import React from 'react';

import A from 'Components/A';
import LanguagesSwitch from 'Components/LanguagesSwitch';
import { Routes } from 'Router/routes';

import './Header.less';

interface Props {
  routeName: string;
  isAuthRoute: boolean;
  isLoggedIn: boolean;
  onLogOut: () => void;
}

export const Header: React.FC<Props> = ({ routeName, isAuthRoute, isLoggedIn, onLogOut }) => (
  <header className={'Header' + (isAuthRoute ? ' Header--control' : '')}>
    {!isAuthRoute && (
      <div className="Header-navigation">
        <A
          className={
            'Header-navigationItem' +
            (routeName === Routes.Home.name || routeName === Routes.Article.name
              ? ' Header-navigationItem--active'
              : '')
          }
          href={Routes.Home.route}
          styled={false}
        >
          Home
        </A>
        <A
          className={
            'Header-navigationItem' + (routeName === Routes.About.name ? ' Header-navigationItem--active' : '')
          }
          href={Routes.About.route}
          styled={false}
        >
          About
        </A>
      </div>
    )}

    {isAuthRoute && (
      <div className="Header-navigation">
        <A
          className={
            'Header-navigationItem' +
            (routeName === Routes.Control.name || routeName === Routes.ControlArticle.name
              ? ' Header-navigationItem--active'
              : '')
          }
          href={Routes.Control.route}
          styled={false}
        >
          Blog
        </A>
        <A
          className={
            'Header-navigationItem' + (routeName === Routes.ControlAbout.name ? ' Header-navigationItem--active' : '')
          }
          href={Routes.ControlAbout.route}
          styled={false}
        >
          About
        </A>
      </div>
    )}
    <div className="Header-buttons">
      <LanguagesSwitch />
      {isLoggedIn && (
        <>
          <div className="Header-item Header-logOut" onClick={onLogOut}>
            Log out
          </div>
          {!isAuthRoute && (
            <A className={'Header-item Header-logOut'} href={Routes.ControlAbout.route} styled={false}>
              Control
            </A>
          )}
          {!!isAuthRoute && (
            <A className={'Header-item Header-logOut'} href={Routes.Home.route} styled={false}>
              Home
            </A>
          )}
        </>
      )}
    </div>
  </header>
);
