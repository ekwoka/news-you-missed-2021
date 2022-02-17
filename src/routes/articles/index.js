import ArticlePreview from '../../components/article/ArticlePreview';
import useArticles from '../../hooks/useArticles';

export default function Articles() {
  const [articles, ready] = useArticles();

  return (
    <section class="prose mx-auto flex w-full max-w-prose flex-col gap-y-8 divide-y-2">
      {ready &&
        articles.map(({ details, preview }, i) => (
          <ArticlePreview details={details} preview={preview} key={i} />
        ))}
    </section>
  );
}
