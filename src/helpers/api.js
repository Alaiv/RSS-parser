import axios from 'axios';

const startFetch = (value, i18nInstance) => {
    return axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(value)}`)
        .then(response => {
            if (response.status !== 200) {
                throw new Error(i18nInstance.t('netWorkErr'));
            }
            return response.data;
        })
}

export default startFetch;