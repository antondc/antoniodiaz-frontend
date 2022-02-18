import React from 'react';
import { useSelector } from 'react-redux';

import { selectCurrentGlossary } from 'Modules/Languages/selectors/selectCurrentGlossary';
import { Footer as FooterUi } from './Footer';

import './Footer.less';

const Footer: React.FC = () => {
  const glossary = useSelector(selectCurrentGlossary);

  return <FooterUi glossary={glossary} />;
};

export default Footer;
