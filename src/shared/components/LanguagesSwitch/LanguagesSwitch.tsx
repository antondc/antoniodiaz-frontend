import React from 'react';

import { LanguageState } from 'Modules/Languages/languages.types';

import './LanguagesSwitch.less';

interface Props {
  loggedIn: boolean;
  currentLanguage: LanguageState;
  languagesSorted: any;
  onLanguagesSwitchLeave: () => void;
  onLanguageSwitch: (e: React.MouseEvent<HTMLButtonElement>, slug: string, link: string) => void;
}

export const LanguagesSwitch: React.FC<Props> = ({
  loggedIn,
  currentLanguage,
  onLanguageSwitch,
  languagesSorted,
  onLanguagesSwitchLeave,
}) => (
  <div
    className={'LanguagesSwitch' + (loggedIn ? ' LanguagesSwitch--loggedIn' : '')}
    onMouseLeave={onLanguagesSwitchLeave}
  >
    {!!languagesSorted.length &&
      languagesSorted.map((item) => (
        <button
          className={
            'LanguagesSwitch-item' + (currentLanguage.slug === item.slug ? ' LanguagesSwitch-item--active' : '')
          }
          key={item.id}
          lang={item.slug}
          onClick={(e) => onLanguageSwitch(e, item.slug, item.link)}
        >
          <span className="LanguagesSwitch-itemText">{item.slug}</span>
        </button>
      ))}
  </div>
);
