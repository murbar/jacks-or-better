import React from 'react';
import ReactGA from 'react-ga';
import config from 'config';

// pass location object that parent component gets from the router

const useAnalyticsPageView = location => {
  React.useEffect(() => {
    if (config.env === 'production') {
      ReactGA.pageview(location.pathname + location.search);
    }
  }, [location]);
};

export default useAnalyticsPageView;
