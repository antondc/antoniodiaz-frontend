import React from 'react';

import Cross from 'Assets/svg/cross.svg';
import A from 'Components/A';
import { BaseFormField, BaseFormSubmit } from 'Components/BaseForm';
import { Input } from 'Components/Input';
import { ArticleState } from 'Modules/Articles/articles.types';
import { GlossaryState } from 'Modules/Languages/languages.types';
import { Button, Sortable, SortableSortProps } from '@antoniodcorrea/components';

import './ControlBlog.less';

interface Props {
  articles: Array<ArticleState & { date: string }>;
  onNewArticleClick: () => void;
  onSortChange: (data: SortableSortProps) => void;
  onDeleteArticleClick: (projectId: string) => void;
}

export const ControlBlog: React.FC<Props> = ({ articles, onNewArticleClick, onSortChange, onDeleteArticleClick }) => (
  <div className="ControlBlog">
    <Sortable className="ControlBlog-sortable" onSortEnd={onSortChange} onRemove={onDeleteArticleClick}>
      {articles?.map((item) => (
        <li className="ControlBlog-sortableItem" key={item.id} data-id={item.id} data-order={item.order}>
          <span className="ControlBlog-sortableItemLeft">
            <span className="ControlBlog-sortableItemHandle" id="Handle">
              ≡
            </span>
            <div className="ControlBlog-sortableItemText">
              <A className="ControlBlog-sortableItemTitle" href={`/control/blog/${item.id}`} underlined>
                {item.title}
              </A>
              <div className="ControlBlog-sortableItemDate">{item.date}</div>
            </div>
          </span>
          <span className="ControlBlog-sortableItemRemove">
            <Cross className="ControlBlog-sortableItemRemoveIcon" id="Remove" />
          </span>
        </li>
      ))}
    </Sortable>

    <Button text="Create new article" onClick={onNewArticleClick} />
  </div>
);
