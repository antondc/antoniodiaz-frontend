import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectCurrentGlossary } from 'Modules/Languages/selectors/selectCurrentGlossary';
import { projectsLoad } from 'Modules/Projects/actions/projectsLoad';
import { selectProjectsAll } from 'Modules/Projects/selectors/selectProjectsAll';
import { What as WhatUi } from './What';

const What: React.FC = () => {
  const glossary = useSelector(selectCurrentGlossary);
  const projects = useSelector(selectProjectsAll);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(projectsLoad());
  }, []);

  return <WhatUi glossary={glossary} projects={projects} />;
};
export default What;
