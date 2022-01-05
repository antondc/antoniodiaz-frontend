import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { articlesLoad } from 'Modules/Articles/actions/articlesLoad';
import { selectArticlesAll } from 'Modules/Articles/selectors/selectArticlesAll';
import { selectCurrentGlossary } from 'Modules/Languages/selectors/selectCurrentGlossary';
import { selectCurrentLanguageSlug } from 'Modules/Languages/selectors/selectCurrentLanguageSlug';
import { selectLanguageLoading } from 'Modules/Languages/selectors/selectLanguageLoading';
import { selectCurrentRouteParams } from 'Modules/Routes/selectors/selectCurrentRouteParams';
import { LocaleFormattedDate } from 'Tools/utils/Date/localeFormattedDate';
import { When as WhenUi } from './When';

const When: React.FC = () => {
  const dispatch = useDispatch();
  const glossary = useSelector(selectCurrentGlossary);
  const params = useSelector(selectCurrentRouteParams);
  const language = useSelector(selectCurrentLanguageSlug);
  const languageLoading = useSelector(selectLanguageLoading);
  const articles = useSelector(selectArticlesAll);
  const renderContent = !languageLoading && articles?.every((item) => item.language === language);

  const articlesWithDates = articles.map((item) => {
    const date = new LocaleFormattedDate({ unixTime: Number(item?.createdAt), locale: params?.lang });
    const formattedDate = date.getLocaleFormattedDate();

    return {
      ...item,
      date: formattedDate,
    };
  });

  useEffect(() => {
    dispatch(articlesLoad());
  }, [language]);

  return (
    <WhenUi
      glossary={glossary}
      articlesWithDates={articlesWithDates}
      lang={params.lang}
      renderContent={renderContent}
    />
  );
};
export default When;
