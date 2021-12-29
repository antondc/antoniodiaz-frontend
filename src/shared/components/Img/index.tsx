import React from 'react';

import './Img.less';

interface Props {
  className: string;
  src: string;
  sizes: string;
  srcSet: string;
  title: string;
  alt: string;
}

const Img: React.FC<Props> = ({ className, src, sizes, srcSet, title, alt }) => {
  const onImageLoad = (input) => {
    if (!input) return;

    const img = input;
    const updateFunc = () => {
      img.classList.remove('Img--preload');
    };
    img.onload = updateFunc;
    if (img.complete) {
      updateFunc();
    }
  };

  return (
    <img
      className={'Img Img--preload' + (className ? ` ${className}` : '')}
      src={src}
      sizes={sizes}
      srcSet={srcSet}
      title={title}
      alt={alt}
      ref={onImageLoad}
    />
  );
};

export default Img;
