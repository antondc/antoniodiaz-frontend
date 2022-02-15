import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useLoadImages } from 'Hooks/loadImages';
import { useCachedData } from 'Hooks/useCachedData';
import { useHljs } from 'Hooks/useHljs';
import { useLoadInitialData } from 'Hooks/useLoadInitialData';
import { projectsLoad } from 'Modules/Projects/actions/projectsLoad';
import { ProjectState } from 'Modules/Projects/projects.types';
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
  const projectId = useSelector(selectCurrentRouteParamProjectId);
  const project = useSelector((state: RootState) => selectProject(state, Number(projectId)));

  const loadInitialData = async () => {
    await dispatch(projectsLoad());
  };
  useLoadInitialData({ loadInitialData });
  const cachedProject = useCachedData<ProjectState>(project);

  useHljs({ data: project });

  const carouselSlides: SlideItem[] = project?.carousel?.map((item) => ({
    src: item?.image['600w'],
    srcSet: Object.entries(item?.image)
      .map(([key, value]) => `${value} ${key}`)
      .join(', '),
    sizes: '1200w',
    title: item?.title,
    alt: item?.title,
  }));

  useLoadImages({
    id: 'Project-content',
    className: 'Project-image--loaded',
    data: project,
  });

  return <ProjectUi project={cachedProject} carouselSlides={carouselSlides} />;
};
export default Project;
