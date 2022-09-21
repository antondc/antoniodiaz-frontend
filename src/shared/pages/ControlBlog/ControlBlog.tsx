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
  glossary: GlossaryState;
  articles: Array<ArticleState & { date: string }>;
  onNewArticleClick: () => void;
  onSortChange: (data: SortableSortProps) => void;
  onDeleteArticleClick: (projectId: string) => void;
  subtitleValue: string;
  subtitleError: string;
  onChangeSubtitle: (e: React.FormEvent<HTMLInputElement>) => void;
  submitError: string;
  submitSuccess: boolean;
  submitting: boolean;
  onSubmit: (e: React.FormEvent<HTMLButtonElement>) => void;
}

export const ControlBlog: React.FC<Props> = ({
  glossary,
  articles,
  onNewArticleClick,
  subtitleValue,
  subtitleError,
  onChangeSubtitle,
  onSortChange,
  onDeleteArticleClick,
  onSubmit,
  submitError,
  submitSuccess,
  submitting,
}) => (
  <div className="ControlBlog">
    <h1 className="ControlBlog-title">{glossary?.when}</h1>
    <BaseFormField>
      <Input
        name="subtitle"
        type="text"
        label="Name or Email"
        onChange={onChangeSubtitle}
        onBlur={onChangeSubtitle}
        value={subtitleValue}
        error={subtitleError}
        grow
      />
    </BaseFormField>
    <BaseFormSubmit>
      <Button
        text="Submit"
        type="submit"
        onClick={onSubmit}
        error={!!submitError}
        success={submitSuccess}
        disabled={false}
        loading={submitting}
        grow
      />
    </BaseFormSubmit>
    <Sortable className="ControlBlog-sortable" onSortEnd={onSortChange} onRemove={onDeleteArticleClick}>
      {articles?.map((item) => (
        <li className="ControlBlog-sortableItem" key={item.id} data-id={item.id} data-order={item.order}>
          <span className="ControlBlog-sortableItemLeft">
            <span className="ControlBlog-sortableItemHandle" id="Handle">
              ≡
            </span>
            <div className="ControlBlog-sortableItemText">
              <A className="ControlBlog-sortableItemTitle" href={`/control/when/${item.id}`} underlined>
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
