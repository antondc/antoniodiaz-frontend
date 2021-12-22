import React from 'react';

import Triangle from 'Assets/svg/triangle.svg';
import LanguageItem from 'Components/LanguageItem';
import LanguagesSwitch from 'Components/LanguagesSwitch';
import { SessionState } from 'Modules/Session/session.types';
import { Fade } from '@antoniodcorrea/components';
import A from '../A';

import './Header.less';

interface Props {
  session: SessionState;
  currentLanguageSlug: string;
  currentPathName: string;
  uiLanguagesModalMounted: boolean;
  onLanguageItemClick: () => void;
  onLogout: () => void;
}

export const Header: React.FC<Props> = ({
  session,
  currentLanguageSlug,
  currentPathName,
  uiLanguagesModalMounted,
  onLanguageItemClick,
  onLogout,
}) => (
  <header className="Header">
    <A href="/" className="Header-logo">
      <Triangle className="Header-logoIcon" />
    </A>
    <div className="Header-languages">
      <Fade mounted={uiLanguagesModalMounted}>
        <LanguagesSwitch />
      </Fade>
      <LanguageItem lang={currentLanguageSlug} onClick={onLanguageItemClick} href={currentPathName} />
    </div>
  </header>
);
