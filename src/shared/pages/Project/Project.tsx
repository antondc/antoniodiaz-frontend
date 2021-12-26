// https://www.npmjs.com/package/@ant-design/react-slick

import React from 'react';

import { ProjectState } from 'Modules/Projects/projects.types';
import Slider from '@ant-design/react-slick';

import './Project.less';

interface Props {
  lang: string;
  project: ProjectState;
}

export const Project: React.FC<Props> = ({ lang, project }) => (
  <div className="Project">
    <Slider
      className="Project-slider"
      dots={true}
      infinite={true}
      speed={500}
      slidesToShow={1}
      slidesToScroll={1}
      autoplay
    >
      <div className="Project-slide">
        <img
          className="Project-slideImage"
          src="https://antoniodiaz.me:3000/project_images_img/original/bddd115f-2142-4eef-a249-84c0a9411ae5.png"
        />
      </div>
      <div className="Project-slide">
        <img
          className="Project-slideImage"
          src="https://antoniodiaz.me:3000/project_images_img/original/4aec89fb-3dcb-4000-88fb-066af839e42a.png"
        />
      </div>
      <div className="Project-slide">
        <img
          className="Project-slideImage"
          src="https://antoniodiaz.me:3000/project_images_img/original/4aec89fb-3dcb-4000-88fb-066af839e42a.png"
        />
      </div>
    </Slider>

    <div className="Project-content">
      <div className="Project-title">{project.translations[lang]?.title}</div>
      <div className="Project-subtitle">{project.translations[lang]?.subtitle}</div>
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
      <div>{project.translations[lang].description}</div>
    </div>
  </div>
);
