import React from 'react';
import ReactHtmlParser from 'react-html-parser';

import BaseCarousel from 'Components/BaseCarousel';
import { ProjectState } from 'Modules/Projects/projects.types';
import { Img } from '@antoniodcorrea/components';
import { SlideItem } from '.';
import { slides } from './constants';

import './Project.less';

interface Props {
  project: ProjectState;
  carouselSlides: Array<SlideItem>;
}

export const Project: React.FC<Props> = ({ project, carouselSlides }) => (
  <div className="Project">
    <div className="Project-title">{project?.title}</div>
    {!!slides.length && (
      <BaseCarousel>
        {carouselSlides?.map((item) => (
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
    )}
    <div className="Project-content" id="Project-content">
      {ReactHtmlParser(project?.contentHtml)}
    </div>
  </div>
);
