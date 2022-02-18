import React from 'react';
import Helmet from 'react-helmet';

import BaseCarousel from 'Components/BaseCarousel';
import Footer from 'Components/Footer';
import { StyledContent } from 'Components/StyledContent';
import { GlossaryState } from 'Modules/Languages/languages.types';
import { ProjectState } from 'Modules/Projects/projects.types';
import { SERVER_URL } from 'Root/webpack/constants';
import { A, HtmlSanitizer, Img } from '@antoniodcorrea/components';
import { SlideItem } from '.';

import './Project.less';

interface Props {
  project: ProjectState;
  carouselSlides: Array<SlideItem>;
  glossary: GlossaryState;
}

export const Project: React.FC<Props> = ({ project, carouselSlides, glossary }) => (
  <>
    <Helmet>
      <title>{`${glossary.author} · ${project?.title}`}</title>
      <meta property="og:title" content={`${project?.title}`} />
      <meta property="og:image" content={project?.carousel[0]?.image?.original} />
      <meta property="twitter:title" content={`${project?.title}`} />
      <meta property="twitter:image" content={project?.carousel[0]?.image?.original} />
    </Helmet>
    <div className="Project" id="Project">
      <div className="Project-title">{project?.title}</div>
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
      <StyledContent id="Project-content">
        <HtmlSanitizer html={project?.contentHtml} />
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
    <Footer />
  </>
);
