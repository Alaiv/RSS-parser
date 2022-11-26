import setActivePosts from '../model/setActivePosts';

const onPostOpen = (target, state) => {
  setActivePosts(target, state);
};

export default onPostOpen;
