import React from 'react';

import A from 'Components/A';
import { ArticleState } from 'Modules/Articles/articles.types';
import { GlossaryState } from 'Modules/Languages/languages.types';

import './When.less';

interface Props {
  lang: string;
  glossary: GlossaryState;
  articlesWithDates: Array<ArticleState & { date: string }>;
}

export const When: React.FC<Props> = ({ glossary, articlesWithDates }) => (
  <div className="When">
    <h1 className="When-title">{glossary.when}</h1>
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
);
