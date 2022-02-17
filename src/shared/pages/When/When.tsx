import React from 'react';
import Helmet from 'react-helmet';

import A from 'Components/A';
import { ArticleState } from 'Modules/Articles/articles.types';
import { GlossaryState } from 'Modules/Languages/languages.types';

import './When.less';

interface Props {
  glossary: GlossaryState;
  articlesWithDates: Array<ArticleState & { date: string }>;
}

export const When: React.FC<Props> = ({ glossary, articlesWithDates }) => (
  <>
    <Helmet>
      <title>{`${glossary.author} · Blog`}</title>
      <meta property="og:title" content={`${glossary.author} · Blog`} />
      <meta property="twitter:title" content={`${glossary.author} · Blog`} />
    </Helmet>
    <div className="When">
      <h1 className="When-title">{glossary.when}</h1>
      <div className="When-subtitle">{glossary?.whenSubtitle}</div>
      <ul className="When-articles">
        {articlesWithDates.map((item) => (
          <li className="When-article" key={item.id}>
            <A className="When-articleTitle" href={`/when/${item.id}`} styled={false}>
              {item?.title}
            </A>
            <span className="When-articleDate">{item?.date}</span>
          </li>
        ))}
      </ul>
    </div>
  </>
);
