import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectCurrentGlossary } from 'Modules/Languages/selectors/selectCurrentGlossary';
import { selectCurrentLanguageSlug } from 'Modules/Languages/selectors/selectCurrentLanguageSlug';
import { selectLanguageLoading } from 'Modules/Languages/selectors/selectLanguageLoading';
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
  const language = useSelector(selectCurrentLanguageSlug);
  const glossary = useSelector(selectCurrentGlossary);
  const projects = useSelector(selectProjectsCurrent);
  const languageLoading = useSelector(selectLanguageLoading);
  const renderContent = !languageLoading && projects?.every((item) => item.language === language);

  const projectsWithDates = projects.map((item) => {
    const date = new LocaleFormattedDate({ unixTime: Number(item?.createdAt), locale: language });
    const formattedDate = date.getLocaleFormattedDate();

    return {
      ...item,
      date: formattedDate,
    };
  });

  const onSortChange = async (sortableItem: SortableItem) => {
    await dispatch(
      projectSortOne({
        projectId: sortableItem.id,
        order: sortableItem.order,
      })
    );
    dispatch(projectsLoad());
  };

  const onNewProjectClick = () => {
    history.push(`/${language}/control/when/new`);
  };

  useEffect(() => {
    dispatch(projectsLoad());
  }, [language]);

  return (
    <ControlWhatUi
      glossary={glossary}
      projects={projectsWithDates}
      renderContent={renderContent}
      onSortChange={onSortChange}
      onNewProjectClick={onNewProjectClick}
    />
  );
};

export default ControlWhat;
