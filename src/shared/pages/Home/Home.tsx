import React from 'react';

import './Home.less';

interface Props {
  stateFirst: string;
  stateSecond: string;
  stateThird: string;
  stateFourth: string;
  onFirstHover: () => void;
  onFirstClick: () => void;
  onSecondHover: () => void;
  onSecondClick: () => void;
  onThirdHover: () => void;
  onThirdClick: () => void;
  onFourthHover: () => void;
  onFourthClick: () => void;
  onGridLeave: () => void;
}

export const Home: React.FC<Props> = ({
  stateFirst,
  stateSecond,
  stateThird,
  stateFourth,
  onFirstHover,
  onFirstClick,
  onSecondHover,
  onSecondClick,
  onThirdHover,
  onThirdClick,
  onFourthHover,
  onFourthClick,
  onGridLeave,
}) => (
  <div className="Home">
    <div className="Home-grid" onMouseLeave={onGridLeave}>
      <div className={'Home-item ' + stateFirst} onMouseEnter={onFirstHover} onClick={onFirstClick}>
        Who
      </div>
      <div className={'Home-item ' + stateSecond} onMouseEnter={onSecondHover} onClick={onSecondClick}>
        What
      </div>
      <div className={'Home-item ' + stateThird} onMouseEnter={onThirdHover} onClick={onThirdClick}>
        When
      </div>
      <div className={'Home-item ' + stateFourth} onMouseEnter={onFourthHover} onClick={onFourthClick}>
        Where
      </div>
    </div>
  </div>
);
