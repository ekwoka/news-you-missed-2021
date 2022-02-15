import { PRERENDER_DATA_FILE_NAME } from '../../plugins/preact/prerender-data-provider/constants';

async function getArticles() {
  return await articleFetch('/articles');
}

async function getArticle(name) {
  name = name.replaceAll(' ', '-').toLowerCase();
  return await articleFetch(`/article/${name}`);
}

async function articleFetch(baseURL) {
  try {
    const response = await fetch(`${baseURL}/${PRERENDER_DATA_FILE_NAME}`);
    const json = await response.json();
    return json;
  } catch (e) {
    return { e };
  }
}

export { getArticles, getArticle };
