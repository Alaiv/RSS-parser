import ReadyData from "./createFeedPosts";

const renderMessage = (err, status, i18nInstance) => {
    const element = document.querySelector('.feedback');
    if (status === 'valid') {
        element.textContent = i18nInstance.t('RSS success');
        element.classList.remove('text-danger');
        element.classList.add('text-success');
    } else {
        element.classList.remove('text-success');
        element.classList.add('text-danger');
        element.textContent = err;
    }
}

const renderPosts = (state, i18nInstance, postsContainer, feedsContainer) => {
    if (!state.posts.length) return;

    const [postsCard, postCardBody, postsUl] = ReadyData.readyCard('posts', i18nInstance);
    const [feedsCard, feedsCardBody, feedsUl] = ReadyData.readyCard('feeds', i18nInstance);
    ReadyData.appendFeeds(state.feeds, feedsUl);
    ReadyData.appendPosts(state.posts, postsUl);

    feedsCard.append(feedsCardBody, feedsUl);
    feedsContainer.append(feedsCard);
    postsCard.append(postCardBody, postsUl);
    postsContainer.append(postsCard);
}

const render = (form, inp, state, i18nInstance) => {
    const postsContainer = document.querySelector('.posts');
    const feedsContainer = document.querySelector('.feeds');
    postsContainer.innerHTML = '';
    feedsContainer.innerHTML = '';
    const {rssField} = state;
    renderMessage(rssField.errors[0], state.status, i18nInstance);

    const button = document.querySelector('#add-btn');
    if (state.status === 'fetching') {
        button.disabled = true;
    } else {
        button.removeAttribute('disabled');
    }
    renderPosts(state, i18nInstance, postsContainer, feedsContainer)
}

export default render;