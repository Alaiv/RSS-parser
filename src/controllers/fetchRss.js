/* eslint-disable no-param-reassign */
import _ from 'lodash';
import parse from '../helpers/parser';
import startFetch from '../helpers/api';

const insertPosts = (posts, feedId) => posts.map((p) => ({ ...p, id: _.uniqueId(), feedId }));

export const checkForRssUpdates = (links, i18nInstance, state) => {
  const promises = links.map((link) => startFetch(link, i18nInstance)
    .then((data) => {
      const [feed, posts] = parse(data.contents);
      const currentPosts = state.posts.map((post) => post.title);
      const filteredPosts = posts.filter((post) => !currentPosts.includes(post.title));
      if (filteredPosts.length) {
        const id = state.feeds.filter((stfeed) => stfeed.title === feed.title);
        insertPosts(filteredPosts, id, state);
      }
    })
    .catch((e) => console.log(e.message)));

  Promise.all(promises).then(() => {
    setTimeout(() => checkForRssUpdates(links, i18nInstance, state), 5000);
  });
};

const fetchRss = (i18nInstance, watchedState, value) => startFetch(value, i18nInstance)
  .then((data) => {
    const [feed, posts, success] = parse(data.contents);
    if (success) {
      const feedId = _.uniqueId();
      feed.id = feedId;
      watchedState.feeds.unshift(feed);
      const newPosts = insertPosts(posts, feedId, watchedState);
      watchedState.posts = newPosts;
      watchedState.status = 'valid';
    } else {
      throw new Error('parseErr');
    }
  })
  .catch((e) => {
    throw new Error(e.message);
  });

export default fetchRss;
