import React from 'react';

import Cross from 'Assets/svg/cross.svg';
import A from 'Components/A';
import { ArticleState } from 'Modules/Articles/articles.types';
import { Button, Sortable, SortableSortProps } from '@antoniodcorrea/components';

import './Control.less';

interface Props {
  articles: Array<ArticleState & { date: string }>;
  onNewArticleClick: () => void;
  onSortChange: (data: SortableSortProps) => void;
  onDeleteArticleClick: (projectId: string) => void;
}

export const Control: React.FC<Props> = ({ articles, onNewArticleClick, onSortChange, onDeleteArticleClick }) => (
  <div className="Control">
    <Sortable className="Control-sortable" onSortEnd={onSortChange} onRemove={onDeleteArticleClick}>
      {articles?.map((item) => (
        <li
          className="Control-sortableItem"
          key={item.id}
          data-id={item.id} data-order={item.order}
         >
          <div className="Control-sortableItemLeft">
            <span className="Control-sortableItemHandle Sortable-sortableItemHandle Sortable-handle" id="handle">
              ≡
            </span>
            <div className="Control-sortableItemText">
              <A className="Control-sortableItemTitle" href={`/control/blog/${item.id}`} underlined>
                {item.title}
              </A>
              <div className="Control-sortableItemDate">{item.date}</div>
            </div>
          </div>
          <span className="Control-sortableItemRemove">
            <Cross className="Control-sortableItemRemoveIcon" id="Remove" />
          </span>
        </li>
      ))}
    </Sortable>

    <Button text="Create new article" onClick={onNewArticleClick} />
  </div>
);
