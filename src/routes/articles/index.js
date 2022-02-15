import { usePrerenderData } from '../../plugins/preact/prerender-data-provider/hook';
import ArticlePreview from '../../components/article/ArticlePreview';

export default function Articles(props) {
  const [data, isLoading] = usePrerenderData(props);

  return (
    <section class="w-full prose flex flex-col gap-y-8 divide-y-2 max-w-prose mx-auto">
      {!isLoading &&
        data?.data &&
        data.data.map(({ details, preview }, i) => (
          <ArticlePreview details={details} preview={preview} key={i} />
        ))}
    </section>
  );
}
