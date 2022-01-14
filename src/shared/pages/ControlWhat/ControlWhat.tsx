import React from 'react';

import A from 'Components/A';
import { GlossaryState } from 'Modules/Languages/languages.types';
import { ProjectState } from 'Modules/Projects/projects.types';
import {
  Button,
  CarouselField,
  CarouselFieldImage,
  Fade,
  Hr,
  SortableItem,
  SortableList,
} from '@antoniodcorrea/components';

import './ControlWhat.less';

interface Props {
  glossary: GlossaryState;
  projects: Array<ProjectState & { date: string }>;
  renderContent: boolean;
  onSortChange: (data: SortableItem) => void;
  onNewProjectClick: () => void;
  carouselImages: CarouselFieldImage[];
  onImagesChange: (images) => void;
  onFileUpload: (file: File) => Promise<{ image: string }>;
  onFileRemove: (src: string) => Promise<void>;
  onCarouselSave: () => void;
}

export const ControlWhat: React.FC<Props> = ({
  glossary,
  projects,
  renderContent,
  onSortChange,
  onNewProjectClick,
  carouselImages,
  onImagesChange,
  onFileUpload,
  onFileRemove,
  onCarouselSave,
}) => (
  <Fade mounted={renderContent} appear>
    <div className="ControlWhat">
      <h1 className="ControlWhat-title">{glossary?.control}What</h1>
      <CarouselField
        images={carouselImages}
        onChange={onImagesChange}
        onFileUpload={onFileUpload}
        onFileRemove={onFileRemove}
      />
      <Button text="Save" onClick={onCarouselSave} />
      <Hr spacer />
      <SortableList
        id="ControlWhat-sortable"
        className="ControlWhat-sortable"
        onSortChange={onSortChange}
        handleClass="ControlWhat-sortableItemHandle"
        ghostClass="ControlWhat-ghost"
      >
        {projects?.map((item) => (
          <li className="ControlWhat-sortableItem" key={item.id} data-id={item.id} data-order={item.order}>
            <span className="ControlWhat-sortableItemLeft">
              <A className="ControlWhat-sortableItemTitle" href={`/control/what/${item.id}`} underlined>
                {item.title}
              </A>
              <div className="ControlWhat-sortableItemDate">{item.date}</div>
            </span>
            <span className="ControlWhat-sortableItemHandle">≡</span>
          </li>
        ))}
      </SortableList>
      <Button text="Create new project" onClick={onNewProjectClick} />
    </div>
  </Fade>
);
