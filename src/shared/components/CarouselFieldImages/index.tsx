import React, { useEffect, useState } from 'react';

import Cross from 'Assets/svg/cross.svg';
import Plus from 'Assets/svg/plusCircle.svg';
import { ImageField, Input, SortableList } from '@antoniodcorrea/components';

import './CarouselFieldImages.less';

export const emptyImage = {
  id: 0,
  order: 0,
  src: '',
  sizes: '',
  srcSet: '',
  title: '',
  alt: '',
};

type Image = {
  id: number;
  order: number;
  title: string;
  src: string;
};

interface Props {
  images: Array<Image>;
  onChange: (images: Array<Image>) => void;
  onFileUpload: (file: File) => Promise<{ image: string }>;
  onFileRemove?: (url: string) => Promise<void>;
}

export const CarouselFieldImages: React.FC<Props> = ({ images, onChange, onFileUpload, onFileRemove }) => {
  const [currentSlide, setCurrentSlide] = useState<Image>(undefined);
  const [listImages, setListImages] = useState<Array<Image>>(images);
  const sortedImages = listImages.sort((prev, next) => prev.order - next.order);

  function onSortChange(image: Partial<Image>) {
    const imageFound = sortedImages?.find((item) => item.id === image.id);
    const originalOrder = imageFound?.order;
    const directionUp = image.order > originalOrder;

    const selectionModified = sortedImages.map((item) => {
      if (directionUp) {
        if (item.order > originalOrder && item.order <= image.order) {
          return {
            ...item,
            order: item.order - 1,
          };
        } else if (item.id === image.id) {
          return {
            ...item,
            order: image.order,
          };
        }
      } else {
        if (item.order < originalOrder && item.order >= image.order) {
          return {
            ...item,
            order: item.order + 1,
          };
        } else if (item.id === image.id) {
          return {
            ...item,
            order: image.order,
          };
        }
      }

      return item;
    });

    const currentImage = selectionModified.find((item) => item.id === currentSlide?.id);

    onChange(selectionModified);
    setCurrentSlide(currentImage);
  }

  const onImageListClick = (item: Image) => {
    setCurrentSlide(item);
  };

  // Add a slide to the list and focus it on top
  const onSlideAdd = () => {
    const imagesWithoutImage = sortedImages.some((item) => !item.src);
    if (imagesWithoutImage) return;

    const allIds = sortedImages.map((item) => item.id);
    const allOrders = sortedImages.map((item) => item.order);
    const maxId = Math.max(0, ...allIds);
    const maxOrder = Math.max(0, ...allOrders);
    const newImage = {
      ...emptyImage,
      order: maxOrder + 1,
      id: maxId + 1,
    };
    const allImages = [...sortedImages, newImage];

    onChange(allImages);
    setCurrentSlide(newImage);
  };

  const onSlideRemove = async (removedSlide: Image) => {
    await onFileRemove(removedSlide.src);
    const imagesWithoutRemoved = sortedImages.filter((item) => item.id !== removedSlide.id);
    onChange(imagesWithoutRemoved);
  };

  const onFileUploadRequest = async (file) => {
    const data = await onFileUpload(file);
    const currentImageModified = {
      ...currentSlide,
      src: data.image,
    };
    const imagesModified = sortedImages.map((item) => {
      if (item.id === currentSlide?.id) {
        return currentImageModified;
      }

      return item;
    });

    setCurrentSlide(currentImageModified);
    onChange(imagesModified);
  };

  const onTitleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;

    const imagesModified = sortedImages.map((item) => {
      if (item.id === currentSlide?.id) {
        return {
          ...currentSlide,
          title: value,
        };
      }

      return item;
    });

    onChange(imagesModified);
  };

  useEffect(() => {
    // If the current slide is missing from the slides, don't update
    const currentIsInImages = sortedImages?.some((item) => item.id === currentSlide?.id);
    if (currentSlide && currentIsInImages) return;

    // Base case, focus first image
    setCurrentSlide(sortedImages[0]);
  }, [sortedImages]);

  useEffect(() => {
    setListImages(images);
  }, [images]);

  return (
    <div className="CarouselFieldImages">
      <ImageField
        className="CarouselFieldImages-current"
        label={currentSlide?.title}
        name={currentSlide?.title}
        image={currentSlide?.src}
        disabled={!sortedImages.length}
        grow={false}
        uploadFiles={onFileUploadRequest}
        onRemove={onFileRemove}
        percentCompleted={0}
        accept=".jpg,.jpeg"
      />
      <Input
        className="CarouselFieldImages-input"
        name="input"
        value={sortedImages.find((item) => item.id === currentSlide?.id)?.title}
        onChange={onTitleChange}
      />
      <div className="CarouselFieldImages-list">
        <SortableList
          id="CarouselFieldImages-sortable"
          direction="horizontal"
          className="CarouselFieldImages-images"
          onSortChange={onSortChange}
          handleClass="CarouselFieldImages-overlay"
        >
          {sortedImages?.map((item) => (
            <li
              className={
                'CarouselFieldImages-item' + (item.id === currentSlide?.id ? ' CarouselFieldImages-item--current' : '')
              }
              key={item.src}
              data-id={String(item.id)}
              data-order={item.order}
            >
              <div className="CarouselFieldImages-overlay" onMouseDown={() => onImageListClick(item)} />
              <img src={item.src} />
              <Cross
                className="CarouselFieldImages-editCarouselIcon CarouselFieldImages-iconRemove"
                onClick={() => onSlideRemove(item)}
              />
            </li>
          ))}
        </SortableList>
        <li className="CarouselFieldImages-item CarouselFieldImages-itemAdd" onClick={onSlideAdd}>
          <div className="CarouselFieldImages-overlay" />
          <Plus className="CarouselFieldImages-iconAdd" />
        </li>
      </div>
    </div>
  );
};
