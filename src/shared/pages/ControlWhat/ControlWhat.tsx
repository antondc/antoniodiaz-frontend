import React from 'react';

import Edit from 'Assets/svg/edit-2.svg';
import Move from 'Assets/svg/move-2.svg';
import Cross from 'Assets/svg/plusCircle.svg';
import A from 'Components/A';
import { GlossaryState } from 'Modules/Languages/languages.types';
import { ProjectState } from 'Modules/Projects/projects.types';
import { Button, Fade, Hr, Img, Sortable, SortableSortProps } from '@antoniodcorrea/components';

import './ControlWhat.less';

interface Props {
  languageSlug: string;
  glossary: GlossaryState;
  projects: Array<ProjectState & { date: string }>;
  renderContent: boolean;
  sortableDisabled: boolean;
  onSortChange: (data: SortableSortProps) => void;
  onNewProjectClick: () => void;
  onDeleteProjectClick: (projectId: number) => void;
}

export const ControlWhat: React.FC<Props> = ({
  languageSlug,
  glossary,
  projects,
  renderContent,
  sortableDisabled,
  onSortChange,
  onNewProjectClick,
  onDeleteProjectClick,
}) => (
  <Fade mounted={renderContent} appear>
    <div className="ControlWhat">
      <h1 className="ControlWhat-title">{glossary?.control}What</h1>
      <Sortable className="ControlWhat-sortable" onSortEnd={onSortChange} disabled={sortableDisabled}>
        {projects?.map((item) => (
          <div
            className="ControlWhat-sortableItem"
            key={item.id}
            data-id={item.id}
            data-order={item.order}
            style={{ border: '1px solid', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <Img
              className="ControlWhat-sortableImage"
              title={item.title}
              alt={item.title}
              src={item.carousel[0].images['original']}
              sizes="600px"
              srcSet={
                item.carousel[0].images['w200'] +
                ' 200w, ' +
                item.carousel[0].images['w400'] +
                ' 400w, ' +
                item.carousel[0].images['w1200'] +
                ' 1200w, ' +
                item.carousel[0].images['w2400'] +
                ' 2400w, '
              }
            />
            <div className="ControlWhat-sortableIcons">
              <A href={`/${languageSlug}/control/what/${item?.id}`}>
                <Edit className="ControlWhat-sortableIcon ControlWhat-sortableEdit" />
              </A>
              <Cross
                className="ControlWhat-sortableIcon ControlWhat-sortableCross"
                onClick={(e) => {
                  e.preventDefault();
                  onDeleteProjectClick(item?.id);
                }}
              />
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
