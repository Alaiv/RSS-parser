import onPostOpen from '../controllers/onPostOpen';

class ReadyData {
  static readyCard(title, i18nInstance) {
    const postsCard = document.createElement('div');
    postsCard.classList.add('border-0', 'card');
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    const h2 = document.createElement('h2');
    h2.classList.add('card-title', 'h4');
    h2.textContent = i18nInstance.t(title);
    cardBody.append(h2);

    const ul = document.createElement('ul');
    ul.classList.add('list-group', 'border-0', 'rounded-0');
    return [postsCard, cardBody, ul];
  }

  static appendFeeds(feeds, feedsUl) {
    feeds.forEach((feed) => {
      const li = document.createElement('li');
      li.classList.add('list-group-item', 'border-0', 'border-end-0');
      const h3 = document.createElement('h3');
      h3.classList.add('h6', 'm-0');
      const p = document.createElement('p');
      p.classList.add('m-0', 'small', 'text-black-50');
      h3.textContent = feed.title;
      p.textContent = feed.desc;
      li.append(h3, p);
      feedsUl.append(li);
    });
  }

  static appendPosts(state, postsUl, i18nInstance) {
    state.posts.forEach((post) => {
      const li = document.createElement('li');
      const type = state.readedPosts[post.id] ? ['fw-normal', 'link-secondary'] : ['fw-bold'];
      li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'allign-items-start', 'border-0', 'border-end-0');

      const a = document.createElement('a');
      a.setAttribute('href', post.link);
      a.classList = type.join(' ');
      a.dataset.id = post.id;
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener noreferrer');
      a.textContent = post.title;

      const button = document.createElement('button');
      button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
      button.dataset.id = post.id;
      button.dataset.bsToggle = 'modal';
      button.dataset.bsTarget = '#modal';
      button.textContent = i18nInstance.t('btnLook');
      li.append(a);
      li.append(button);

      button.addEventListener('click', (e) => {
        onPostOpen(e.target, state);
      });
      a.addEventListener('click', (e) => {
        onPostOpen(e.target, state);
      });
      postsUl.append(li);
    });
  }
}

export default ReadyData;
