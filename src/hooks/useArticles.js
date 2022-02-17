import { useEffect, useState } from 'preact/hooks';
import { getArticle, getArticles } from '../data/utils/getArticles';

let cache = [];
let complete = false;

export default function useArticles(callback = (arr) => arr) {
  const [ready, setReady] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      if (complete) {
        setData(callback(cache));
        setReady(true);
      } else {
        const { data } = await getArticles();
        cache = data;
        complete = true;
        setData(callback(data));
        setReady(true);
      }
    })();
  }, [callback]);

  return [data, ready];
}

export function useArticle(country) {
  const [ready, setReady] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    if (!country) return;
    (async () => {
      const article = cache.find(
        ({ details }) => details.title.toLowerCase() == country.toLowerCase()
      );

      if (article !== undefined) {
        setData(article);
        setReady(true);
      } else {
        const article = await getArticle(country);
        if (article.e) return;
        cache.push(article);
        setData(article);
        setReady(true);
      }
    })();
  }, [country]);

  return [data, ready];
}
