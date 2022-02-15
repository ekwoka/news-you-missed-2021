import { usePrerenderData } from '../../plugins/preact/prerender-data-provider/hook';
import ArticlePreview from '../../components/article/ArticlePreview';

export default function Articles(props) {
  const [data, isLoading] = usePrerenderData(props);

  return (
    <section class="prose mx-auto flex w-full max-w-prose flex-col gap-y-8 divide-y-2">
      {!isLoading &&
        data?.data &&
        data.data.map(({ details, preview }, i) => (
          <ArticlePreview details={details} preview={preview} key={i} />
        ))}
    </section>
  );
}
