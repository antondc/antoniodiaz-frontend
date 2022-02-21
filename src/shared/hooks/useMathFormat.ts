import { useEffect } from 'react';
import katex from 'katex';

interface Props {
  id: string;
  data: unknown;
}

// Format math formulas
export const useMathFormat = ({ id, data }: Props): void => {
  useEffect(() => {
    const wrapper = document.getElementById(id);
    const mathElements = wrapper?.getElementsByClassName('math') || [];
    const mathElementsArray = Array.from(mathElements) as Array<HTMLElement>;

    mathElementsArray?.forEach((element) => {
      if (element?.firstElementChild?.classList?.contains('katex')) return;

      katex.render(element.innerHTML, element, {
        throwOnError: false,
        output: 'mathml',
      });
    });
  }, [data]);
};
