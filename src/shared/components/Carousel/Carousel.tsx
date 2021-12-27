// https://react-slick.neostack.com/
// - On first next click next slide is not loaded

import React from 'react';

import ArrowLeft from 'Assets/svg/arrowLeft.svg';
import ArrowRight from 'Assets/svg/arrowRight.svg';
import Slider from '@ant-design/react-slick';

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

interface Props2 {
  currentSlide?: any;
  slideCount?: any;
  children?: React.ReactElement;
  className?: string;
}

const SlickButtonFix: React.FC<Props2> = ({ currentSlide, slideCount, children, ...props }) => (
  <span {...props}>{children}</span>
);

export const Carousel: React.FC<Props> = React.memo(({ slidesWithData }) => (
  <Slider
    className="Carousel"
    dots={true}
    infinite={true}
    speed={500}
    slidesToShow={1}
    slidesToScroll={1}
    autoplay
    nextArrow={
      <SlickButtonFix>
        <ArrowRight className="Carousel-navigator Carousel-navigatorLeft" />
      </SlickButtonFix>
    }
    prevArrow={
      <SlickButtonFix>
        <ArrowLeft className="Carousel-navigator Carousel-navigatorLeft" />
      </SlickButtonFix>
    }
  >
    {slidesWithData?.map((item, index) => (
      <div className="Carousel-slide" key={index}>
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
