import React from 'react';

import { GlossaryState } from 'Modules/Languages/languages.types';

import './Home.less';

interface Props {
  stateFirst: string;
  glossary: GlossaryState;
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
  glossary,
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
        {glossary.who}
      </div>
      <div className={'Home-item ' + stateSecond} onMouseEnter={onSecondHover} onClick={onSecondClick}>
        {glossary.what}
      </div>
      <div className={'Home-item ' + stateThird} onMouseEnter={onThirdHover} onClick={onThirdClick}>
        {glossary.when}
      </div>
      <div className={'Home-item ' + stateFourth} onMouseEnter={onFourthHover} onClick={onFourthClick}>
        {glossary.where}
      </div>
    </div>
  </div>
);
