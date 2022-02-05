import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useLoadImages } from 'Hooks/loadImages';
import { selectCurrentLanguageSlug } from 'Modules/Languages/selectors/selectCurrentLanguageSlug';
import { projectsLoad } from 'Modules/Projects/actions/projectsLoad';
import { selectProject } from 'Modules/Projects/selectors/selectProject';
import { RootState } from 'Modules/rootType';
import { selectCurrentRouteParamProjectId } from 'Modules/Routes/selectors/selectCurrentRouteParamProjectId';
import { Project as ProjectUi } from './Project';

export type SlideItem = {
  src: string;
  srcSet: string;
  sizes: string;
  title: string;
  alt: string;
};

const Project: React.FC = () => {
  const dispatch = useDispatch();
  const language = useSelector(selectCurrentLanguageSlug);
  const projectId = useSelector(selectCurrentRouteParamProjectId);
  const project = useSelector((state: RootState) => selectProject(state, Number(projectId)));

  const carouselSlides: SlideItem[] = project?.carousel?.map((item) => ({
    src: item?.images.original,
    srcSet: Object.entries(item?.images)
      .map(([key, value]) => `${value} ${key}`)
      .join(', '),
    sizes: '1200px',
    title: item?.title,
    alt: item?.title,
  }));

  useLoadImages({
    id: 'Project-content',
    className: 'Project-image--loaded',
    data: project,
  });

  useEffect(() => {
    dispatch(projectsLoad());
  }, [language]);

  if (!project?.id) return <div />;

  return <ProjectUi project={project} carouselSlides={carouselSlides} />;
};
export default Project;
