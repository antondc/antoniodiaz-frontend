import React, { useEffect, useState } from 'react';

import A from 'Components/A';
import BaseCarousel from 'Components/BaseCarousel';
import { ArticleState } from 'Modules/Articles/articles.types';
import { GlossaryState } from 'Modules/Languages/languages.types';
import { Button, Fade, ImageField, SortableItem, SortableList } from '@antoniodcorrea/components';

import './ControlWhen.less';

interface Props {
  glossary: GlossaryState;
  articles: Array<ArticleState & { date: string }>;
  renderContent: boolean;
  onSortChange: (data: SortableItem) => void;
  onNewArticleClick: () => void;
}

const emptySlide = {
  src: '',
  sizes: '',
  srcSet: '',
  title: '',
  alt: '',
};

export const ControlWhen: React.FC<Props> = ({
  glossary,
  articles,
  renderContent,
  onSortChange,
  onNewArticleClick,
}) => {
  const incomingSlides = [
    {
      src: 'https://picsum.photos/id/237/1000',
      sizes: '',
      srcSet: '',
      title: 'https://picsum.photos/id/237/1000',
      alt: 'https://picsum.photos/id/237/1000',
    },
    {
      src: 'https://picsum.photos/id/234/1000',
      sizes: '',
      srcSet: '',
      title: 'https://picsum.photos/id/234/1000',
      alt: 'https://picsum.photos/id/234/1000',
    },
  ];

  const [slides, setSlides] = useState([]);

  const onSlideAdd = () => {
    const lastSlide = slides[slides.length - 1];
    if (!lastSlide?.src) {
      return false;
    }

    setSlides([...slides, emptySlide]);

    return true;
  };

  const onSlideRemove = (url: string) => {
    if (slides.length <= 1) {
      setSlides([emptySlide]);

      return;
    }

    if (!!url) {
      const filteredSlides = slides.filter((item) => item.src !== url);
      setSlides(filteredSlides);

      return;
    }

    const filteredSlides = slides.splice(0, slides.length - 1);
    setSlides(filteredSlides);
  };

  useEffect(() => {
    setSlides(incomingSlides);
  }, []);

  return (
    <Fade mounted={renderContent} appear>
      <div className="ControlWhen">
        <h1 className="ControlWhen-title">{glossary?.control}When</h1>
        <BaseCarousel onAdd={onSlideAdd}>
          {slides?.map((item, index) => (
            <div className="Project-slide" key={item.src}>
              <ImageField
                label={item.title}
                name={`${item.src}-${index}`}
                image={item.src}
                grow={false}
                uploadFiles={(e) => {
                  console.log(e);
                }}
                onRemove={onSlideRemove}
                percentCompleted={0}
                removable
                accept=".jpg,.jpeg"
              />
            </div>
          ))}
        </BaseCarousel>
        <SortableList
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
