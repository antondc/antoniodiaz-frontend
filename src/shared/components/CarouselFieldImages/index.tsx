import React, { useEffect, useState } from 'react';

import Cross from 'Assets/svg/cross.svg';
import Plus from 'Assets/svg/plusCircle.svg';
import { ImageField, SortableList } from '@antoniodcorrea/components';

import './CarouselFieldImages.less';

const emptyImage = {
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
  images: Array<Image>; // TODO: edit to use a generic T & { new: boolean; }
  onChange: (images: Array<Image>) => void;
  onAdd: () => void;
  onRemove: (images: Array<Image>) => void;
  onFileUpload: (file: File) => void;
  onFileRemove?: (url: string) => void;
}

export const CarouselFieldImages: React.FC<Props> = ({
  images,
  onChange,
  onAdd,
  onRemove,
  onFileUpload,
  onFileRemove,
}) => {
  const [currentSlide, setCurrentSlide] = useState<Image>(undefined);
  const [newSlide, setNewSlide] = useState<boolean>(false);

  const onSortChange = (image: Image) => {
    const imageFound = images?.find((item) => item.id === image.id);
    const originalOrder = imageFound?.order;
    const directionUp = image.order > originalOrder;

    const selectionModified = images.map((item) => {
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

    onChange(selectionModified);
    setCurrentSlide(imageFound);
  };

  const onImageListClick = (item: Image) => {
    setCurrentSlide(item);
  };

  // Add a slide to the list and focus it on top
  const onSlideAdd = () => {
    // TODO: edit to ignore the src
    const imagesWithoutImage = images.some((item) => !item.src);
    if (imagesWithoutImage) return;

    onAdd();
    setCurrentSlide(emptyImage);
  };

  const onSlideRemove = (removedSlide: Image) => {
    confirm('Are you sure?');

    const imagesWithoutRemoved = images.filter((item) => item.id !== removedSlide.id);
    onRemove(imagesWithoutRemoved);
    onFileRemove(removedSlide.src);
  };

  const onFileUploadRequest = (file) => {
    setNewSlide(true);
    onFileUpload(file);
  };

  useEffect(() => {
    // If we just added a new slide, on update focus it
    if (newSlide) {
      setCurrentSlide(images[images.length - 1]);
      setNewSlide(false);

      return;
    }

    // If the current slide is missing from the slides, don't update
    const currentIsInImages = images?.some((item) => item.id === currentSlide?.id);
    if (currentSlide && currentIsInImages) return;

    // Base case, focus first image
    setCurrentSlide(images[0]);
  }, [images]);

  return (
    <div className="CarouselFieldImages">
      <ImageField
        className="CarouselFieldImages-current"
        label={currentSlide?.title}
        name={currentSlide?.title}
        image={currentSlide?.src}
        grow={false}
        uploadFiles={onFileUploadRequest}
        onRemove={onFileRemove}
        percentCompleted={0}
        accept=".jpg,.jpeg"
      />
      <div className="CarouselFieldImages-list">
        <SortableList
          id="CarouselFieldImages-sortable"
          direction="horizontal"
          className="CarouselFieldImages-images"
          onSortChange={onSortChange}
          handleClass="CarouselFieldImages-overlay"
        >
          {images?.map((item) => (
            <li
              className={
                'CarouselFieldImages-item' + (item.id === currentSlide?.id ? ' CarouselFieldImages-item--current' : '')
              }
              key={item.src}
              data-id={item.id}
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
