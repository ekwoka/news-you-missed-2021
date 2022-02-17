import ArticleContent from '../../components/article/ArticleContent';
import Map from '../../components/map';
import { useArticle } from '../../hooks/useArticles';
import { useGlobalState } from '../../plugins/preact/globalState';

export default function MapRoute({ country }) {
  const [currentCountry] = useGlobalState('country');
  const [article, ready] = useArticle(currentCountry);

  return (
    <main class="flex w-full flex-col gap-y-4">
      <Map country={country} />
      {ready && (
        <ArticleContent details={article.details} content={article.body} />
      )}
    </main>
  );
}
