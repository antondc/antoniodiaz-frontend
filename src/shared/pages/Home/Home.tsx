import React from 'react';
import Helmet from 'react-helmet';

import Upload from 'Assets/svg/upload.svg';
import A from 'Components/A';
import { ArticleState } from 'Modules/Articles/articles.types';
import { GlossaryState } from 'Modules/Languages/languages.types';
import { createSlugString } from '@antoniodcorrea/utils';

import './Home.less';

interface Props {
  glossary: GlossaryState;
  articlesWithDates: Array<ArticleState & { date: string }>;
  isLoggedIn: boolean;
}

export const Home: React.FC<Props> = ({ glossary, articlesWithDates, isLoggedIn }) => (
  <>
    <Helmet>
      <title>{`${glossary.author} · Blog`}</title>
      <meta property="og:title" content={`${glossary.author} · Blog`} />
      <meta property="twitter:title" content={`${glossary.author} · Blog`} />
    </Helmet>
    <div className="Home">
      <ul className="Home-articles">
        {articlesWithDates.map((item) => (
          <li className="Home-article" key={item.id}>
            <A className="Home-articleTitle" href={`/blog/${createSlugString(item.title)}-${item.id}`} styled={false}>
              {item?.title}
            </A>
            <div className="Home-articleDate">{item?.date}</div>
            {isLoggedIn && (
              <Upload className={'Home-publishedIcon' + (!!item.published ? ' Home-publishedIcon--published' : '')} />
            )}
          </li>
        ))}
      </ul>
    </div>
  </>
);
