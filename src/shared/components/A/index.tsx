import React, { HTMLProps } from 'react';
import { animateScroll as scroll, Events } from 'react-scroll';

import history from 'Services/History';
import { A as ComponentsA } from '@antoniodcorrea/components';

interface Props extends HTMLProps<HTMLAnchorElement> {
  children: React.ReactNode;
  className?: string;
  id?: string;
  href: string;
  frontend?: boolean;
  styled?: boolean;
  active?: boolean;
  targetBlank?: boolean;
  disabled?: boolean;
  title?: string;
  underlined?: boolean;
  scrollBeforeNavigate?: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const A: React.FC<Props> = ({ href, targetBlank, scrollBeforeNavigate = false, onClick, ...props }) => {
  const navigateToHref = () => {
    if (targetBlank) {
      window.open(href);

      return;
    }

    history.push(href);
  };

  const onLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onClick && onClick(e);

    if (!scrollBeforeNavigate) {
      navigateToHref();

      return;
    }

    Events.scrollEvent.register('end', () => {
      navigateToHref();
      Events.scrollEvent.remove('end');
    });

    scroll.scrollToTop({
      duration: 120,
      smooth: 'easeOutQuart',
    });
  };

  return <ComponentsA {...props} href={href} onClick={onLinkClick} targetBlank={targetBlank} />;
};

export default A;
