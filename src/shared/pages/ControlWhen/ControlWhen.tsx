import React, { useEffect, useState } from 'react';

import A from 'Components/A';
import { ArticleState } from 'Modules/Articles/articles.types';
import { GlossaryState } from 'Modules/Languages/languages.types';
import { ImageUpload } from 'Services/ImageUpload';
import { Button, CarouselField, Fade, Hr, SortableItem, SortableList } from '@antoniodcorrea/components';
import { noop } from '@antoniodcorrea/utils';

import './ControlWhen.less';

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
  articles: Array<ArticleState & { date: string }>;
  renderContent: boolean;
  onSortChange: (data: SortableItem) => void;
  onNewArticleClick: () => void;
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

export const ControlWhen: React.FC<Props> = ({
  glossary,
  articles,
  renderContent,
  onSortChange,
  onNewArticleClick,
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
      <div className="ControlWhen">
        <h1 className="ControlWhen-title">{glossary?.control}When</h1>
        <CarouselField
          images={images}
          onChange={onImagesChange}
          onFileUpload={onFileUpload}
          onFileRemove={onFileRemove}
        />
        <Hr spacer />
        <SortableList
          id="ControlWhen-sortable"
          className="ControlWhen-sortable"
          onSortChange={onSortChange}
          handleClass="ControlWhen-sortableItemHandle"
          ghostClass="ControlWhen-ghost"
        >
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
        </SortableList>

        <Button text="Create new article" onClick={onNewArticleClick} />
      </div>
    </Fade>
  );
};
