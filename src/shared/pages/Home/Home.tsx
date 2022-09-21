import React from 'react';
import Helmet from 'react-helmet';

import A from 'Components/A';
import Footer from 'Components/Footer';
import { ArticleState } from 'Modules/Articles/articles.types';
import { GlossaryState } from 'Modules/Languages/languages.types';

import './Home.less';

interface Props {
  glossary: GlossaryState;
  articlesWithDates: Array<ArticleState & { date: string }>;
}

export const Home: React.FC<Props> = ({ glossary, articlesWithDates }) => (
  <>
    <Helmet>
      <title>{`${glossary.author} · Blog`}</title>
      <meta property="og:title" content={`${glossary.author} · Blog`} />
      <meta property="twitter:title" content={`${glossary.author} · Blog`} />
    </Helmet>
    <div className="Home">
      <h1 className="Home-title">{glossary.when}</h1>
      <div className="Home-subtitle">{glossary?.whenSubtitle}</div>
      <ul className="Home-articles">
        {articlesWithDates.map((item) => (
          <li className="Home-article" key={item.id}>
            <A className="Home-articleTitle" href={`/when/${item.id}`} styled={false}>
              {item?.title}
            </A>
            <span className="Home-articleDate">{item?.date}</span>
          </li>
        ))}
      </ul>
    </div>
    <Footer />
  </>
);
