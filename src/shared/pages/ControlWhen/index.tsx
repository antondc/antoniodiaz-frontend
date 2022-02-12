import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useLoadInitialData } from 'Hooks/useLoadInitialData';
import { articleDeleteOne } from 'Modules/Articles/actions/articleDeleteOne';
import { articlesLoad } from 'Modules/Articles/actions/articlesLoad';
import { articleSortOne } from 'Modules/Articles/actions/articleSortOne';
import { selectArticlesCurrent } from 'Modules/Articles/selectors/selectArticlesCurrent';
import { languagesUpdateCurrentLanguage } from 'Modules/Languages/actions/languagesUpdateCurrentLanguage';
import { selectCurrentGlossary } from 'Modules/Languages/selectors/selectCurrentGlossary';
import { selectCurrentLanguageSlug } from 'Modules/Languages/selectors/selectCurrentLanguageSlug';
import { selectLanguageLoading } from 'Modules/Languages/selectors/selectLanguageLoading';
import history from 'Services/History';
import { SortableSortProps } from '@antoniodcorrea/components';
import { LocaleFormattedDate } from '@antoniodcorrea/utils';
import { ControlWhen as ControlWhenUi } from './ControlWhen';

import './ControlWhen.less';

const ControlWhen: React.FC = () => {
  const dispatch = useDispatch();
  const [subtitleValue, setSubtitleValue] = useState<string>('');
  const [subtitleError, setSubtitleError] = useState<string>('');
  const [submitError, setSubmitError] = useState<string>(undefined);
  const [submitting, setSubmitting] = useState<boolean>(undefined);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(undefined);
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

  const loadInitialData = async () => {
    await dispatch(articlesLoad());
    setSubtitleValue(glossary.whenSubtitle);
  };
  useLoadInitialData({ loadInitialData });

  const onChangeSubtitle = async (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;

    setSubtitleValue(value);
    setSubmitSuccess(undefined);
    setSubmitting(undefined);
    setSubtitleError(undefined);
  };

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

  const onSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setSubmitting(true);

    try {
      const glossaryData = {
        whenSubtitle: subtitleValue,
      };
      dispatch(languagesUpdateCurrentLanguage(glossaryData));

      setSubmitSuccess(true);
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const onNewArticleClick = () => {
    history.push(`/${language}/control/when/new`);
  };

  return (
    <ControlWhenUi
      glossary={glossary}
      articles={articlesWithDates}
      renderContent={renderContent}
      onSortChange={onSortChange}
      onDeleteArticleClick={onDeleteArticleClick}
      onNewArticleClick={onNewArticleClick}
      subtitleValue={subtitleValue}
      subtitleError={subtitleError}
      onChangeSubtitle={onChangeSubtitle}
      onSubmit={onSubmit}
      submitError={submitError}
      submitSuccess={submitSuccess}
      submitting={submitting}
    />
  );
};

export default ControlWhen;
