import React from 'react';
import { useSelector } from 'react-redux';

import { selectArticlesAll } from 'Modules/Articles/selectors/selectArticlesAll';
import { selectCurrentGlossary } from 'Modules/Languages/selectors/selectCurrentGlossary';
import { selectCurrentRouteParams } from 'Modules/Routes/selectors/selectCurrentRouteParams';
import { LocaleFormattedDate } from 'Tools/utils/Date/localeFormattedDate';
import { When as WhenUi } from './When';

const When: React.FC = () => {
  const glossary = useSelector(selectCurrentGlossary);
  const params = useSelector(selectCurrentRouteParams);
  const articles = useSelector(selectArticlesAll);

  const articlesWithDates = articles.map((item) => {
    const date = new LocaleFormattedDate({ unixTime: Number(item?.date), locale: params?.lang });
    const formattedDate = date.getLocaleFormattedDate();

    return {
      ...item,
      date: formattedDate,
    };
  });

  return <WhenUi glossary={glossary} articlesWithDates={articlesWithDates} lang={params.lang} />;
};
export default When;
