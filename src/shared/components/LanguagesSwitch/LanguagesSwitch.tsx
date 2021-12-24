import React from 'react';

import { LanguageState } from 'Modules/Languages/languages.types';
import { A } from '@antoniodcorrea/components';

import './LanguagesSwitch.less';

interface Props {
  currentLanguage: LanguageState;
  languagesSorted: any;
  onLanguagesSwitchLeave: () => void;
  onLanguageSwitch: (slug: string) => void;
}

export const LanguagesSwitch: React.FC<Props> = ({
  currentLanguage,
  onLanguageSwitch,
  languagesSorted,
  onLanguagesSwitchLeave,
}) => (
  <div className="LanguagesSwitch" onMouseLeave={onLanguagesSwitchLeave}>
    {!!languagesSorted.length &&
      languagesSorted.map((item) => (
        <A
          className={
            'LanguagesSwitch-item' + (currentLanguage.slug === item.slug ? ' LanguagesSwitch-item--active' : '')
          }
          key={item.id}
          lang={item.slug}
          href={item.link}
          onClick={() => onLanguageSwitch(item.slug)}
          styled={false}
          frontend
        >
          <span className="LanguagesSwitch-itemText">{item.slug}</span>
        </A>
      ))}
  </div>
);
