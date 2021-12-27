// https://react-slick.neostack.com/
// - For slide, needs image without wrapper first next click next slide is not loaded
// - For Fade, needs image wrapped in div

import React from 'react';
import Slider from 'react-slick';

import ArrowLeft from 'Assets/svg/arrowLeft.svg';
import ArrowRight from 'Assets/svg/arrowRight.svg';

import './BaseCarousel.less';

interface Props {
  children: React.ReactChild | React.ReactChild[];
}

export const BaseCarousel: React.FC<Props> = React.memo(({ children }) => (
  <Slider
    fade={true}
    infinite={true}
    speed={500}
    slidesToShow={1}
    slidesToScroll={1}
    className="BaseCarousel"
    dots={true}
    autoplay
    pauseOnHover
    nextArrow={<ArrowRight className="BaseCarousel-navigator BaseCarousel-navigatorRight" />}
    prevArrow={<ArrowLeft className="BaseCarousel-navigator BaseCarousel-navigatorLeft" />}
  >
    {children}
  </Slider>
));
