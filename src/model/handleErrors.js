/* eslint-disable no-param-reassign */
const handleErrors = (state, errors) => {
  state.status = 'invalid';
  state.rssField.errors = errors;
};

export default handleErrors;
