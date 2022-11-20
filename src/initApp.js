import onChange from 'on-change'
import render from './view/view.js';
import validateForm from './controllers/validateForm.js';
import i18next from 'i18next';
import resources from './helpers/resources'
import schema from './helpers/yupSchema.js'


const initApp = () => {
    const i18nInstance = i18next.createInstance();
    i18nInstance.init({
        lng: 'ru',
        debuf: false,
        resources
    }).then(() => {
        const state = {
            rssField: {
                value: '',
                errors: [],
                links: []
            },
            feeds: [],
            posts: [],
            status: null,
            isUpdating: false,
            activePost: null,
            readedPosts: {}
        };
    
        const form = document.querySelector('.rss-form');
        const input = document.querySelector('#url-input')
    
        const watchedState = onChange(state, () => render(watchedState, i18nInstance));

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const data = new FormData(e.target);
            const fieldValue = data.get('url');
            validateForm(form, input, watchedState, schema, i18nInstance, fieldValue);
        })
        render(watchedState, i18nInstance);
    })
};

export default initApp;