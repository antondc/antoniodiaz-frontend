import React from 'react';

import Edit from 'Assets/svg/edit-2.svg';
import Move from 'Assets/svg/move-2.svg';
import A from 'Components/A';
import { SortableItem, SortableList } from 'Components/SortableList';
import { GlossaryState } from 'Modules/Languages/languages.types';
import { ProjectState } from 'Modules/Projects/projects.types';
import { Button, Fade, Img } from '@antoniodcorrea/components';

import './ControlWhat.less';

interface Props {
  glossary: GlossaryState;
  projects: Array<ProjectState & { date: string }>;
  renderContent: boolean;
  onSortChange: (data: SortableItem) => void;
  onNewProjectClick: () => void;
}

export const ControlWhat: React.FC<Props> = ({
  glossary,
  projects,
  renderContent,
  onSortChange,
  onNewProjectClick,
}) => (
  <Fade mounted={renderContent} appear>
    <div className="ControlWhat">
      <h1 className="ControlWhat-title">{glossary?.control}What</h1>
      <SortableList
        id="ControlWhat-sortable"
        className="ControlWhat-sortable"
        onSortChange={onSortChange}
        handleClass="ControlWhat-sortableHandle"
      >
        {projects?.map((item) => (
          <li className="ControlWhat-sortableItem" data-id={item.id} data-order={item.order} key={item.order}>
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
              <A href={`/what/${item?.id}`}>
                <Edit className="ControlWhat-sortableIcon ControlWhat-sortableEdit" />
              </A>
              <Move className="ControlWhat-sortableIcon ControlWhat-sortableHandle" />
            </div>
          </li>
        ))}
      </SortableList>
      <Button text="Create new project" onClick={onNewProjectClick} />
    </div>
  </Fade>
);
