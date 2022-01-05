import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { switchCurrentLanguage } from 'Modules/Languages/actions/switchCurrentLanguage';
import { selectCurrentLanguage } from 'Modules/Languages/selectors/selectCurrentLanguage';
import { selectLanguagesList } from 'Modules/Languages/selectors/selectLanguagesList';
import { selectCurrentPathname } from 'Modules/Routes/selectors/selectCurrentPathname';
import { selectCurrentRouteParamLanguage } from 'Modules/Routes/selectors/selectCurrentRouteParamLanguage';
import { switchLanguagesModal } from 'Modules/Ui/actions/switchLanguagesModal';
import { LanguagesSwitch as LanguagesSwitchUi } from './LanguagesSwitch';

import './LanguagesSwitch.less';

const LanguagesSwitch: React.FC = () => {
  const dispatch = useDispatch();
  const languagesList = useSelector(selectLanguagesList);
  const currentLanguage = useSelector(selectCurrentLanguage);
  const currentRouteParamLanguage = useSelector(selectCurrentRouteParamLanguage);
  const currentPathname = useSelector(selectCurrentPathname);

  const addLinkToLanguage = (language) => {
    const link = !!currentRouteParamLanguage
      ? currentPathname?.replace('/' + currentRouteParamLanguage, '/' + language.slug)
      : '/' + language.slug + currentPathname;

    return { ...language, link };
  };

  const languagesWithLink = languagesList.map((language) => addLinkToLanguage(language));
  const languagesSorted = languagesWithLink.sort((first, second) => second.id - first.id);

  const onLanguageSwitch = (e: React.MouseEvent<HTMLButtonElement>, slug: string, link: string) => {
    e.preventDefault();

    if (currentLanguage.slug === slug) return;

    dispatch(switchCurrentLanguage(slug, link));
    dispatch(switchLanguagesModal(false));
  };

  const onLanguagesSwitchLeave = () => {
    dispatch(switchLanguagesModal(false));
  };

  return (
    <LanguagesSwitchUi
      currentLanguage={currentLanguage}
      languagesSorted={languagesSorted}
      onLanguageSwitch={onLanguageSwitch}
      onLanguagesSwitchLeave={onLanguagesSwitchLeave}
    />
  );
};

export default LanguagesSwitch;
