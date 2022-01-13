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

  const slidesWithData = project?.carousel?.map((item) => ({
    src: item?.images.original,
    srcSet: Object.entries(item?.images)
      .map(([key, value]) => `${value} ${key}`)
      .join(', '),
    sizes: '1200px',
    title: item?.title,
    alt: item?.title,
  }));

  useEffect(() => {
    dispatch(projectsLoad());
  }, []);

  // Load embedded html images
  useEffect(() => {
    const imageElements = document.getElementsByTagName('img');
    const imageElementsArray = Array.from(imageElements);

    imageElementsArray.forEach((imageElement) => {
      imageElement.decode().then(() => {
        imageElement.classList.add('Project-image--loaded');
      });
    });
  }, []);

  if (!project?.id) return <div />;

  return <ProjectUi project={project} lang={lang} slidesWithData={slidesWithData} />;
};
export default Project;
