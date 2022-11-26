class RssData {
  constructor(item) {
    this.title = item.querySelector('title').textContent.trim();
    this.desc = item.querySelector('description').textContent.trim();
    this.link = item.querySelector('link').nextSibling.textContent.trim();
    this.id = this.setId.bind(this);
  }

  setId(id) {
    this.id = id;
  }
}
const parse = (docs) => {
  try {
    const stuff = new DOMParser();
    const dc = stuff.parseFromString(docs, 'application/xml');
    const channel = dc.documentElement.querySelector('channel');
    const items = channel.querySelectorAll('item');
    const posts = [...items].map((item) => new RssData(item));
    const feed = new RssData(channel);
    return [feed, posts, true];
  } catch (e) {
    return [[], [], false];
  }
};

export default parse;
