import React from 'react';
import ReactHtmlParser from 'react-html-parser';

import { ArticleState } from 'Modules/Articles/articles.types';
import { Fade } from '@antoniodcorrea/components';

import './Article.less';

interface Props {
  article: ArticleState;
  date: string;
  renderContent: boolean;
}

export const Article: React.FC<Props> = ({ article, date, renderContent }) => (
  <Fade mounted={renderContent} appear>
    <div className="Article">
      <h1 className="Article-title">{article?.title}</h1>
      <h2 className="Article-date">{date}</h2>
      <div className="Article-content" id="Article-content">
        {ReactHtmlParser(article?.contentHtml)}
      </div>
    </div>
  </Fade>
);
