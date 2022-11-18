import parse from "../helpers/parser";
import _ from 'lodash';

const validateForm = (form, input, watchedState, schema, i18nInstance) => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const fieldValue = data.get('url');
        watchedState.rssField.value = fieldValue;
        
        const value = watchedState.rssField.value;
        const linksCurr = watchedState.rssField.links;

        schema.validate({link: value, links: [...linksCurr, value]}, {abortEarly: false})
            .then(() => {
                watchedState.rssField.errors = [];
                linksCurr.push(value);
                form.reset();
                input.focus();
            })
            .then(() => {
                watchedState.status = 'fetching';
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
            })
            .catch((err) => {
                const errors = err.errors.map((err) => i18nInstance.t(err));
                watchedState.status = 'invalid';
                watchedState.rssField.errors = errors;
            });
    });
}

export default validateForm;