import React from 'react';
import ReactHtmlParser from 'react-html-parser';

import { ArticleTranslationState } from 'Modules/Articles/articles.types';

import './Post.less';

interface Props {
  articleTranslation: ArticleTranslationState;
  date: string;
}

export const Post: React.FC<Props> = ({ articleTranslation, date }) => (
  <div className="Post">
    <h1 className="Post-title">{articleTranslation?.title}</h1>
    <h2 className="Post-date">{date}</h2>
    <div className="Post-text">{ReactHtmlParser(articleTranslation?.htmlContent)}</div>
  </div>
);
