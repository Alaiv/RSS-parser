
const renderError = (element, err) => {
    const nextElement = element.nextElementSibling
    if (nextElement) {
        nextElement.textContent = err;
        return;
    }

    element.classList.add('is-invalid');
    const errDiv = document.createElement('div');
    errDiv.classList.add('invalid-feedback');
    errDiv.textContent = err;
    element.after(errDiv);
}

const removeError = (element) => {
    const nextElement = element.nextElementSibling
    if (!nextElement) return;
    element.classList.remove('is-invalid');
    element.nextElementSibling.remove();
}

const render = (form, inp, state) => {
    const {rssField} = state;

    if (!rssField.valid) {
        renderError(inp, rssField.errors[0]);
    } else {
        removeError(inp);
    }
}

export default render;