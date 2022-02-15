import React from 'react';

import { StyledContent } from 'Components/StyledContent';
import { ArticleState } from 'Modules/Articles/articles.types';
import { HtmlSanitizer } from '@antoniodcorrea/components';

import './Article.less';

interface Props {
  article: ArticleState;
  date: string;
}

export const Article: React.FC<Props> = ({ article, date }) => (
  <div className="Article" id="Article">
    <h1 className="Article-title">{article?.title}</h1>
    <h2 className="Article-date">{date}</h2>
    <StyledContent id="Article-content">
      <HtmlSanitizer html={article?.contentHtml} />
    </StyledContent>
  </div>
);
