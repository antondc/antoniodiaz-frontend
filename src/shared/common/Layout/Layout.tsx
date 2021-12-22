import React from 'react';

import LayoutHelperGrid from 'Common/LayoutHelperGrid';
import ScreenSizePixel from 'Components/ScreenSizePixel';
import Router from 'Router/.';
import { Location } from 'Services/History';
import { Fade, Spinner } from '@antoniodcorrea/components';

import './Layout.less';

interface Props {
  location: Location;
  renderLoader: boolean;
}

export const Layout: React.FC<Props> = ({ location, renderLoader }) => (
  <div className="Layout">
    <ScreenSizePixel />
    <div className="Layout-generalBackground" />
    <Router location={location} />
    <div className="Layout-modalsAndPortals">
      <Fade mounted={renderLoader} speed="fastest" position="fixed" appear>
        <div className="Layout-loader">
          <Spinner className="Layout-loaderIcon" size="huge" />
        </div>
      </Fade>
      <div id="Tooltips" />
      <div id="Portals" />
    </div>
  </div>
);
