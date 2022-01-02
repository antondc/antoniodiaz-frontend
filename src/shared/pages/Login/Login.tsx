import React from 'react';
import Helmet from 'react-helmet';

import { BaseModalTitle } from 'Components/BaseModal';
import BasePanel from 'Components/BasePanel';
import LoginForm from 'Components/LoginForm';
import { SITE_TITLE } from 'Root/src/shared/constants';

import './Login.less';

export const Login: React.FC = () => (
  <>
    <Helmet title={`${SITE_TITLE} · Login`} />
    <BasePanel>
      <BaseModalTitle>Login</BaseModalTitle>
      <LoginForm />
    </BasePanel>
  </>
);
