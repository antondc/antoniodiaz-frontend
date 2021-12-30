import React, { useState } from 'react';

import './Img.less';

interface Props {
  className?: string;
  src: string;
  sizes: string;
  srcSet: string;
  title: string;
  alt: string;
}

const Img: React.FC<Props> = ({ className, src, sizes, srcSet, title, alt }) => {
  const [loaded, setLoaded] = useState(false);

  const onImageDecode = (img) => {
    if (!img) return;

    img.decode().then(() => {
      setLoaded(true);
    });
  };

  return (
    <img
      className={'Img' + (className ? ` ${className}` : '') + (loaded ? ' Img--loaded' : '')}
      src={src}
      sizes={sizes}
      srcSet={srcSet}
      title={title}
      alt={alt}
      ref={onImageDecode}
      loading="lazy"
    />
  );
};

export default Img;
