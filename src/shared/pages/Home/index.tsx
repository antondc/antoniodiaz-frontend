import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { selectCurrentRouteParamLanguage } from 'Modules/Routes/selectors/selectCurrentRouteParamLanguage';
import { selectRouterHistory } from 'Modules/Routes/selectors/selectRouterHistory';
import history from 'Services/History';
import { toAbsolute } from 'Tools/utils/url/toAbsolute';
import { Routes } from '../../router/routes';
import { Home as HomeUi } from './Home';

const Home: React.FC = () => {
  const [stateFirst, setStateFirst] = useState<string>(undefined);
  const [stateSecond, setStateSecond] = useState<string>(undefined);
  const [stateThird, setStateThird] = useState<string>(undefined);
  const [stateFourth, setStateFourth] = useState<string>(undefined);
  const langParam = useSelector(selectCurrentRouteParamLanguage);
  const routeHistory = useSelector(selectRouterHistory);

  useEffect(() => {
    const lastRouteName = routeHistory[routeHistory.length - 2]?.name;
    const comingFromWho = lastRouteName === Routes.Who.name;
    const comingFromWhat = lastRouteName === Routes.What.name;
    const comingFromWhen = lastRouteName === Routes.When.name;

    if (comingFromWho) {
      setStateFirst('Home-all');
      setStateSecond('Home-vertical');
      setStateThird('Home-horizontal');
      setStateFourth('Home-dot');
    } else if (comingFromWhat) {
      setStateFirst('Home-vertical');
      setStateSecond('Home-all');
      setStateThird('Home-dot');
      setStateFourth('Home-horizontal');
    } else if (comingFromWhen) {
      setStateFirst('Home-horizontal');
      setStateSecond('Home-dot');
      setStateThird('Home-all');
      setStateFourth('Home-vertical');
    }

    setTimeout(() => {
      setStateFirst('');
      setStateSecond('');
      setStateThird('');
      setStateFourth('');
    }, 20);
  }, []);

  const onFirstHover = () => {
    setStateFirst('Home-bigSquare');
    setStateSecond('Home-highRectangle');
    setStateThird('Home-wideRectangle');
    setStateFourth('Home-smallSquare');
  };

  const onFirstClick = () => {
    setStateFirst('Home-all');
    setStateSecond('Home-vertical');
    setStateThird('Home-horizontal');
    setStateFourth('Home-dot');

    const whoRoute = toAbsolute(langParam + Routes.Who.route);
    setTimeout(() => history.push(whoRoute), 300);
  };

  const onSecondHover = () => {
    setStateFirst('Home-highRectangle');
    setStateSecond('Home-bigSquare');
    setStateThird('Home-smallSquare');
    setStateFourth('Home-wideRectangle');
  };

  const onSecondClick = () => {
    setStateFirst('Home-vertical');
    setStateSecond('Home-all');
    setStateThird('Home-dot');
    setStateFourth('Home-horizontal');

    const whatRoute = toAbsolute(langParam + Routes.What.route);
    setTimeout(() => history.push(whatRoute), 300);
  };

  const onThirdHover = () => {
    setStateFirst('Home-wideRectangle');
    setStateSecond('Home-smallSquare');
    setStateThird('Home-bigSquare');
    setStateFourth('Home-highRectangle');
  };

  const onThirdClick = () => {
    setStateFirst('Home-horizontal');
    setStateSecond('Home-dot');
    setStateThird('Home-all');
    setStateFourth('Home-vertical');

    const whenRoute = toAbsolute(langParam + Routes.When.route);
    setTimeout(() => history.push(whenRoute), 300);
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
      onFirstClick={onFirstClick}
      onSecondHover={onSecondHover}
      onSecondClick={onSecondClick}
      onThirdHover={onThirdHover}
      onThirdClick={onThirdClick}
      onFourthHover={onFourthHover}
      onFourthClick={onFourthClick}
      onGridLeave={onGridLeave}
    />
  );
};
export default Home;
