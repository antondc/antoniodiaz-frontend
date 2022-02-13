import React from 'react';

import BaseCarousel from 'Components/BaseCarousel';
import { StyledContent } from 'Components/StyledContent';
import { ProjectState } from 'Modules/Projects/projects.types';
import { SERVER_URL } from 'Root/webpack/constants';
import { A, HtmlSanitizer, Img } from '@antoniodcorrea/components';
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
    <StyledContent id="Project-content">
      <HtmlSanitizer html={project.contentHtml} />
    </StyledContent>
    {!!project?.files?.length && (
      <>
        <hr />
        <h3>Files</h3>
        {project?.files?.map((item) => (
          <A className="Project-file" href={SERVER_URL + item.url} key={item.url} styled={false} targetBlank>
            {item.name}
          </A>
        ))}
      </>
    )}
  </div>
);
