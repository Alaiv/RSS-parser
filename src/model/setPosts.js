import fetchRss, { checkForRssUpdates } from './fetchRss';

/* eslint-disable no-param-reassign */
const setPosts = (watchedState, i18nInstance, value, linksCurr) => {
  watchedState.rssField.errors = [];
  watchedState.status = 'fetching';
  fetchRss(i18nInstance, watchedState, value)
    .then(() => {
      linksCurr.push(value);
      if (!watchedState.isUpdating) {
        watchedState.isUpdating = true;
        setTimeout(() => checkForRssUpdates(linksCurr, i18nInstance, watchedState), 5000);
      }
    })
    .catch((e) => {
      watchedState.status = 'invalid';
      watchedState.rssField.errors = [e.message];
    });
};

export default setPosts;
