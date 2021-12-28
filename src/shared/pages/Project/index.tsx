import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { projectsLoad } from 'Modules/Projects/actions/projectsLoad';
import { selectProjectById } from 'Modules/Projects/selectors/selectProjectById';
import { RootState } from 'Modules/rootType';
import { selectCurrentRouteParamLanguage } from 'Modules/Routes/selectors/selectCurrentRouteParamLanguage';
import { selectCurrentRouteParamProjectId } from 'Modules/Routes/selectors/selectCurrentRouteParamProjectId';
import { Project as ProjectUi } from './Project';

const Project: React.FC = () => {
  const dispatch = useDispatch();
  const lang = useSelector(selectCurrentRouteParamLanguage);
  const projectId = useSelector(selectCurrentRouteParamProjectId);
  const project = useSelector((state: RootState) => selectProjectById(state, Number(projectId)));

  const slidesWithData = project?.images?.map((item) => ({
    src: item?.original,
    srcSet: Object.entries(item)
      .map(([key, value]) => `${value} ${key}`)
      .join(', '),
    sizes: '1200px',
    title: project?.translations[lang].title,
    alt: project?.translations[lang].title,
  }));

  useEffect(() => {
    dispatch(projectsLoad());
  }, []);

  if (!project?.id || !project?.translations[lang]) return <div />;

  return <ProjectUi project={project} lang={lang} slidesWithData={slidesWithData} />;
};
export default Project;
