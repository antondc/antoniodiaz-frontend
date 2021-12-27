import React from 'react';

import Carousel from 'Components/Carousel';
import { ProjectState } from 'Modules/Projects/projects.types';

import './Project.less';

interface Props {
  lang: string;
  project: ProjectState;
}

export const Project: React.FC<Props> = ({ lang, project }) => (
  <div className="Project">
    <div className="Project-content">
      <div className="Project-title">{project.translations[lang]?.title}</div>
      <div className="Project-subtitle">{project.translations[lang]?.subtitle}</div>
      <Carousel
        slides={[
          {
            image: {
              w1200: 'https://antoniodiaz.me:3000/project_images_img/original/bddd115f-2142-4eef-a249-84c0a9411ae5.png',
              w400: 'https://antoniodiaz.me:3000/project_images_img/w400/bddd115f-2142-4eef-a249-84c0a9411ae5.png',
            },
            title: 'title 1',
          },
          {
            image: {
              w1200: 'https://antoniodiaz.me:3000/project_images_img/original/343d7954-bb23-4422-a79f-e58611b8b366.png',
              w400: 'https://antoniodiaz.me:3000/project_images_img/w400/343d7954-bb23-4422-a79f-e58611b8b366.png',
            },
            title: 'title 2',
          },
          {
            image: {
              w1200: 'https://antoniodiaz.me:3000/project_images_img/original/2105f946-dac2-458b-ab6a-4dad6b9e0b12.png',
              w400: 'https://antoniodiaz.me:3000/project_images_img/w400/2105f946-dac2-458b-ab6a-4dad6b9e0b12.png',
            },
            title: 'title 3',
          },
        ]}
      />
    </div>
  </div>
);
