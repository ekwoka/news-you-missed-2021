import { useEffect, useState } from 'preact/hooks';
import lunr from 'lunr';
import { getArticles } from '../../data/utils/getArticles';
import ArticlePreview from '../../components/article/ArticlePreview';
import Searchbar from '../../components/search';
import debounce from '../../data/utils/debounce';
import { route } from 'preact-router';

export default function Search({ query }) {
  const [articles, setArticles] = useState([]);
  const [index, setIndex] = useState(null);
  const [searchQ, setQ] = useState(query != 'undefined' ? query : '');

  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!articles || !articles.length) return;
    const idx = lunr(function () {
      this.field('title');
      this.field('body');
      this.ref('index');
      articles.forEach((article, index) => {
        const title = article.details.title;
        const body = article.body;
        this.add({ title, body, index });
      });
    });
    setIndex(idx);
  }, [articles]);

  useEffect(() => {
    async function fetchData() {
      const articles = await getArticles();
      if (articles.e) return console.log(articles.e);
      setArticles(articles.data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (!searchQ || !index) return setResults([]);
    const lunrQuery = searchQ
      .split(' ')
      .map((term) =>
        term.length > 3
          ? `${term}~${term.length > 8 ? 3 : Math.floor(term.length / 3)}`
          : term
      )
      .join(' ');
    const results = index.search(lunrQuery);
    setResults(results);
  }, [searchQ, index]);

  const handleSearch = debounce((e) => {
    setQ(e.target.value);
    route(`/search/${e.target.value}`);
  });

  return (
    <>
      <Searchbar
        query={searchQ}
        callback={handleSearch}
        class="mx-auto block max-w-screen-sm px-8 pt-8"
      />
      <search-summary class="prose mx-auto flex max-w-prose flex-row justify-between border-0 border-b-2 border-emerald-600/50 px-4 pb-2 pt-8">
        <span class="block">
          {results.length || searchQ.length < 3 ? articles.length : 0} Results
        </span>
        <span class="block capitalize">
          {results.length ? `for ${searchQ}` : 'showing all articles'}
        </span>
      </search-summary>
      <section class="divide-emerald-800/15 prose mx-auto flex w-full max-w-prose flex-col gap-y-8 divide-y-2 pb-12">
        {results.length > 0 ? (
          results.map((res, i) => {
            const article = articles[res.ref];
            return (
              <ArticlePreview
                details={article.details}
                preview={article.preview}
                key={i}
              />
            );
          })
        ) : articles.length > 0 && searchQ.length < 3 ? (
          articles.map((article, i) => {
            return (
              <ArticlePreview
                details={article.details}
                preview={article.preview}
                key={i}
              />
            );
          })
        ) : (
          <div class="flex flex-col gap-y-4 pt-8 text-center">
            <span>No Results</span>
            <span>Try broadening your search, or using other terms</span>
          </div>
        )}
      </section>
    </>
  );
}
