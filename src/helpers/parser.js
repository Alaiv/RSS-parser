const getData = (item) => {
  const title = item.querySelector('title').textContent.trim();
  const desc = item.querySelector('description').textContent.trim();
  const link = item.querySelector('link').nextSibling.textContent.trim();
  return { title, desc, link };
};

const parse = (docs) => {
  try {
    const stuff = new DOMParser();
    const dc = stuff.parseFromString(docs, 'application/xml');
    const channel = dc.documentElement.querySelector('channel');
    const items = channel.querySelectorAll('item');
    const posts = [...items].map((item) => getData(item));
    const feed = getData(channel);
    return [feed, posts, true];
  } catch (e) {
    return [[], [], false];
  }
};

export default parse;
