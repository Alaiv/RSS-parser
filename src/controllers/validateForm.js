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
                watchedState.rssField.valid = true;
                watchedState.rssField.errors = [];
                linksCurr.push(value);
                form.reset();
                input.focus();
            })
            .catch((err) => {
                console.log(err.errors)
                const errors = err.errors.map((err) => i18nInstance.t(err));
                watchedState.rssField.valid = false;
                watchedState.rssField.errors = errors;
            });
    });
}

export default validateForm;