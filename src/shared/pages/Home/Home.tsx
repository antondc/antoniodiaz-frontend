import React from 'react';

import './Home.less';

export const Home: React.FC = () => (
  <div className="Home">
    <div className="Home-grid">
      <div className={'Home-item '}>Who</div>
      <div className={'Home-item '}>What</div>
      <div className={'Home-item '}>When</div>
      <div className={'Home-item '}>
        <div className={'Home-fourthWhere'}>Where</div>
      </div>
    </div>
  </div>
);
