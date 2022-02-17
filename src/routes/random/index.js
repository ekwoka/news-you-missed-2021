import { route } from 'preact-router';
import { useEffect } from 'preact/hooks';
import useArticles from '../../hooks/useArticles';

export default function Random() {
  const [articles, ready] = useArticles();

  useEffect(() => {
    if (!ready) return;
    const newIndex = Math.floor(Math.random() * articles.length);
    route(
      `/article/${articles[newIndex].details.title
        .replaceAll(' ', '-')
        .toLowerCase()}`
    );
  }, [articles, ready]);
  return <></>;
}
