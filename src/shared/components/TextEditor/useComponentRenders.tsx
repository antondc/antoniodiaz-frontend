import React, { useCallback } from 'react';

import { EditorA } from './components/EditorA';
import { EditorBold } from './components/EditorBold';
import { EditorCentered } from './components/EditorCentered';
import { EditorCode } from './components/EditorCode';
import { EditorCodeInlined } from './components/EditorCodeInlined';
import { EditorH1 } from './components/EditorH1';
import { EditorH2 } from './components/EditorH2';
import { EditorH3 } from './components/EditorH3';
import { EditorImage } from './components/EditorImage';
import { EditorItalic } from './components/EditorItalic';
import { EditorQuote } from './components/EditorQuote';
import { EditorText } from './components/EditorText';
import { EditorUl } from './components/EditorUl';
import { EditorUnderlined } from './components/EditorUnderlined';
import { EditorUppercase } from './components/EditorUppercase';

type UseComponentRenders = () => {
  renderElement: (props) => React.ReactElement;
  renderLeaf: (props) => React.ReactElement;
};

export const useComponentRenders: UseComponentRenders = () => {
  const renderElement = useCallback(({ children, element }) => {
    switch (element.type) {
      case 'h1':
        return <EditorH1>{children}</EditorH1>;
      case 'h2':
        return <EditorH2>{children}</EditorH2>;
      case 'h3':
        return <EditorH3>{children}</EditorH3>;
      case 'ul':
        return <EditorUl>{children}</EditorUl>;
      case 'code':
        return <EditorCode>{children}</EditorCode>;
      case 'quote':
        return <EditorQuote>{children}</EditorQuote>;
      case 'link':
        return <EditorA element={element}>{children}</EditorA>;
      case 'image':
        return <EditorImage element={element} />;
      default:
        return <EditorText>{children}</EditorText>;
    }
  }, []);

  const renderLeaf = useCallback(({ attributes, children, leaf }) => {
    if (leaf.bold) {
      children = <EditorBold>{children}</EditorBold>;
    }

    if (leaf.italic) {
      children = <EditorItalic>{children}</EditorItalic>;
    }

    if (leaf.underlined) {
      children = <EditorUnderlined>{children}</EditorUnderlined>;
    }

    if (leaf.uppercase) {
      children = <EditorUppercase>{children}</EditorUppercase>;
    }

    if (leaf.center) {
      children = <EditorCentered>{children}</EditorCentered>;
    }

    if (leaf.inlineCode) {
      children = <EditorCodeInlined>{children}</EditorCodeInlined>;
    }

    return <span {...attributes}>{children}</span>;
  }, []);

  return { renderElement, renderLeaf };
};
