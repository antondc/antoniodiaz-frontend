import React from 'react';

import Triangle from 'Assets/svg/triangle.svg';
import A from 'Components/A';
import LanguagesSwitch from 'Components/LanguagesSwitch';
import LanguageSwitchButton from 'Components/LanguageSwitchButton';
import { Fade } from '@antoniodcorrea/components';

import './Header.less';

interface Props {
  uiLanguagesModalMounted: boolean;
}

export const Header: React.FC<Props> = ({ uiLanguagesModalMounted }) => (
  <header className="Header">
    <A href="/" className="Header-logo">
      <Triangle className="Header-logoIcon" />
    </A>
    <div className="Header-languages">
      <Fade mounted={uiLanguagesModalMounted}>
        <LanguagesSwitch />
      </Fade>
      <LanguageSwitchButton />
    </div>
  </header>
);
