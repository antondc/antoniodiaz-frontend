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
      img.classList.add('Img--isLoaded');
    };
    img.onload = updateFunc;
    if (img.complete) {
      setTimeout(() => {
        updateFunc();
      }, 0);
    }
  };

  return (
    <img
      className={'Img' + (className ? ` ${className}` : '')}
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
