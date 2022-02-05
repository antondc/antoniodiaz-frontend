import React from 'react';

import Edit from 'Assets/svg/edit-2.svg';
import Move from 'Assets/svg/move-2.svg';
import Cross from 'Assets/svg/plusCircle.svg';
import A from 'Components/A';
import { BaseFormField, BaseFormSubmit } from 'Components/BaseForm';
import { GlossaryState } from 'Modules/Languages/languages.types';
import { ProjectState } from 'Modules/Projects/projects.types';
import { Button, Fade, Hr, Img, Input, Sortable, SortableSortProps } from '@antoniodcorrea/components';

import './ControlWhat.less';

interface Props {
  languageSlug: string;
  glossary: GlossaryState;
  projects: Array<ProjectState & { date: string }>;
  renderContent: boolean;
  subtitleValue: string;
  subtitleError: string;
  onChangeSubtitle: (e: React.FormEvent<HTMLInputElement>) => void;
  sortableDisabled: boolean;
  onSortChange: (data: SortableSortProps) => void;
  onNewProjectClick: () => void;
  onDeleteProjectClick: (projectId: string) => void;
  submitError: string;
  submitSuccess: boolean;
  submitting: boolean;
  onSubmit: (e: React.FormEvent<HTMLButtonElement>) => void;
}

export const ControlWhat: React.FC<Props> = ({
  languageSlug,
  glossary,
  projects,
  renderContent,
  subtitleValue,
  subtitleError,
  onChangeSubtitle,
  sortableDisabled,
  onSortChange,
  onNewProjectClick,
  onDeleteProjectClick,
  onSubmit,
  submitError,
  submitSuccess,
  submitting,
}) => (
  <Fade mounted={renderContent} appear>
    <div className="ControlWhat">
      <h1 className="ControlWhat-title">{glossary?.what}</h1>
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
      <Sortable
        className="ControlWhat-sortable"
        onSortEnd={onSortChange}
        disabled={sortableDisabled}
        onRemove={onDeleteProjectClick}
      >
        {projects?.map((item) => (
          <div className="ControlWhat-sortableItem" key={item.id} data-id={item.id} data-order={item.order}>
            <Img
              className="ControlWhat-sortableImage"
              title={item.title}
              alt={item.title}
              src={item.carousel[0]?.image['w200h200']}
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
            <div className="ControlWhat-sortableIcons">
              <A href={`/${languageSlug}/control/what/${item?.id}`}>
                <Edit className="ControlWhat-sortableIcon ControlWhat-sortableEdit" />
              </A>
              <Cross className="ControlWhat-sortableIcon ControlWhat-sortableCross" id="Remove" />
              <Move className="ControlWhat-sortableIcon ControlWhat-sortableHandle" />
            </div>
          </div>
        ))}
      </Sortable>
      <Hr spacer size="big" />
      <Button text="Create new project" onClick={onNewProjectClick} />
      <Hr spacer size="big" />
    </div>
  </Fade>
);
