import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { articlesLoad } from 'Modules/Articles/actions/articlesLoad';
import { selectArticlesAll } from 'Modules/Articles/selectors/selectArticlesAll';
import { selectCurrentGlossary } from 'Modules/Languages/selectors/selectCurrentGlossary';
import { selectCurrentLanguageSlug } from 'Modules/Languages/selectors/selectCurrentLanguageSlug';
import { selectLanguageLoading } from 'Modules/Languages/selectors/selectLanguageLoading';
import { ControlWhen as ControlWhenUi } from './ControlWhen';

import './ControlWhen.less';

const ControlWhen: React.FC = () => {
  const dispatch = useDispatch();
  const language = useSelector(selectCurrentLanguageSlug);
  const glossary = useSelector(selectCurrentGlossary);
  const articles = useSelector(selectArticlesAll);
  const languageLoading = useSelector(selectLanguageLoading);
  const renderContent = !languageLoading && articles?.every((item) => item.language === language);

  useEffect(() => {
    dispatch(articlesLoad());
  }, [language]);

  return <ControlWhenUi glossary={glossary} articles={articles} renderContent={renderContent} />;
};

export default ControlWhen;
