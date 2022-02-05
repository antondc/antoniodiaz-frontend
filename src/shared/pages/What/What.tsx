import React from 'react';

import A from 'Components/A';
import { GlossaryState } from 'Modules/Languages/languages.types';
import { ProjectState } from 'Modules/Projects/projects.types';
import { Img } from '@antoniodcorrea/components';

import './What.less';

interface Props {
  glossary: GlossaryState;
  projects: Array<ProjectState>;
}

export const What: React.FC<Props> = ({ glossary, projects }) => (
  <div className="What">
    <div className="What-content">
      <div className="What-title">{glossary.what}</div>
      <div className="What-text">{glossary.whatSubtitle}</div>
      <div className="What-gridWrapper">
        {projects?.map((item, index) => (
          <A href={`/what/${item?.id}`} className="What-gridItem" data-id={index} key={index}>
            <Img
              className="What-gridImage"
              title={item.title}
              alt={item.title}
              src={item.carousel[0]?.images['original']}
              sizes="600px"
              srcSet={
                item.carousel[0]?.images['w200'] +
                ' 200w, ' +
                item.carousel[0]?.images['w400'] +
                ' 400w, ' +
                item.carousel[0]?.images['w1200'] +
                ' 1200w, ' +
                item.carousel[0]?.images['w2400'] +
                ' 2400w, '
              }
            />
          </A>
        ))}
      </div>
    </div>
  </div>
);
