import React from 'react';

import './HideShow.less';

export type HideShowSpeed = 'slow' | 'normal' | 'normalSlow' | 'fast' | 'fastest';

interface Props {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
  speed?: HideShowSpeed;
  shown: boolean;
}

const HideShow: React.FC<Props> = ({ className, shown, speed = 'fast', children }) => (
  <div
    className={`HideShow HideShow--${speed}` + (className ? ` ${className}` : '') + (shown ? ` HideShow--shown` : '')}
  >
    {children}
  </div>
);

export default HideShow;
