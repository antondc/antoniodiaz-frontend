import React from 'react';

import { A } from '@antoniodcorrea/components';

import './Footer.less';

export const Footer: React.FC = () => (
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
