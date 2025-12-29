import React from 'react';
import Helmet from 'react-helmet';

import GitHub from 'Assets/svg/iconGitHub.svg';
import Linkedin from 'Assets/svg/iconLinkedin.svg';
import Mail from 'Assets/svg/iconMail.svg';
import Rss from 'Assets/svg/iconRss.svg';
import { StyledContent } from 'Components/StyledContent';
import { GlossaryState } from 'Modules/Languages/languages.types';
import { A, HtmlSanitizer } from '@antoniodcorrea/components';

import './About.less';

interface Props {
  glossary: GlossaryState;
}

export const About: React.FC<Props> = ({ glossary }) => (
  <>
    <Helmet>
      <title>{`${glossary.author} · ${glossary.who}`}</title>
      <meta property="og:title" content={`${glossary.author} · ${glossary.who}`} />
      <meta property="twitter:title" content={`${glossary.author} · ${glossary.who}`} />
    </Helmet>
    <div className="About">
      <StyledContent id="About-content">
        <HtmlSanitizer html={glossary.whoContentHtml} />
      </StyledContent>
      <div className="About-where">
        <A
          className="About-item About-item--gitLab"
          href="https://www.gitlab.com/antondc"
          targetBlank
          styled={false}
          title="GitHub"
        >
          <GitHub className="About-itemIcon" />
        </A>
        <A
          className="About-item About-item--mail"
          href="mailto:hello@antoniodiaz.me?subject=Hello!"
          targetBlank
          styled={false}
          title="Email"
        >
          <Mail className="About-itemIcon" />
        </A>
        <A className="About-item About-item--rss" href="/rss/blog" targetBlank styled={false} title="RSS">
          <Rss className="About-itemIcon" />
        </A>
        <A
          className="About-item About-item--linkedin"
          href="https://www.linkedin.com/in/antonio-d%C3%ADaz-correa-b9487828/"
          targetBlank
          styled={false}
          title="LinkedIn"
        >
          <Linkedin className="About-itemIcon" />
        </A>
      </div>
    </div>
  </>
);
