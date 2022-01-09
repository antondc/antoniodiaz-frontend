import React from 'react';

import A from 'Components/A';
import { ArticleState } from 'Modules/Articles/articles.types';
import { GlossaryState } from 'Modules/Languages/languages.types';
import { Button, Fade, SortableItem, SortableList } from '@antoniodcorrea/components';

import './ControlWhen.less';

interface Props {
  glossary: GlossaryState;
  articles: Array<ArticleState & { date: string }>;
  renderContent: boolean;
  onSortChange: (data: SortableItem) => void;
  onNewArticleClick: () => void;
}

export const ControlWhen: React.FC<Props> = ({
  glossary,
  articles,
  renderContent,
  onSortChange,
  onNewArticleClick,
}) => (
  <Fade mounted={renderContent} appear>
    <div className="ControlWhen">
      <h1 className="ControlWhen-title">{glossary?.control}When</h1>
      <SortableList
        className="ControlWhen-sortable"
        onSortChange={onSortChange}
        handleClass="ControlWhen-sortableItemHandle"
        ghostClass="ControlWhen-ghost"
        dragClass="ControlWhen-drag"
        chosenClass="ControlWhen-chosen"
      >
        {articles?.map((item) => (
          <li className="ControlWhen-sortableItem" key={item.id} data-id={item.id} data-order={item.order}>
            <span className="ControlWhen-sortableItemLeft">
              <A className="ControlWhen-sortableItemTitle" href={`/control/when/${item.id}`} underlined>
                {item.title}
              </A>
              <div className="ControlWhen-sortableItemDate">{item.date}</div>
            </span>
            <span className="ControlWhen-sortableItemHandle">≡</span>
          </li>
        ))}
      </SortableList>

      <Button text="Create new article" onClick={onNewArticleClick} />
    </div>
  </Fade>
);
