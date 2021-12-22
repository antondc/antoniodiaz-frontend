import React from 'react';

import './LanguageSwitchButton.less';

interface Props {
  isActive: boolean;
  onLanguageButtonClick: () => void;
}

export const LanguageSwitchButton: React.FC<Props> = ({ isActive, onLanguageButtonClick }) => (
  <div className={'LanguageSwitchButton' + (isActive ? ' isActive' : '')} onClick={onLanguageButtonClick}>
    <span />
    <span />
    <span />
  </div>
);
