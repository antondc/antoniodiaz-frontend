// https://react-slick.neostack.com/
// - For slide, needs image without wrapper first next click next slide is not loaded
// - For Fade, needs image wrapped in div

import React from 'react';
import Slider from 'react-slick';

import ArrowLeft from 'Assets/svg/arrowLeft.svg';
import ArrowRight from 'Assets/svg/arrowRight.svg';

import './Carousel.less';

type SlideItem = {
  id: number;
  src: string;
  srcSet: string;
  sizes: string;
  title: string;
  alt: string;
};

interface Props {
  slidesWithData: Array<SlideItem>;
}

export const Carousel: React.FC<Props> = React.memo(({ slidesWithData }) => (
  <Slider
    fade={true}
    infinite={true}
    speed={500}
    slidesToShow={1}
    slidesToScroll={1}
    className="Carousel"
    dots={true}
    autoplay
    pauseOnHover
    nextArrow={<ArrowRight className="Carousel-navigator Carousel-navigatorRight" />}
    prevArrow={<ArrowLeft className="Carousel-navigator Carousel-navigatorLeft" />}
  >
    {slidesWithData?.map((item) => (
      <div className="Carousel-slide" key={item.id}>
        <img
          className="Carousel-slideImage"
          src={item.src}
          sizes={item.sizes}
          srcSet={item.srcSet}
          title={item.title}
          alt={item.alt}
        />
      </div>
    ))}
  </Slider>
));
