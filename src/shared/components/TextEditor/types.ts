import { BaseEditor, Node } from 'slate';
import { ReactEditor } from 'slate-react';

export interface CustomText {
  type: string;
  text?: string;
  bold?: boolean;
  code?: boolean;
  italic?: boolean;
  underlined?: boolean;
  uppercase?: boolean;
  inlineCode?: boolean;
  children?: any;
}

export type ImageElement = {
  type: 'image';
  src: string;
  uuid?: string;
  children?: any;
};

export type LinkElement = {
  type: 'link';
  url: string;
  children: any; // TODO: type children here
};

export type CustomElement = {
  type: 'paragraph' | 'code' | 'h1' | 'h2' | 'h3' | 'ul' | 'quote';
  children: CustomText[];
};

export type CustomNode = Node & {
  bold: boolean;
};

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & { type: string };
    Element: CustomElement | LinkElement | CustomElement | ImageElement;
    Text: CustomText;
    Node: CustomNode;
  }
}
