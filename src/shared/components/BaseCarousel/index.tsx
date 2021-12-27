import React from 'react';

import { BaseCarousel as BaseCarouselUi } from './BaseCarousel';

interface Props {
  children: React.ReactChild | React.ReactChild[];
}

const BaseCarousel: React.FC<Props> = ({ children }) => <BaseCarouselUi>{children}</BaseCarouselUi>;

export default BaseCarousel;
