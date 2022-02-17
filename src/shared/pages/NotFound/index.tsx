import React, { useEffect } from 'react';
import Helmet from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';

import CardItem from 'Components/CardItem';
import { selectCurrentGlossary } from 'Modules/Languages/selectors/selectCurrentGlossary';
import { uiResetModalsState } from 'Modules/Ui/actions/uiResetModalsState';

import './NotFound.less';

const NotFound: React.FC = () => {
  const dispatch = useDispatch();
  const currentGlossary = useSelector(selectCurrentGlossary);

  useEffect(() => () => dispatch(uiResetModalsState()), []);

  return (
    <>
      <Helmet>
        <title>title={`${currentGlossary.siteTitle} · Not Found`}</title>
        <meta property="og:title" content={`${currentGlossary.siteTitle} · Not Found`} />
        <meta property="twitter:title" content={`${currentGlossary.siteTitle} · Not Found`} />
      </Helmet>
      <CardItem className="NotFound">
        <h1 className="NotFound-title">{currentGlossary?.notFound} 😵</h1>
        <p className="NotFound-text">We couldnt find what you were looking for.</p>
      </CardItem>
    </>
  );
};

export default NotFound;
