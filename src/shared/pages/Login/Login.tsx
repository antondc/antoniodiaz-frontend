import React from 'react';
import Helmet from 'react-helmet';

import { BaseModalTitle } from 'Components/BaseModal';
import BasePanel from 'Components/BasePanel';
import LoginForm from 'Components/LoginForm';
import { GlossaryState } from 'Modules/Languages/languages.types';

import './Login.less';

interface Props {
  glossary: GlossaryState;
}

export const Login: React.FC<Props> = ({ glossary }) => (
  <>
    <Helmet>
      <title>{`${glossary.siteTitle} · Login`}</title>
      <meta property="og:title" content={`${glossary.siteTitle} · Login`} />
      <meta property="twitter:title" content={`${glossary.siteTitle} · Login`} />
    </Helmet>
    <div className="Login">
      <BasePanel>
        <BaseModalTitle>Login</BaseModalTitle>
        <LoginForm />
      </BasePanel>
    </div>
  </>
);
