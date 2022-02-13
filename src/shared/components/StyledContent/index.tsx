import React from 'react';

import { useLoadImages } from '../../hooks/loadImages';

import './StyledContent.less';

interface Props {
  children: React.ReactChild | React.ReactChild[];
  id: string;
}

export const StyledContent: React.FC<Props> = ({ children, id }) => {
  useLoadImages({
    id,
    className: 'StyledContent-image--loaded',
    data: children,
  });

  return (
    <div className="StyledContent" id={id}>
      {children}
    </div>
  );
};
