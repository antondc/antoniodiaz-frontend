import React from 'react';
import Helmet from 'react-helmet';

import GitLab from 'Assets/svg/iconGitLab.svg';
import Linkedin from 'Assets/svg/iconLinkedin.svg';
import Mail from 'Assets/svg/iconMail.svg';
import Rss from 'Assets/svg/iconRss.svg';
import { LanguageState } from 'Modules/Languages/languages.types';
import { A } from '@antoniodcorrea/components';

import './Where.less';

interface Props {
  language: LanguageState;
}

export const Where: React.FC<Props> = ({ language }) => (
  <>
    <Helmet>
      <title>{`${language.glossary.author} · ${language.glossary.where}`}</title>
      <meta property="og:title" content={`${language.glossary.author} · ${language.glossary.where}`} />
      <meta property="twitter:title" content={`${language.glossary.author} · ${language.glossary.where}`} />
    </Helmet>
    <div className="Where">
      <A
        className="Where-item Where-item--gitLab"
        href="https://gitlab.com/antoniodiaz/"
        targetBlank
        styled={false}
        title="GitLab"
      >
        <GitLab className="Where-itemIcon" />
        <div className="Where-itemText">{language.glossary.code}</div>
      </A>
      <A
        className="Where-item Where-item--mail"
        href="mailto:hello@antoniodiaz.me?subject=Hello!"
        targetBlank
        styled={false}
        title="Email"
      >
        <Mail className="Where-itemIcon" />
        <div className="Where-itemText">{language.glossary.email}</div>
      </A>
      <A className="Where-item Where-item--rss" href="/rss/blog" targetBlank styled={false} title="RSS">
        <Rss className="Where-itemIcon" />
        <div className="Where-itemText Where-itemTextRSS">rss</div>
      </A>
      <A
        className="Where-item Where-item--linkedin"
        href="https://www.linkedin.com/in/antonio-d%C3%ADaz-correa-b9487828/"
        targetBlank
        styled={false}
        title="LinkedIn"
      >
        <Linkedin className="Where-itemIcon" />
        <div className="Where-itemText">LinkedIn</div>
      </A>
    </div>
  </>
);
