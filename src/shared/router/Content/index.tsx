import React from 'react';
import { connect, useSelector } from 'react-redux';
import { Switch } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import CookiesBanner from 'Components/CookiesBanner';
import Header from 'Components/Header';
import { selectPathWithoutLanguageParam } from 'Modules/Routes/selectors/selectPathWithoutLanguageParam';
import { selectSessionLoggedIn } from 'Modules/Session/selectors/selectSessionLoggedIn';
import { selectUiSidebarleftState } from 'Modules/Ui/selectors/selectUiSidebarleftState';
import { Location } from 'Services/History';

import './Content.less';

interface Props {
  loggedIn: boolean;
  location: Location;
  pathWithoutLanguageParam: string;
}

// Fades are commented out to mark the correct place to render them if needed
const Content: React.FC<Props> = ({ location, pathWithoutLanguageParam }) => {
  const sidebarLeftClosed = useSelector(selectUiSidebarleftState);

  return (
    <div className="Content">
      <div className="Content-contentBackground" />
      <Header />
      <CookiesBanner />
      <div className={'Content-content' + (sidebarLeftClosed ? ' Content-content--sidebarLeftClosed' : '')}>
        {/* INTENDED => <Fade classname="Content-sidebarLeft" mounted speed="fastest" delayIn={250} appear> */}
        {/* INTENDED => </Fade> */}
        {/* INTENDED =><FadeInOut valueToUpdate={pathWithoutLanguageParam} speed="fastest" appear> */}
        <div className="Content-main">
          <Switch location={{ ...location, pathname: pathWithoutLanguageParam }}>
            {/* <Route exact={Routes.Home.exact} path={Routes.Home.path} component={Home} /> */}
          </Switch>
        </div>
        {/* INTENDED => </FadeInOut> */}
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  loggedIn: selectSessionLoggedIn,
  pathWithoutLanguageParam: selectPathWithoutLanguageParam,
});

export default connect(mapStateToProps, {})(Content);
