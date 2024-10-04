import { useEffect } from 'react';
import hljs from 'highlight.js';
import { removeNonASCII } from '@antoniodcorrea/utils';

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

  useEffect(() => {
    const codeElements = document.getElementsByTagName('pre');
    const codeElementsArray = Array.from(codeElements);

    codeElementsArray.forEach((codeElement) => {
      // Find matches for all substrings starting with "language-" and ending with "<", excluding this character.
      const languageClasses = codeElement.innerHTML.match(/language-[^<]*/);
      const languageClass = languageClasses && languageClasses[0];

      // Avoid highlighting if the code does not have a language class
      if (!languageClass) return;

      codeElement.classList.add(languageClass);
      // Some code brings non-ascii characters, clean it
      const asciiString = removeNonASCII(codeElement.innerHTML);

      // Remove the language class and subsequent breaklines if exists.
      codeElement.innerHTML = asciiString.replace(new RegExp(`${languageClass}(?:<br>)*`), '');

      // Skip already highlighted elements
      const elementClassHasHljs = codeElement.classList.contains('hljs');
      if (elementClassHasHljs) return;

      hljs.highlightElement(codeElement);
    });
  }, [data]);
};
