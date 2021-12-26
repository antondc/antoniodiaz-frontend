import React from 'react';

import Github from 'Assets/svg/iconGitHub.svg';
import Linkedin from 'Assets/svg/iconLinkedin.svg';
import Mail from 'Assets/svg/iconMail.svg';
import Twitter from 'Assets/svg/logoTwitter.svg';
import { GlossaryState } from 'Modules/Languages/languages.types';
import { A } from '@antoniodcorrea/components';

import './Where.less';

interface Props {
  glossary: GlossaryState;
}
export const Where: React.FC<Props> = () => (
  <div className="Where">
    <A
      className="Where-item Where-item--gitHub"
      href="https://github.com/antoniodcorrea/"
      targetBlank
      styled={false}
      title="GitHub"
    >
      <Github className="Where-itemIcon" />
      <div className="Where-itemText">GitHub</div>
    </A>
    <A
      className="Where-item Where-item--mail"
      href="mailto:hello@antoniodiaz.me?subject=Hello!"
      targetBlank
      styled={false}
      title="Email"
    >
      <Mail className="Where-itemIcon" />
      <div className="Where-itemText">Mail</div>
    </A>
    <A
      className="Where-item Where-item--twitter"
      href="https://twitter.com/AntonioDCorrea"
      targetBlank
      styled={false}
      title="Twitter"
    >
      <Twitter className="Where-itemIcon" />
      <div className="Where-itemText">Twitter</div>
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
);
