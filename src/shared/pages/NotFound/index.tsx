import React, { useEffect } from 'react';
import Helmet from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';

import A from 'Components/A';
import CardItem from 'Components/CardItem';
import { selectCurrentGlossary } from 'Modules/Languages/selectors/selectCurrentGlossary';
import { uiResetModalsState } from 'Modules/Ui/actions/uiResetModalsState';
import { SITE_TITLE } from 'Root/src/shared/constants';
import { Routes } from 'Router/routes';
import { Space } from '@antoniodcorrea/components';

import './NotFound.less';

const NotFound: React.FC = () => {
  const dispatch = useDispatch();
  const currentGlossary = useSelector(selectCurrentGlossary);

  useEffect(() => () => dispatch(uiResetModalsState()), []);

  return (
    <>
      <Helmet title={`${SITE_TITLE} · Not Found`} />
      <CardItem className="NotFound">
        <h1 className="NotFound-title">{currentGlossary?.notFound} 😵</h1>
        <p className="NotFound-text">We couldnt find what you were looking for.</p>
      </CardItem>
    </>
  );
};

export default NotFound;
