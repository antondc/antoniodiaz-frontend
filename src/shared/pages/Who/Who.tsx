import React from 'react';

import { GlossaryState } from 'Modules/Languages/languages.types';
import { HtmlSanitizer } from '@antoniodcorrea/components';

import './Who.less';

interface Props {
  glossary: GlossaryState;
}

export const Who: React.FC<Props> = ({ glossary }) => (
  <div className="Who">
    <div className="Who-content" id="Who-content">
      <HtmlSanitizer html={glossary.whoContentHtml} />
    </div>
  </div>
);
