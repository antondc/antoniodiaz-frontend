import React from 'react';

import { A } from '@antoniodcorrea/components';

import './Footer.less';

export const Footer: React.FC = () => (
  <footer className={'Footer'}>
    <div className="Footer-item">Antonio Díaz Correa</div>
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
  </footer>
);
