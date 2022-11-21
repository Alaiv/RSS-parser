/* eslint-disable no-param-reassign */
const setActivePosts = (target, state) => {
  const { id } = target.dataset;
  const post = state.posts.filter((p) => p.id === id);
  state.activePost = post;
  state.readedPosts[id] = true;
};

export default setActivePosts;
