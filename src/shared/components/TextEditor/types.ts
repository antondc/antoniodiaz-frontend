import { BaseEditor, Node } from 'slate';
import { ReactEditor } from 'slate-react';

export interface CustomText {
  type: string;
  text: string;
  bold?: boolean;
  code?: boolean;
  italic?: boolean;
  underlined?: boolean;
  uppercase?: boolean;
  center?: boolean;
  inlineCode?: boolean;
}

export type CustomElement = {
  type: 'p' | 'code' | 'h1' | 'h2' | 'h3' | 'ul' | 'quote';
  children: CustomText[];
};

export type CustomNode = Node & {
  bold: boolean;
};

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & { type: string };
    Element: CustomElement;
    Text: CustomText;
    Node: CustomNode;
  }
}
