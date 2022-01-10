// https://react-slick.neostack.com/
// - For slide, needs image without wrapper first next click next slide is not loaded
// - For Fade, needs image wrapped in div

import React, { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';

import ArrowLeft from 'Assets/svg/arrowLeft.svg';
import ArrowRight from 'Assets/svg/arrowRight.svg';
import PlusCircle from 'Assets/svg/plusCircle.svg';

import './BaseCarousel.less';

interface Props {
  children: React.ReactChild | React.ReactChild[];
  onAdd: () => boolean;
}

export const BaseCarousel: React.FC<Props> = ({ children, onAdd }) => {
  const sliderRef = useRef<Slider>();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    const added = onAdd();
    if (!added) return;

    sliderRef.current.slickGoTo(React.Children.count(children));
  };

  const onNavigatorHoverEnter = () => {
    // sliderRef.current.slickPause();
  };

  const onSliderLeave = () => {
    // sliderRef.current.slickPlay();
  };

  return (
    <div className="BaseCarousel" id="BaseCarousel" onMouseLeave={onSliderLeave}>
      <Slider
        className="BaseCarousel-slider"
        ref={sliderRef}
        fade={false}
        infinite={true}
        speed={500}
        slidesToShow={1}
        slidesToScroll={1}
        dots={true}
        arrows={true}
        // autoplay
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
      {onAdd && <PlusCircle className="BaseCarousel-addIcon" id="BaseCarousel-addIcon" onClick={handleClick} />}
    </div>
  );
};
