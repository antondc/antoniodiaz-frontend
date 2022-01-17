import { useEffect } from 'react';

interface Props {
  id: string;
  className: string;
  data: unknown;
}

// Loads images with img tag within given wrapper element
export const useLoadImages = ({ id, className, data }: Props): void => {
  useEffect(() => {
    const wrapper = document.getElementById(id);
    const childImgs = wrapper?.getElementsByTagName('img') || [];
    const imagesArray = Array.from(childImgs);

    imagesArray?.forEach((element) => element.decode().then(() => element.classList.add(className)));
  }, [data]);
};
