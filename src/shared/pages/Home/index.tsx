import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { uiResetModalsState } from 'Modules/Ui/actions/uiResetModalsState';
import { Home as HomeUi } from './Home';

const Home: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => () => dispatch(uiResetModalsState()), []);

  return <HomeUi />;
};
export default Home;
