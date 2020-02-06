import ReactGA from 'react-ga';
import config from 'config';

export const initializeGA = () => {
  if (config.env === 'production') {
    ReactGA.initialize(config.GAPropertyId);
  }
};

export const recordPageView = path => {
  if (config.env === 'production') {
    ReactGA.pageview(path);
  }
};

export const recordGAEvent = (category, action, label) => {
  if (!category || !action) {
    console.warn('GA Event: Category and action are required - aborting');
  } else if (config.env === 'production') {
    const payload = {
      category,
      action
    };
    if (label) payload.label = label;
    ReactGA.event(payload);
  }
};
