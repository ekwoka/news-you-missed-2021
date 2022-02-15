import { useEffect, useState } from 'preact/hooks';
import ArticleContent from '../../components/article';
import Map from '../../components/map';
import { getArticle } from '../../data/utils/getArticles';
import { useGlobalState } from '../../plugins/preact/globalState';

export default function MapRoute({ country }) {
  const [currentCountry] = useGlobalState('country');
  const [article, setArticle] = useState(null);

  useEffect(() => {
    async function fetchData() {
      if (!currentCountry) return setArticle(null);
      const nextArticle = await getArticle(currentCountry);
      if (nextArticle.e) return console.log(nextArticle.e);
      setArticle(nextArticle);
    }
    fetchData();
  }, [currentCountry]);

  return (
    <main class="w-full flex flex-col gap-y-4">
      <Map country={country} />
      {article?.data && (
        <ArticleContent
          details={article.data.details}
          content={article.data.content}
        />
      )}
    </main>
  );
}
