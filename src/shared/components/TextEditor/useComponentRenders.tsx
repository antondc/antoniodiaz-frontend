import React, { useCallback } from 'react';

import { EditorA } from './components/EditorA';
import { EditorBold } from './components/EditorBold';
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
import { ImageUpload } from './types';

type UseComponentRenders = (imageUploadService: ImageUpload) => {
  renderElement: (props) => React.ReactElement;
  renderLeaf: (props) => React.ReactElement;
};

export const useComponentRenders: UseComponentRenders = (imageUploadService: ImageUpload) => {
  const renderElement = useCallback((props) => {
    switch (props.element.type) {
      case 'h1':
        return <EditorH1>{props.children}</EditorH1>;
      case 'h2':
        return <EditorH2>{props.children}</EditorH2>;
      case 'h3':
        return <EditorH3>{props.children}</EditorH3>;
      case 'ul':
        return <EditorUl>{props.children}</EditorUl>;
      case 'code':
        return <EditorCode>{props.children}</EditorCode>;
      case 'quote':
        return <EditorQuote>{props.children}</EditorQuote>;
      case 'link':
        return <EditorA element={props.element}>{props.children}</EditorA>;
      case 'image':
        return <EditorImage element={props.element} {...props} imageUploadService={imageUploadService} />;
      default:
        return <EditorText>{props.children}</EditorText>;
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

    if (leaf.inlineCode) {
      children = <EditorCodeInlined>{children}</EditorCodeInlined>;
    }

    return <span {...attributes}>{children}</span>;
  }, []);

  return { renderElement, renderLeaf };
};
