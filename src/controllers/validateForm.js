/* eslint-disable no-param-reassign */
import handleErrors from '../model/handleErrors';
import setPosts from '../model/setPosts';

const validateForm = (form, input, watchedState, schema, i18nInstance) => {
  const { value } = watchedState.rssField;
  const linksCurr = watchedState.rssField.links;

  schema.validate({ link: value, links: [...linksCurr, value] }, { abortEarly: false })
    .then(() => {
      form.reset();
      input.focus();
      setPosts(watchedState, i18nInstance, value, linksCurr);
    })
    .catch((err) => {
      const { errors } = err;
      handleErrors(watchedState, errors);
    });
};

export default validateForm;
