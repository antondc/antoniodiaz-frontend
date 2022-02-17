import React from 'react';
import Helmet from 'react-helmet';

import { StyledContent } from 'Components/StyledContent';
import { GlossaryState } from 'Modules/Languages/languages.types';
import { HtmlSanitizer } from '@antoniodcorrea/components';

import './Who.less';

interface Props {
  glossary: GlossaryState;
}

export const Who: React.FC<Props> = ({ glossary }) => (
  <>
    <Helmet>
      <title>{`${glossary.author} · ${glossary.who}`}</title>
      <meta property="og:title" content={`${glossary.author} · ${glossary.who}`} />
      <meta property="twitter:title" content={`${glossary.author} · ${glossary.who}`} />
    </Helmet>
    <div className="Who">
      <h1 className="Who-title">{glossary?.who}</h1>
      <StyledContent id="Who-content">
        <HtmlSanitizer html={glossary.whoContentHtml} />
      </StyledContent>
    </div>
  </>
);
