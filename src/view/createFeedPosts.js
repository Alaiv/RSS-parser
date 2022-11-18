
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
        ul.classList.add('list-group', "border-0", 'rounded-0');
        return [postsCard, cardBody, ul];
    }

    static appendFeeds(feeds, feedsUl) {
       feeds.forEach(feed => {
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
        })
    }

    static appendPosts(posts, postsUl) {
        posts.forEach(post => {
            const li = document.createElement('li');
            li.classList.add('list-group-item', 'd-flex', "justify-content-between", "allign-items-start", "border-0", "border-end-0");
            const a = `<a href="${post.link}" class="fw-bold" data-id="${post.id}" target="_blank" rel="noopener noreferrer">${post.title}</a>`;
            li.innerHTML = a;
            postsUl.append(li);
        })
    }
}

export default ReadyData;