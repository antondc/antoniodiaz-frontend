import React from 'react';
import Helmet from 'react-helmet';

import { BaseModalTitle } from 'Components/BaseModal';
import BasePanel from 'Components/BasePanel';
import Footer from 'Components/Footer';
import LoginForm from 'Components/LoginForm';
import { GlossaryState } from 'Modules/Languages/languages.types';

import './Login.less';

interface Props {
  glossary: GlossaryState;
}

export const Login: React.FC<Props> = ({ glossary }) => (
  <>
    <Helmet>
      <title>title={`${glossary.siteTitle} · Login`}</title>
      <meta property="og:title" content={`${glossary.siteTitle} · Login`} />
      <meta property="twitter:title" content={`${glossary.siteTitle} · Login`} />
    </Helmet>
    <BasePanel>
      <BaseModalTitle>Login</BaseModalTitle>
      <LoginForm />
    </BasePanel>
    <Footer />
  </>
);
