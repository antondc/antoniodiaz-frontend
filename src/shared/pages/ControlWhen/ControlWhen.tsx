import React from 'react';

import A from 'Components/A';
import { ArticleState } from 'Modules/Articles/articles.types';
import { GlossaryState } from 'Modules/Languages/languages.types';
import { Fade, SortableItem, SortableList } from '@antoniodcorrea/components';

import './ControlWhen.less';

interface Props {
  glossary: GlossaryState;
  articles: Array<ArticleState>;
  renderContent: boolean;
  onSortChange: (data: SortableItem) => void;
}

export const ControlWhen: React.FC<Props> = ({ glossary, articles, renderContent, onSortChange }) => (
  <Fade mounted={renderContent} appear>
    <div className="ControlWhen">
      <h1 className="ControlWhen-title">{glossary?.control}When</h1>
      <SortableList onSortChange={onSortChange}>
        {articles?.map((item) => (
          <li className="ControlWhen-sortableItem" key={item.id} data-id={item.id} data-order={item.order}>
            <span>
              item {item.id} — order: {item.order}
            </span>
            <span className="ControlWhen-sortableItemHandle Sortable-handle">≡</span>
          </li>
        ))}
      </SortableList>
      <br />
      <hr />
      <A href="/control/when/new">Create new article</A>
    </div>
  </Fade>
);
