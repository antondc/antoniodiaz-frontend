import React, { useEffect, useState } from 'react';

import A from 'Components/A';
import { GlossaryState } from 'Modules/Languages/languages.types';
import { ProjectState } from 'Modules/Projects/projects.types';
import { ImageUpload } from 'Services/ImageUpload';
import { Button, CarouselField, Fade, Hr, SortableItem, SortableList } from '@antoniodcorrea/components';
import { noop } from '@antoniodcorrea/utils';

import './ControlWhat.less';

const incomingImages: Image[] = [
  {
    id: 1,
    order: 10,
    src: 'https://picsum.photos/id/100/1000',
    sizes: '',
    srcSet: '',
    title: 'https://picsum.photos/id/100/1000',
    alt: 'https://picsum.photos/id/100/1000',
  },
  {
    id: 2,
    order: 1,
    src: 'https://picsum.photos/id/200/1000',
    sizes: '',
    srcSet: '',
    title: 'https://picsum.photos/id/200/1000',
    alt: 'https://picsum.photos/id/200/1000',
  },
  {
    id: 3,
    order: 2,
    src: 'https://picsum.photos/id/301/1000',
    sizes: '',
    srcSet: '',
    title: 'https://picsum.photos/id/301/1000',
    alt: 'https://picsum.photos/id/301/1000',
  },
  {
    id: 4,
    order: 3,
    src: 'https://picsum.photos/id/400/1000',
    sizes: '',
    srcSet: '',
    title: 'https://picsum.photos/id/400/1000',
    alt: 'https://picsum.photos/id/400/1000',
  },
];

interface Props {
  glossary: GlossaryState;
  projects: Array<ProjectState & { date: string }>;
  renderContent: boolean;
  onSortChange: (data: SortableItem) => void;
  onNewProjectClick: () => void;
}

type Image = {
  id: number;
  order: number;
  title: string;
  src: string;
  sizes: string;
  srcSet: string;
  alt: string;
};

export const ControlWhat: React.FC<Props> = ({
  glossary,
  projects,
  renderContent,
  onSortChange,
  onNewProjectClick,
}) => {
  const [images, setImages] = useState<Array<Image>>([]);
  const [_, setPercentCompleted] = useState<number>(0);

  const imageUploadService = new ImageUpload();

  const onImagesChange = (images) => {
    setImages(images);
  };

  const onFileUpload = async (file): Promise<{ image: string }> => {
    if (!imageUploadService) {
      return;
    }

    try {
      const data = await imageUploadService.uploadFileToServer({
        file,
        setPercentCompleted,
      });

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const onFileRemove = async (src: string) => {
    if (!imageUploadService) {
      return;
    }

    try {
      await imageUploadService.removeFileFromServer({
        src,
        onRemoved: noop,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setImages(incomingImages);
  }, []);

  return (
    <Fade mounted={renderContent} appear>
      <div className="ControlWhat">
        <h1 className="ControlWhat-title">{glossary?.control}What</h1>
        <CarouselField
          images={images}
          onChange={onImagesChange}
          onFileUpload={onFileUpload}
          onFileRemove={onFileRemove}
        />
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
                <A className="ControlWhat-sortableItemTitle" href={`/control/when/${item.id}`} underlined>
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
};
