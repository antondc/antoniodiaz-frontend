import React from 'react';

import Github from 'Assets/svg/iconGitHub.svg';
import Linkedin from 'Assets/svg/iconLinkedin.svg';
import Mail from 'Assets/svg/iconMail.svg';
import Twitter from 'Assets/svg/logoTwitter.svg';
import { GlossaryState } from 'Modules/Languages/languages.types';

import './Where.less';

interface Props {
  glossary: GlossaryState;
}
export const Where: React.FC<Props> = () => (
  <div className="Where">
    <a className="Where-item" href="https://github.com/antoniodcorrea/" target="_blank" rel="noreferrer" title="Github">
      <Github className="Where-icon Where-icon--gitHub" />
    </a>
    <a
      className="Where-item"
      href="mailto:hello@antoniodiaz.me?subject=Hello!"
      target="_blank"
      rel="noreferrer"
      title="Email"
    >
      <Mail className="Where-logoIcon Where-icon--mail" />
    </a>
    <a
      className="Where-item"
      href="https://twitter.com/AntonioDCorrea"
      target="_blank"
      rel="noreferrer"
      title="Twitter"
    >
      <Twitter className="Where-icon Where-icon--twitter" />
    </a>
    <a
      className="Where-item"
      href="https://www.linkedin.com/in/antonio-d%C3%ADaz-correa-b9487828/"
      target="_blank"
      rel="noreferrer"
      title="LinkedIn"
    >
      <Linkedin className="Where-icon Where-icon--linkedin" />
    </a>
  </div>
);
