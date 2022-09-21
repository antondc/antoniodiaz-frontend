import React from 'react';
import Helmet from 'react-helmet';

import { StyledContent } from 'Components/StyledContent';
import { GlossaryState } from 'Modules/Languages/languages.types';
import { HtmlSanitizer } from '@antoniodcorrea/components';

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
      <h1 className="About-title">{glossary?.who}</h1>
      <StyledContent id="About-content">
        <HtmlSanitizer html={glossary.whoContentHtml} />
      </StyledContent>
    </div>
  </>
);
