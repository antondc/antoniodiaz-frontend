import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useLoadInitialData } from 'Hooks/useLoadInitialData';
import { articleDeleteOne } from 'Modules/Articles/actions/articleDeleteOne';
import { articlesLoad } from 'Modules/Articles/actions/articlesLoad';
import { articleSortOne } from 'Modules/Articles/actions/articleSortOne';
import { selectArticlesCurrent } from 'Modules/Articles/selectors/selectArticlesCurrent';
import { selectCurrentLanguageSlug } from 'Modules/Languages/selectors/selectCurrentLanguageSlug';
import history from 'Services/History';
import { SortableSortProps } from '@antoniodcorrea/components';
import { LocaleFormattedDate } from '@antoniodcorrea/utils';
import { ControlBlog as ControlBlogUi } from './ControlBlog';

import './ControlBlog.less';

const ControlBlog: React.FC = () => {
  const dispatch = useDispatch();
  const language = useSelector(selectCurrentLanguageSlug);
  const articles = useSelector(selectArticlesCurrent);
  const articlesWithDates = articles.map((item) => {
    const date = new LocaleFormattedDate({ unixTime: Number(item?.createdAt), locale: language });
    const formattedDate = date.getLocaleFormattedDate();

    return {
      ...item,
      date: formattedDate,
    };
  });

  const loadInitialData = async () => {
    await dispatch(articlesLoad());
  };
  useLoadInitialData({ loadInitialData });

  const onSortChange = async (sortableItem: SortableSortProps) => {
    await dispatch(
      articleSortOne({
        articleId: sortableItem.id,
        order: sortableItem.order,
      })
    );
    dispatch(articlesLoad());
  };

  const onDeleteArticleClick = (projectId: string) => {
    if (!confirm('Are you sure?')) return;

    dispatch(articleDeleteOne(Number(projectId)));
  };

  const onNewArticleClick = () => {
    history.push(`/${language}/control/blog/new`);
  };

  return (
    <ControlBlogUi
      articles={articlesWithDates}
      onSortChange={onSortChange}
      onDeleteArticleClick={onDeleteArticleClick}
      onNewArticleClick={onNewArticleClick}
    />
  );
};

export default ControlBlog;
