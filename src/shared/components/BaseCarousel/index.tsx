import React from 'react';

import { BaseCarousel as BaseCarouselUi } from './BaseCarousel';

interface Props {
  children: React.ReactChild | React.ReactChild[];
  onAdd?: () => boolean;
}

const BaseCarousel: React.FC<Props> = ({ children, onAdd }) => (
  <BaseCarouselUi onAdd={onAdd}>{children}</BaseCarouselUi>
);

export default BaseCarousel;
