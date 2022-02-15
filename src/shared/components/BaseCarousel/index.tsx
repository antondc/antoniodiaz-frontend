import React, { useRef } from 'react';
import Slider from 'react-slick';

import { useCachedData } from 'Hooks/useCachedData';
import { BaseCarousel as BaseCarouselUi } from './BaseCarousel';

interface Props {
  children: React.ReactChild | React.ReactChild[];
  onAdd?: () => boolean;
}

const BaseCarousel: React.FC<Props> = ({ children }) => {
  const sliderRef = useRef<Slider>();
  const cachedChildren = useCachedData<React.ReactChild | React.ReactChild[]>(children);

  const onNavigatorHoverEnter = () => {
    sliderRef.current.slickPause();
  };

  const onSliderLeave = () => {
    sliderRef.current.slickPlay();
  };

  return (
    <BaseCarouselUi onNavigatorHoverEnter={onNavigatorHoverEnter} onSliderLeave={onSliderLeave} sliderRef={sliderRef}>
      {cachedChildren}
    </BaseCarouselUi>
  );
};

export default BaseCarousel;
