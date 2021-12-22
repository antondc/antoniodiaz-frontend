import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { uiResetModalsState } from 'Modules/Ui/actions/uiResetModalsState';
import { Home as HomeUi } from './Home';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const [stateFirst, setStateFirst] = useState<string>(undefined);
  const [stateSecond, setStateSecond] = useState<string>(undefined);
  const [stateThird, setStateThird] = useState<string>(undefined);
  const [stateFourth, setStateFourth] = useState<string>(undefined);
  useEffect(() => () => dispatch(uiResetModalsState()), []);

  const onFirstHover = () => {
    setStateFirst('Home-bigSquare');
    setStateSecond('Home-highRectangle');
    setStateThird('Home-wideRectangle');
    setStateFourth('Home-smallSquare');
  };

  const onSecondHover = () => {
    setStateFirst('Home-highRectangle');
    setStateSecond('Home-bigSquare');
    setStateThird('Home-smallSquare');
    setStateFourth('Home-wideRectangle');
  };

  const onThirdHover = () => {
    setStateFirst('Home-wideRectangle');
    setStateSecond('Home-smallSquare');
    setStateThird('Home-bigSquare');
    setStateFourth('Home-highRectangle');
  };

  const onFourthHover = () => {
    setStateFirst('Home-smallSquare');
    setStateSecond('Home-wideRectangle');
    setStateThird('Home-highRectangle');
    setStateFourth('Home-bigSquare');
  };

  const onFourthClick = () => {
    setStateFirst('Home-dot');
    setStateSecond('Home-horizontal');
    setStateThird('Home-vertical');
    setStateFourth('Home-all');
  };

  const onGridLeave = () => {
    setStateFirst(undefined);
    setStateSecond(undefined);
    setStateThird(undefined);
    setStateFourth(undefined);
  };

  return (
    <HomeUi
      stateFirst={stateFirst}
      stateSecond={stateSecond}
      stateThird={stateThird}
      stateFourth={stateFourth}
      onFirstHover={onFirstHover}
      onSecondHover={onSecondHover}
      onThirdHover={onThirdHover}
      onFourthHover={onFourthHover}
      onFourthClick={onFourthClick}
      onGridLeave={onGridLeave}
    />
  );
};
export default Home;
