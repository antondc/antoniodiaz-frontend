import React from 'react';

import { Carousel as CarouselUi } from './Carousel';

interface Props {
  slides: Array<{
    id: number;
    image: {
      [key: string]: string;
    };
    title: string;
  }>;
}

const Carousel: React.FC<Props> = ({ slides }) => {
  const slidesWithData = slides.map((item) => ({
    id: item.id,
    src: item.image[Object.keys(item.image)[0]],
    srcSet: Object.entries(item.image)
      .map(([key, value]) => `${value} ${key}`)
      .join(', '),
    sizes: Object.keys(item.image)[0],
    title: item.title,
    alt: item.title,
  }));

  return <CarouselUi slidesWithData={slidesWithData} />;
};

export default Carousel;
