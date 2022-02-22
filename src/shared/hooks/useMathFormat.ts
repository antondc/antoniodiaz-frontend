import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import katex from 'katex';

interface Props {
  id: string;
  data: unknown;
}

// Format math formulas
export const useMathFormat = ({ id, data }: Props): void => {
  // Format inline
  useEffect(() => {
    const wrapper = document.getElementById(id);
    const elements = wrapper?.getElementsByClassName('math-inline') || [];
    const elementsArray = Array.from(elements) as Array<HTMLElement>;

    try {
      elementsArray?.forEach((item) => {
        const tag = item.tagName;
        const html = katex.renderToString(item.innerHTML, {
          output: 'html',
        });
        // Create new element using original handle tag and its innerHtml
        const newInlineMathReactElement: React.ReactElement = React.createElement(tag.toLowerCase(), {
          dangerouslySetInnerHTML: { __html: html },
        });
        // Render clone within handle and do actions asynchronously
        ReactDOM.render(newInlineMathReactElement, item.parentElement);
      });
    } catch (e) {
      console.log('math-inline error: ', e);
    }
  }, [data]);

  // Format blocks
  useEffect(() => {
    const wrapper = document.getElementById(id);
    const elements = wrapper?.getElementsByClassName('math') || [];
    const elementsArray = Array.from(elements) as Array<HTMLElement>;

    try {
      elementsArray?.forEach((item) => {
        const tag = item.tagName;
        const html = katex.renderToString(item.innerHTML, {
          output: 'html',
        });
        // Create new element using original handle tag and its innerHtml
        const newInlineMathReactElement: React.ReactElement = React.createElement(tag.toLowerCase(), {
          dangerouslySetInnerHTML: { __html: html },
        });
        // Render clone within handle and do actions asynchronously
        ReactDOM.render(newInlineMathReactElement, item.parentElement);
      });
    } catch (e) {
      console.log('math error: ', e);
    }
  }, [data]);
};
