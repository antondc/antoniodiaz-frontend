// https://react-slick.neostack.com/
// - For slide, needs image without wrapper first next click next slide is not loaded
// - For Fade, needs image wrapped in div

import React, { forwardRef } from 'react';
import Slider from 'react-slick';

import ArrowLeft from 'Assets/svg/arrowLeft.svg';
import ArrowRight from 'Assets/svg/arrowRight.svg';

import './BaseCarousel.less';

interface Props {
  children: React.ReactChild | React.ReactChild[];
  sliderRef: React.RefObject<Slider>;
  onSliderLeave: () => void;
  onNavigatorHoverEnter: () => void;
}

export const BaseCarousel: React.FC<Props> = forwardRef(
  ({ children, sliderRef, onSliderLeave, onNavigatorHoverEnter }) => (
    <div className="BaseCarousel" id="BaseCarousel" onMouseLeave={onSliderLeave}>
      <Slider
        className="BaseCarousel-slider"
        ref={sliderRef}
        fade={true}
        infinite={true}
        speed={500}
        slidesToShow={1}
        slidesToScroll={1}
        dots={true}
        arrows={true}
        autoplay
        pauseOnHover
        pauseOnDotsHover
        pauseOnFocus
        lazyLoad="progressive"
        nextArrow={
          <div className="BaseCarousel-navigator BaseCarousel-navigatorRight" onMouseEnter={onNavigatorHoverEnter}>
            <ArrowRight />
          </div>
        }
        prevArrow={
          <div className="BaseCarousel-navigator BaseCarousel-navigatorLeft" onMouseEnter={onNavigatorHoverEnter}>
            <ArrowLeft />
          </div>
        }
      >
        {children}
      </Slider>
    </div>
  )
);
