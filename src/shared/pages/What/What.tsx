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
              src={item.carousel[0]?.image['w600h600']}
              sizes="w1200h1200"
              srcSet={
                item.carousel[0]?.image['w200h200'] +
                ' 200w, ' +
                item.carousel[0]?.image['w600h600'] +
                ' 600w, ' +
                item.carousel[0]?.image['w1200h1200'] +
                ' 1200w, '
              }
            />
          </A>
        ))}
      </div>
    </div>
  </div>
);
