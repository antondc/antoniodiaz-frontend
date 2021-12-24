import React from 'react';
import ReactHtmlParser from 'react-html-parser';

import { ArticleTranslationState } from 'Modules/Articles/articles.types';

import './Post.less';

interface Props {
  articleTranslation: ArticleTranslationState;
}

export const Post: React.FC<Props> = ({ articleTranslation }) => (
  <div className="Post">
    <h1 className="Post-title">{articleTranslation.title}</h1>
    <div className="Who-text">{ReactHtmlParser(articleTranslation.htmlContent)}</div>
  </div>
);
