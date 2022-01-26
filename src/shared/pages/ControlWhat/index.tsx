import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { languagesUpdateCurrentLanguage } from 'Modules/Languages/actions/languagesUpdateCurrentLanguage';
import { selectCurrentGlossary } from 'Modules/Languages/selectors/selectCurrentGlossary';
import { selectCurrentLanguageSlug } from 'Modules/Languages/selectors/selectCurrentLanguageSlug';
import { selectLanguageLoading } from 'Modules/Languages/selectors/selectLanguageLoading';
import { projectDeleteOne } from 'Modules/Projects/actions/projectDeleteOne';
import { projectsLoad } from 'Modules/Projects/actions/projectsLoad';
import { projectSortOne } from 'Modules/Projects/actions/projectSortOne';
import { selectProjectsCurrent } from 'Modules/Projects/selectors/selectProjectsCurrent';
import history from 'Services/History';
import { SortableSortProps } from '@antoniodcorrea/components';
import { LocaleFormattedDate } from '@antoniodcorrea/utils';
import { ControlWhat as ControlWhatUi } from './ControlWhat';

import './ControlWhat.less';

const ControlWhat: React.FC = () => {
  const dispatch = useDispatch();
  const [subtitleValue, setSubtitleValue] = useState<string>('');
  const [subtitleError, setSubtitleError] = useState<string>('');
  const [sortableDisabled, setSortableDisabled] = useState(false);
  const [submitError, setSubmitError] = useState<string>(undefined);
  const [submitting, setSubmitting] = useState<boolean>(undefined);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(undefined);

  const languageSlug = useSelector(selectCurrentLanguageSlug);
  const glossary = useSelector(selectCurrentGlossary);
  const projects = useSelector(selectProjectsCurrent);
  const languageLoading = useSelector(selectLanguageLoading);
  const renderContent = !languageLoading && projects?.every((item) => item.language === languageSlug);
  const projectsWithDates = projects.map((item) => {
    const date = new LocaleFormattedDate({ unixTime: Number(item?.createdAt), locale: languageSlug });
    const formattedDate = date.getLocaleFormattedDate();

    return {
      ...item,
      date: formattedDate,
    };
  });

  const onChangeSubtitle = async (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;

    setSubtitleValue(value);
    setSubmitSuccess(undefined);
    setSubmitting(undefined);
    setSubtitleError(undefined);
  };

  const onSortChange = async (sortableItem: SortableSortProps) => {
    setSortableDisabled(true);
    await dispatch(
      projectSortOne({
        projectId: sortableItem.id,
        order: sortableItem.order,
      })
    );
    setSortableDisabled(false);
  };

  const onDeleteProjectClick = (projectId: string) => {
    if (!confirm('Are you sure?')) return;

    dispatch(projectDeleteOne(Number(projectId)));
  };

  const onNewProjectClick = () => {
    history.push(`/${languageSlug}/control/what/new`);
  };

  const onSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setSubmitting(true);

    try {
      const glossaryData = {
        whatSubtitle: subtitleValue,
      };
      dispatch(languagesUpdateCurrentLanguage(glossaryData));

      setSubmitSuccess(true);
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    dispatch(projectsLoad());
  }, [languageSlug]);

  useEffect(() => {
    setSubtitleValue(glossary.whatSubtitle);
  }, [glossary]);

  return (
    <ControlWhatUi
      languageSlug={languageSlug}
      glossary={glossary}
      projects={projectsWithDates}
      renderContent={renderContent}
      subtitleValue={subtitleValue}
      subtitleError={subtitleError}
      onChangeSubtitle={onChangeSubtitle}
      onSortChange={onSortChange}
      onDeleteProjectClick={onDeleteProjectClick}
      onNewProjectClick={onNewProjectClick}
      sortableDisabled={sortableDisabled}
      onSubmit={onSubmit}
      submitError={submitError}
      submitSuccess={submitSuccess}
      submitting={submitting}
    />
  );
};

export default ControlWhat;
