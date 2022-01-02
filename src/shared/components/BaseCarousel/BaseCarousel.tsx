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

export const BaseCarousel: React.FC<Props> = ({ children }) => (
  <Slider
    className="BaseCarousel"
    fade={true}
    infinite={true}
    speed={500}
    slidesToShow={1}
    slidesToScroll={1}
    dots={true}
    arrows={true}
    autoplay
    pauseOnHover
    lazyLoad="progressive"
    nextArrow={
      <div className="BaseCarousel-navigator BaseCarousel-navigatorRight">
        <ArrowRight className="BaseCarousel-navigatorIcon" />
      </div>
    }
    prevArrow={
      <div className="BaseCarousel-navigator BaseCarousel-navigatorLeft">
        <ArrowLeft className="BaseCarousel-navigatorIcon" />
      </div>
    }
  >
    {children}
  </Slider>
);
