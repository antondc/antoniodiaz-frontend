import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useLoadInitialData } from 'Hooks/useLoadInitialData';
import { selectCurrentGlossary } from 'Modules/Languages/selectors/selectCurrentGlossary';
import { projectsLoad } from 'Modules/Projects/actions/projectsLoad';
import { selectProjectsAll } from 'Modules/Projects/selectors/selectProjectsAll';
import { What as WhatUi } from './What';

const What: React.FC = () => {
  const dispatch = useDispatch();
  const glossary = useSelector(selectCurrentGlossary);
  const projects = useSelector(selectProjectsAll);

  const loadInitialData = async () => {
    await dispatch(projectsLoad());
  };
  useLoadInitialData({ loadInitialData });

  return <WhatUi glossary={glossary} projects={projects} />;
};
export default What;
