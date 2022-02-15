import React from 'react';

import Cross from 'Assets/svg/cross.svg';
import A from 'Components/A';
import { BaseFormField, BaseFormSubmit } from 'Components/BaseForm';
import { ArticleState } from 'Modules/Articles/articles.types';
import { GlossaryState } from 'Modules/Languages/languages.types';
import { Button, Input, Sortable, SortableSortProps } from '@antoniodcorrea/components';

import './ControlWhen.less';

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

export const ControlWhen: React.FC<Props> = ({
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
  <div className="ControlWhen">
    <h1 className="ControlWhen-title">{glossary?.when}</h1>
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
    <Sortable className="ControlWhen-sortable" onSortEnd={onSortChange} onRemove={onDeleteArticleClick}>
      {articles?.map((item) => (
        <li className="ControlWhen-sortableItem" key={item.id} data-id={item.id} data-order={item.order}>
          <span className="ControlWhen-sortableItemLeft">
            <span className="ControlWhen-sortableItemHandle" id="Handle">
              ≡
            </span>
            <div className="ControlWhen-sortableItemText">
              <A className="ControlWhen-sortableItemTitle" href={`/control/when/${item.id}`} underlined>
                {item.title}
              </A>
              <div className="ControlWhen-sortableItemDate">{item.date}</div>
            </div>
          </span>
          <span className="ControlWhen-sortableItemRemove">
            <Cross className="ControlWhen-sortableItemRemoveIcon" id="Remove" />
          </span>
        </li>
      ))}
    </Sortable>

    <Button text="Create new article" onClick={onNewArticleClick} />
  </div>
);
