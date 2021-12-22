import React from 'react';

import './Home.less';

interface Props {
  stateFirst: string;
  stateSecond: string;
  stateThird: string;
  stateFourth: string;
  onFirstHover: () => void;
  onSecondHover: () => void;
  onThirdHover: () => void;
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
  onSecondHover,
  onThirdHover,
  onFourthHover,
  onFourthClick,
  onGridLeave,
}) => (
  <div className="Home">
    <div className="Home-grid" onMouseLeave={onGridLeave}>
      <div className={'Home-item ' + stateFirst} onMouseEnter={onFirstHover}>
        Who
      </div>
      <div className={'Home-item ' + stateSecond} onMouseEnter={onSecondHover}>
        What
      </div>
      <div className={'Home-item ' + stateThird} onMouseEnter={onThirdHover}>
        When
      </div>
      <div className={'Home-item ' + stateFourth} onMouseEnter={onFourthHover} onClick={onFourthClick}>
        Where
      </div>
    </div>
  </div>
);
