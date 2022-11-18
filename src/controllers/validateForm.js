import fetchRss, { checkForRssUpdates } from "./fetchRss";

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
                fetchRss(i18nInstance, watchedState, value)
                    .then(() => {
                        checkForRssUpdates(linksCurr, i18nInstance, watchedState)
                    })
                    .catch(e => {
                        watchedState.status = 'invalid';
                        watchedState.rssField.errors = [e.message];
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