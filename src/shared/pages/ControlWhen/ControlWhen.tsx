import React, { useEffect, useState } from 'react';

import A from 'Components/A';
import { CarouselFieldImages } from 'Components/CarouselFieldImages';
import { ArticleState } from 'Modules/Articles/articles.types';
import { GlossaryState } from 'Modules/Languages/languages.types';
import { ImageUpload } from 'Services/ImageUpload';
import { Button, Fade, Hr, SortableItem, SortableList } from '@antoniodcorrea/components';

import './ControlWhen.less';

const emptyImage = {
  id: 0,
  order: 0,
  src: '',
  sizes: '',
  srcSet: '',
  title: '',
  alt: '',
};

const incomingImages: Image[] = [
  {
    id: 1,
    order: 0,
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
  const [percentCompleted, setPercentCompleted] = useState<number>(0);

  const imageUploadService = new ImageUpload();

  const onImagesChange = (images) => {
    const sortedImages = images.sort((prevItem, nextItem) => prevItem.order - nextItem.order);
    setImages(sortedImages);
  };

  const onAdd = () => {
    setImages([...images, { ...emptyImage }]);
  };

  const onRemove = (images) => {
    setImages(images);
  };

  const onFileUpload = async (file) => {
    if (!imageUploadService) {
      return;
    }

    try {
      const data = await imageUploadService.uploadFileToServer({
        file,
        setPercentCompleted,
      });
      const ids = images.map((item) => item.id);
      const newId = Math.max(...ids) + 1;
      const orders = images.map((item) => item.order);
      const newOrder = Math.max(...orders) + 1;

      const imagesWithNew = images.map((item) => {
        if (item.src) {
          return item;
        }

        return {
          id: newId,
          order: newOrder,
          src: data.image,
          sizes: data.image,
          srcSet: data.image,
          title: data.image,
          alt: data.image,
        };
      });
      setImages(imagesWithNew);

      return true;
    } catch (error) {
      console.log(error);
    }
  };

  const onRemoved = (): void => {
    //
  };

  const onFileRemove = (src: string) => {
    if (!imageUploadService) {
      return;
    }

    try {
      imageUploadService.removeFileFromServer({
        src,
        onRemoved,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const sortedImages = incomingImages.sort((prevItem, nextItem) => prevItem.order - nextItem.order);
    setImages(sortedImages);
  }, []);

  return (
    <Fade mounted={renderContent} appear>
      <div className="ControlWhen">
        <h1 className="ControlWhen-title">{glossary?.control}When</h1>
        <CarouselFieldImages
          images={images}
          onChange={onImagesChange}
          onAdd={onAdd}
          onRemove={onRemove}
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
          dragClass="ControlWhen-drag"
          chosenClass="ControlWhen-chosen"
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
