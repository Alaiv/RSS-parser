const setActivePosts = (target, state) => {
    const id = target.dataset.id;
    const post = state.posts.filter(p => p.id === id);
    state.activePost = post;
    state.readedPosts[id] = true;
}

export default setActivePosts;