import React from 'react';

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
      <div className="What-title">
        {glossary.what}
        <span className="What-icon">🤖</span>
      </div>
      <div className="What-text">{glossary.whatSubtitle}</div>
      <div className="What-gridWrapper">
        {projects.map((item, index) => (
          <div
            className="What-gridItem isLoading"
            data-id={index}
            key={index}
            // onClick={() => {
            //   this.state.activeIndex !== index
            //     ? this.setState({ activeIndex: index, itemPopup: item })
            //     : this.setState({ activeIndex: null, itemPopup: null });
            // }}
          >
            <img
              className="What-gridImage"
              src={item.image.w1200}
              sizes="600px"
              srcSet={
                item.image.w200 +
                ' 200w, ' +
                item.image.w400 +
                ' 400w, ' +
                item.image.w1200 +
                ' 1200w, ' +
                item.image.w2400 +
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
          </div>
        ))}
      </div>
    </div>
  </div>
);
