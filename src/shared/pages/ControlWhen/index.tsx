import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { articlesLoad } from 'Modules/Articles/actions/articlesLoad';
import { articleSortOne } from 'Modules/Articles/actions/articleSortOne';
import { selectArticlesCurrent } from 'Modules/Articles/selectors/selectArticlesCurrent';
import { selectCurrentGlossary } from 'Modules/Languages/selectors/selectCurrentGlossary';
import { selectCurrentLanguageSlug } from 'Modules/Languages/selectors/selectCurrentLanguageSlug';
import { selectLanguageLoading } from 'Modules/Languages/selectors/selectLanguageLoading';
import { LocaleFormattedDate } from 'Tools/utils/Date/localeFormattedDate';
import { SortableItem } from '@antoniodcorrea/components';
import history from '../../services/History';
import { ControlWhen as ControlWhenUi } from './ControlWhen';

import './ControlWhen.less';

const ControlWhen: React.FC = () => {
  const dispatch = useDispatch();
  const language = useSelector(selectCurrentLanguageSlug);
  const glossary = useSelector(selectCurrentGlossary);
  const articles = useSelector(selectArticlesCurrent);
  const languageLoading = useSelector(selectLanguageLoading);
  const renderContent = !languageLoading && articles?.every((item) => item.language === language);

  const articlesWithDates = articles.map((item) => {
    const date = new LocaleFormattedDate({ unixTime: Number(item?.createdAt), locale: language });
    const formattedDate = date.getLocaleFormattedDate();

    return {
      ...item,
      date: formattedDate,
    };
  });

  const onSortChange = async (sortableItem: SortableItem) => {
    await dispatch(
      articleSortOne({
        articleId: sortableItem.id,
        order: sortableItem.order,
      })
    );
    dispatch(articlesLoad());
  };

  const onNewArticleClick = () => {
    history.push(`/${language}/control/when/new`);
  };

  useEffect(() => {
    dispatch(articlesLoad());
  }, [language]);

  return (
    <ControlWhenUi
      glossary={glossary}
      articles={articlesWithDates}
      renderContent={renderContent}
      onSortChange={onSortChange}
      onNewArticleClick={onNewArticleClick}
    />
  );
};

export default ControlWhen;
