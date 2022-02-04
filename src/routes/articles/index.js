import { usePrerenderData } from '../../plugins/preact/prerender-data-provider/hook';

export default function Articles(props) {
  const [data, isLoading] = usePrerenderData(props);

  return (
    <section class="w-full prose flex flex-col gap-y-2 divide-y-2">
      {!isLoading &&
        data?.data &&
        data.data.map(({ details, preview }, i) => (
          <article-card class="w-full px-8" key={i}>
            <h2>{details.title}</h2>
            <img src={details.thumbnail} alt={details.title} />
            <p>{preview}</p>
          </article-card>
        ))}
    </section>
  );
}
