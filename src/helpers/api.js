import axios from 'axios';

const startFetch = (value, i18nInstance) => {
    return axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(value)}`)
        .then(response => {
                if (response.data.status.http_code === 200) {
                    return response.data;
                }
                throw new Error(i18nInstance.t('netWorkErr'));
            })
}

export default startFetch;