import onChange from 'on-change'
import render from './view/view.js';
import * as yup from 'yup';

yup.addMethod(yup.array, 'unique', function(message, mapper = a => a) {
    return this.test('unique', message, function (list) {
        return list.length === new Set(list.map(mapper)).size;
    })
})

const schema = yup.object().shape(
    {
        link: yup.string().required('Please enter url').url('Enter valid url'),
        links: yup.array().unique('Url must be unique')
    }
)


const validateForm = (form, input, watchedState) => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const fieldValue = data.get('link');
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
                const errors = err.inner[0].errors;
                watchedState.rssField.valid = false;
                watchedState.rssField.errors = errors;
            });
    });
}


const initApp = () => {
    const state = {
        rssField: {
            valid: true,
            value: '',
            errors: [],
            links: []
        }
    };

    const form = document.querySelector('.rss-form');
    const input = document.querySelector('#rss-inp')

    const watchedState = onChange(state, () => render(form, input, watchedState));
    validateForm(form, input, watchedState);
    render(form, input, watchedState);
};

export default initApp;