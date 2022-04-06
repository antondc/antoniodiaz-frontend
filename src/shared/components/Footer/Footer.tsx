import React from 'react';

import { A, Space } from '@antoniodcorrea/components';
import { GlossaryState } from '../../redux/modules/Languages/languages.types';

import './Footer.less';

interface Props {
  glossary: GlossaryState;
}
export const Footer: React.FC<Props> = ({ glossary }) => (
  <footer className={'Footer'}>
    <hr className="Footer-hr" />
    <div className="Footer-content">
      <div className="Footer-item">Antonio Diaz</div>
      <div className="Footer-item">Madrid</div>
      <div className="Footer-item">
        <A
          className="Footer-email"
          href="mailto:hello@antoniodiaz.me?subject=Hello!"
          targetBlank
          styled={false}
          title="hello@antoniodiaz.me"
        >
          hello@antoniodiaz.me
        </A>
      </div>
    </div>
  </footer>
);
