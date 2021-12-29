import React from 'react';

import BaseCarousel from 'Components/BaseCarousel';
import Img from 'Components/Img';
import { ProjectState } from 'Modules/Projects/projects.types';

import './Project.less';

type SlideItem = {
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
      <BaseCarousel>
        {slidesWithData?.map((item) => (
          <div className="Project-slide" key={item.src}>
            <Img
              className="Project-slideImage"
              src={item.src}
              sizes={item.sizes}
              srcSet={item.srcSet}
              title={item.title}
              alt={item.title}
            />
          </div>
        ))}
      </BaseCarousel>
      <div className="Project-subtitle">{project.translations[lang]?.subtitle}</div>
    </div>
  </div>
);
