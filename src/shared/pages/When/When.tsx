import React from 'react';

import A from 'Components/A';
import { ArticleState } from 'Modules/Articles/articles.types';
import { GlossaryState } from 'Modules/Languages/languages.types';

import './When.less';

interface Props {
  lang: string;
  glossary: GlossaryState;
  articlesWithDates: Array<ArticleState>;
}

export const When: React.FC<Props> = ({ lang, glossary, articlesWithDates }) => (
  <div className="When">
    <h1 className="When-title">{glossary.when}</h1>
    <ul className="When-articles">
      {articlesWithDates.map((item) => (
        <li className="When-article" key={item.id}>
          <A className="When-articleTitle" href="/when/1">
            {item.translations[lang].title}
            <span className="When-articleDate">: {item.date}</span>
          </A>
        </li>
      ))}
    </ul>
  </div>
);
