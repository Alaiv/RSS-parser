/* eslint-disable no-param-reassign */
import fetchRss, { checkForRssUpdates } from './fetchRss';

const validateForm = (form, input, watchedState, schema, i18nInstance, fieldValue) => {
  watchedState.rssField.value = fieldValue;

  const { value } = watchedState.rssField;
  const linksCurr = watchedState.rssField.links;

  schema.validate({ link: value, links: [...linksCurr, value] }, { abortEarly: false })
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
          if (!watchedState.isUpdating) {
            watchedState.isUpdating = true;
            setTimeout(() => checkForRssUpdates(linksCurr, i18nInstance, watchedState), 5000);
          }
        })
        .catch((e) => {
          watchedState.status = 'invalid';
          watchedState.rssField.errors = [e.message];
        });
    })
    .catch((err) => {
      const { errors } = err;
      watchedState.status = 'invalid';
      watchedState.rssField.errors = errors;
    });
};

export default validateForm;
