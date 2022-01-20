import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectCurrentGlossary } from 'Modules/Languages/selectors/selectCurrentGlossary';
import { selectCurrentLanguageSlug } from 'Modules/Languages/selectors/selectCurrentLanguageSlug';
import { selectLanguageLoading } from 'Modules/Languages/selectors/selectLanguageLoading';
import { projectDeleteOne } from 'Modules/Projects/actions/projectDeleteOne';
import { projectsLoad } from 'Modules/Projects/actions/projectsLoad';
import { projectSortOne } from 'Modules/Projects/actions/projectSortOne';
import { selectProjectsCurrent } from 'Modules/Projects/selectors/selectProjectsCurrent';
import history from 'Services/History';
import { SortableItem } from '@antoniodcorrea/components';
import { LocaleFormattedDate } from '@antoniodcorrea/utils';
import { ControlWhat as ControlWhatUi } from './ControlWhat';

import './ControlWhat.less';

const ControlWhat: React.FC = () => {
  const dispatch = useDispatch();
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

  const onSortChange = (sortableItem: SortableItem) => {
    dispatch(
      projectSortOne({
        projectId: sortableItem.id,
        order: sortableItem.order,
      })
    );
  };

  const onDeleteProjectClick = (projectId: number) => {
    if (!confirm('Are you sure?')) return;

    dispatch(projectDeleteOne(projectId));
  };

  const onNewProjectClick = () => {
    history.push(`/${languageSlug}/control/what/new`);
  };

  useEffect(() => {
    dispatch(projectsLoad());
  }, [languageSlug]);

  return (
    <ControlWhatUi
      languageSlug={languageSlug}
      glossary={glossary}
      projects={projectsWithDates}
      renderContent={renderContent}
      onSortChange={onSortChange}
      onDeleteProjectClick={onDeleteProjectClick}
      onNewProjectClick={onNewProjectClick}
    />
  );
};

export default ControlWhat;
