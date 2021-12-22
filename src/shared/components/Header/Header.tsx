import React from 'react';

import A from 'Components/A';
import LanguageItem from 'Components/LanguageItem';
import LanguagesSwitch from 'Components/LanguagesSwitch';
import Logo from 'Components/Logo';
import { SessionState } from 'Modules/Session/session.types';
import { Fade, Space } from '@antoniodcorrea/components';

import './Header.less';

interface Props {
  session: SessionState;
  logoLoadingHeartBeat: boolean;
  logoLoadingColors: boolean;
  currentLanguageSlug: string;
  currentPathName: string;
  uiLanguagesModalMounted: boolean;
  onLanguageItemClick: () => void;
  onLogout: () => void;
}

export const Header: React.FC<Props> = ({
  session,
  logoLoadingHeartBeat,
  logoLoadingColors,
  currentLanguageSlug,
  currentPathName,
  uiLanguagesModalMounted,
  onLanguageItemClick,
  onLogout,
}) => (
  <header className="Header">
    <div className="Header-content">
      <Logo className="Header-logo" loadingBeat={logoLoadingHeartBeat} loadingColors={logoLoadingColors} />
      <A href="/who">Who</A>
      <Space />
      <A href="/what">What</A>
      <Space />
      <A href="/when">When</A>
      <Space />
      <A href="/where">Where</A>
      <Space />
      {session.id ? (
        <A href="" onClick={onLogout}>
          Logout
        </A>
      ) : (
        <A href="/login">Login</A>
      )}
      <Space />
      <A href="/control">Control</A>
      <Space />
      <div className="Header-languages">
        <Fade mounted={uiLanguagesModalMounted}>
          <LanguagesSwitch />
        </Fade>
        <LanguageItem lang={currentLanguageSlug} onClick={onLanguageItemClick} href={currentPathName} />
      </div>
    </div>
  </header>
);
