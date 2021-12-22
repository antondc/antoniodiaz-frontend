import React from 'react';
import { useSelector } from 'react-redux';

import { selectUiLanguagesModalMounted } from 'Modules/Ui/selectors/selectUiLanguagesModalMounted';
import { Header as HeaderUi } from './Header';

import './Header.less';

const Header: React.FC = () => {
  const uiLanguagesModalMounted = useSelector(selectUiLanguagesModalMounted);

  return <HeaderUi uiLanguagesModalMounted={uiLanguagesModalMounted} />;
};

export default Header;
