import React from 'react';

import A from 'Components/A';
import { ArticleState } from 'Modules/Articles/articles.types';
import { GlossaryState } from 'Modules/Languages/languages.types';
import { Fade } from '@antoniodcorrea/components';

import './ControlWhen.less';

interface Props {
  glossary: GlossaryState;
  articles: Array<ArticleState>;
  renderContent: boolean;
}

export const ControlWhen: React.FC<Props> = ({ glossary, articles, renderContent }) => (
  <Fade mounted={renderContent} appear>
    <div className="ControlWhen">
      <h1 className="ControlWhen-title">{glossary?.control}When</h1>
      <ul>
        {articles?.map((item) => (
          <li key={item.id}>
            <A href={`control/when/${item.id}`}>{item.title}</A>
          </li>
        ))}
      </ul>
      <A href="/control/when/new">Create new article</A>
    </div>
  </Fade>
);
