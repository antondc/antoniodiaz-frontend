import React from 'react';

import A from 'Components/A';
import { BaseFormField, BaseFormSubmit } from 'Components/BaseForm';
import { ArticleState } from 'Modules/Articles/articles.types';
import { GlossaryState } from 'Modules/Languages/languages.types';
import { Button, Fade, Input, Sortable, SortableSortProps } from '@antoniodcorrea/components';

import './ControlWhen.less';

interface Props {
  glossary: GlossaryState;
  articles: Array<ArticleState & { date: string }>;
  renderContent: boolean;
  onNewArticleClick: () => void;
  onSortChange: (data: SortableSortProps) => void;
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
  renderContent,
  onNewArticleClick,
  subtitleValue,
  subtitleError,
  onChangeSubtitle,
  onSortChange,
  onSubmit,
  submitError,
  submitSuccess,
  submitting,
}) => (
  <Fade mounted={renderContent} appear>
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
      <Sortable className="ControlWhen-sortable" onSortEnd={onSortChange}>
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
      </Sortable>

      <Button text="Create new article" onClick={onNewArticleClick} />
    </div>
  </Fade>
);
