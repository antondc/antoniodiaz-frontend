import React from 'react';
import Helmet from 'react-helmet';

import { StyledContent } from 'Components/StyledContent';
import { ArticleState } from 'Modules/Articles/articles.types';
import { GlossaryState } from 'Modules/Languages/languages.types';
import { HtmlSanitizer } from '@antoniodcorrea/components';

import './Article.less';

interface Props {
  article: ArticleState;
  date: string;
  glossary: GlossaryState;
}

export const Article: React.FC<Props> = ({ article, date, glossary }) => (
  <>
    <Helmet>
      <title>{`${glossary.author}${article?.title ? ` · ${article?.title}` : ''}`}</title>
      <meta property="og:title" content={`${article?.title}`} />
      <meta property="og:image" content={`${article?.ogImage}`} />
      <meta property="twitter:title" content={`${article?.title}`} />
      <meta property="twitter:image" content={`${article?.ogImage}`} />
    </Helmet>
    <div className="Article" id="Article">
      <h1 className="Article-title">{article?.title}</h1>
      <h2 className="Article-date">{date}</h2>
      <StyledContent id="Article-content">
        <HtmlSanitizer html={article?.contentHtml} />
      </StyledContent>
    </div>
  </>
);
