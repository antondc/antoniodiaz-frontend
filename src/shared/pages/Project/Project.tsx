import React from 'react';

import BaseCarousel from 'Components/BaseCarousel';
import { ProjectState } from 'Modules/Projects/projects.types';

import './Project.less';

type SlideItem = {
  id: number;
  src: string;
  srcSet: string;
  sizes: string;
  title: string;
  alt: string;
};

interface Props {
  lang: string;
  project: ProjectState;
  slidesWithData: Array<SlideItem>;
}

export const Project: React.FC<Props> = ({ lang, project, slidesWithData }) => (
  <div className="Project">
    <div className="Project-content">
      <div className="Project-title">{project.translations[lang]?.title}</div>
      <img
        className="Project-image"
        src={project.image.w1200}
        sizes="600px"
        srcSet={
          project.image.w200 +
          ' 200w, ' +
          project.image.w400 +
          ' 400w, ' +
          project.image.w1200 +
          ' 1200w, ' +
          project.image.w2400 +
          ' 2400w, '
        }
        ref={(input) => {
          if (!input) {
            return;
          }
          const img = input;
          const updateFunc = () => {
            img.parentElement.classList.remove('isLoading');
            img.classList.add('isLoaded');
          };
          img.onload = updateFunc;
          if (img.complete) {
            updateFunc();
          }
        }}
      />
      <div className="Project-subtitle">{project.translations[lang]?.subtitle}</div>
    </div>
  </div>
);
