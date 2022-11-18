import parse from "../helpers/parser";
import _ from 'lodash';

const fetchRss = (i18nInstance, watchedState, value) => {
    fetch(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(value)}`)
    .then(response => {
        if (response.ok) return response.json();
        throw new Error(i18nInstance.t('netWorkErr'));
    })
    .then(data => {
        const [feed, posts, success] = parse(data.contents);
        if (success) {
            watchedState.status = 'valid';
            const feedId = _.uniqueId();
            feed.id = feedId;
            watchedState.feeds.unshift(feed);
            posts.forEach((post) => {
                post.id = _.uniqueId();
                post.feedId = feedId;
            });
            watchedState.posts.unshift(...posts);
        } else {
            throw new Error(i18nInstance.t('parseErr'));
        }
    })
}

export default fetchRss;