import axios from 'axios';

const startFetch = (value, i18nInstance) => axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(value)}`)
  .then((response) => {
    if (response.status === 200) {
      return response.data;
    }
    throw new Error(i18nInstance.t('Network Error'));
  });

export default startFetch;
