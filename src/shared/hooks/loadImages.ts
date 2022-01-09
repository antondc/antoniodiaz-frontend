import { useEffect } from 'react';

interface Props {
  wrapperClass: string;
  data: unknown;
}

// Loads images with img tag within given wrapper element
export const useLoadImages = ({ wrapperClass, data }: Props): void => {
  useEffect(() => {
    const wrapper = document.getElementById(wrapperClass);
    const childImgs = wrapper?.getElementsByTagName('img') || [];
    const imagesArray = Array.from(childImgs);

    imagesArray?.forEach((element) => element.decode().then(() => element.classList.add('Article-image--loaded')));
  }, [data]);
};
