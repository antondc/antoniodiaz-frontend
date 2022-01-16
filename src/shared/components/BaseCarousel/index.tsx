import React, { useRef } from 'react';
import Slider from 'react-slick';

import { BaseCarousel as BaseCarouselUi } from './BaseCarousel';

interface Props {
  children: React.ReactChild | React.ReactChild[];
  onAdd?: () => boolean;
}

const BaseCarousel: React.FC<Props> = ({ children }) => {
  const sliderRef = useRef<Slider>();

  const onNavigatorHoverEnter = () => {
    sliderRef.current.slickPause();
  };

  const onSliderLeave = () => {
    sliderRef.current.slickPlay();
  };

  return (
    <BaseCarouselUi onNavigatorHoverEnter={onNavigatorHoverEnter} onSliderLeave={onSliderLeave} sliderRef={sliderRef}>
      {children}
    </BaseCarouselUi>
  );
};

export default BaseCarousel;
