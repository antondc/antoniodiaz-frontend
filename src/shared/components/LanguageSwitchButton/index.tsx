import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { switchLanguagesModal } from 'Modules/Ui/actions/switchLanguagesModal';
import { selectUiLanguagesModalMounted } from 'Modules/Ui/selectors/selectUiLanguagesModalMounted';
import { LanguageSwitchButton as LanguageSwitchButtonUi } from './LanguageSwitchButton';

import './LanguageSwitchButton.less';

const LanguageSwitchButton: React.FC = () => {
  const dispatch = useDispatch();
  const languagesModalOpen = useSelector(selectUiLanguagesModalMounted);

  const onLanguageButtonClick = () => {
    dispatch(switchLanguagesModal(!languagesModalOpen));
  };

  return <LanguageSwitchButtonUi onLanguageButtonClick={onLanguageButtonClick} isActive={languagesModalOpen} />;
};

export default LanguageSwitchButton;
