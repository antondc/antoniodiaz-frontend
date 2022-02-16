import React from 'react';

import { StyledContent } from 'Components/StyledContent';
import { GlossaryState } from 'Modules/Languages/languages.types';
import { HtmlSanitizer } from '@antoniodcorrea/components';

import './Who.less';

interface Props {
  glossary: GlossaryState;
}

export const Who: React.FC<Props> = ({ glossary }) => (
  <div className="Who">
    <h1 className="Who-title">{glossary?.who}</h1>
    <StyledContent id="Who-content">
      <HtmlSanitizer html={glossary.whoContentHtml} />
    </StyledContent>
  </div>
);
