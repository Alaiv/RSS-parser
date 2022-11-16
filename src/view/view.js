
const renderError = (element, err, nextElement) => {
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

const renderErrors = (element, err, isValid) => {
    const nextElement = element.nextElementSibling
    if (isValid) {
        if (!nextElement) return;
        element.classList.remove('is-invalid');
        element.nextElementSibling.remove();
    } else {
        renderError(element, err, nextElement);
    }
}

const render = (form, inp, state) => {
    const {rssField} = state;
    
    renderErrors(inp, rssField.errors[0], rssField.valid)
}

export default render;