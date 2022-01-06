import React from 'react';

import A from 'Components/A';
import { GlossaryState } from 'Modules/Languages/languages.types';
import { ProjectState } from 'Modules/Projects/projects.types';

import './What.less';

interface Props {
  glossary: GlossaryState;
  projects: ProjectState[];
}

export const What: React.FC<Props> = ({ glossary, projects }) => (
  <div className="What">
    <div className="What-content">
      <div className="What-title">{glossary.what}</div>
      <div className="What-text">{glossary.whatSubtitle}</div>
      <div className="What-gridWrapper">
        {projects.map((item, index) => (
          <A href={`/what/${item.id}`} className="What-gridItem isLoading" data-id={index} key={index}>
            <img
              className="What-gridImage"
              src={item.images[0].original}
              sizes="600px"
              srcSet={
                item.images[0].w200 +
                ' 200w, ' +
                item.images[0].w400 +
                ' 400w, ' +
                item.images[0].w1200 +
                ' 1200w, ' +
                item.images[0].w2400 +
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
          </A>
        ))}
      </div>
    </div>
  </div>
);
