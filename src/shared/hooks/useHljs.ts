import { useCallback, useEffect } from 'react';
import hljs from 'highlight.js';

interface Props {
  data: unknown;
}

export const useHljs = ({ data }: Props): void => {
  // Preserve breaklines with <br/>
  // https://github.com/highlightjs/highlight.js/issues/2559
  const brPlugin = {
    'before:highlightElement': ({ el }) => {
      el.innerHTML = el.innerHTML.replace(/<br>/g, '\n');
    },
  };
  hljs.addPlugin(brPlugin);
  // Disable errors, as we are already escaping html
  hljs.configure({ ignoreUnescapedHTML: true });

  const useHljsWithCallback = useCallback(() => {
    const codeElements = document.getElementsByTagName('pre');
    const codeElementsArray = Array.from(codeElements);

    codeElementsArray.forEach((codeElement) => {
      hljs.highlightElement(codeElement);
    });
  }, []);

  useEffect(() => {
    useHljsWithCallback();
  }, [data]);
};
