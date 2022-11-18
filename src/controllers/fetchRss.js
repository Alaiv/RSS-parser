import parse from "../helpers/parser";
import _ from 'lodash';
import startFetch from "../helpers/api";

const insertPosts = (posts, feedId, state) => {
    posts.forEach(p => {
        p.id = _.uniqueId();
        p.feedId = feedId;
    });
    state.posts.unshift(...posts);
}

export const checkForRssUpdates = (links, i18nInstance, state) => {
    const promise = new Promise((resolve) => {
        links.forEach((link) => {
            startFetch(link, i18nInstance)
                .then((data) => {
                    const [feed, posts] = parse(data.contents)
                    const currentPosts = state.posts.map(post => post.title);
                    const filteredPosts = posts.filter(post => !currentPosts.includes(post.title));
                    if (filteredPosts.length) {
                        const id = state.feeds.filter(stfeed => stfeed.title === feed.title);
                        insertPosts(filteredPosts, id, state);
                    }
                })
                .catch((e) => console.log(e.message));
        })
        resolve(true)
    })
    promise.then(() => {
        setTimeout(() => checkForRssUpdates(links, i18nInstance, state), 5000);
    })
}


const fetchRss = (i18nInstance, watchedState, value) => {
       return startFetch(value, i18nInstance)
            .then(data => {
                const [feed, posts, success] = parse(data.contents);
                if (success) {
                    watchedState.status = 'valid';
                    const feedId = _.uniqueId();
                    feed.id = feedId;
                    watchedState.feeds.unshift(feed);
                    insertPosts(posts, feedId, watchedState);
                } else {
                    throw new Error(i18nInstance.t('parseErr'));
                }
            })
            .catch(e => {
                throw new Error(e.message)
            })
}

export default fetchRss;