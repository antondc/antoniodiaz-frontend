import React from 'react';
import ReactHtmlParser from 'react-html-parser';

import { ArticleTranslationState } from 'Modules/Articles/articles.types';

import './Article.less';

interface Props {
  articleTranslation: ArticleTranslationState;
  date: string;
}

export const Article: React.FC<Props> = ({ articleTranslation, date }) => (
  <div className="Article">
    <h1 className="Article-title">{articleTranslation?.title}</h1>
    <h2 className="Article-date">{date}</h2>
    <div className="Article-content">{ReactHtmlParser(articleTranslation?.htmlContent)}</div>
  </div>
);
