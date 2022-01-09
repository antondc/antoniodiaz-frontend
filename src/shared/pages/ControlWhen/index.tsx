import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { articlesLoad } from 'Modules/Articles/actions/articlesLoad';
import { articleSortOne } from 'Modules/Articles/actions/articleSortOne';
import { selectArticlesCurrent } from 'Modules/Articles/selectors/selectArticlesCurrent';
import { selectCurrentGlossary } from 'Modules/Languages/selectors/selectCurrentGlossary';
import { selectCurrentLanguageSlug } from 'Modules/Languages/selectors/selectCurrentLanguageSlug';
import { selectLanguageLoading } from 'Modules/Languages/selectors/selectLanguageLoading';
import { SortableItem } from '@antoniodcorrea/components';
import { ControlWhen as ControlWhenUi } from './ControlWhen';

import './ControlWhen.less';

const ControlWhen: React.FC = () => {
  const dispatch = useDispatch();
  const language = useSelector(selectCurrentLanguageSlug);
  const glossary = useSelector(selectCurrentGlossary);
  const articles = useSelector(selectArticlesCurrent);
  const languageLoading = useSelector(selectLanguageLoading);
  const renderContent = !languageLoading && articles?.every((item) => item.language === language);

  const onSortChange = async (sortableItem: SortableItem) => {
    await dispatch(
      articleSortOne({
        articleId: sortableItem.id,
        order: sortableItem.order,
      })
    );
    dispatch(articlesLoad());
  };

  useEffect(() => {
    dispatch(articlesLoad());
  }, [language]);

  return (
    <ControlWhenUi glossary={glossary} articles={articles} renderContent={renderContent} onSortChange={onSortChange} />
  );
};

export default ControlWhen;
