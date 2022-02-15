import { Link } from 'preact-router/match';
import { usePrerenderData } from '../../plugins/preact/prerender-data-provider/hook';
import RespImage from '../../components/respImage';

export default function Articles(props) {
  const [data, isLoading] = usePrerenderData(props);

  return (
    <section class="w-full prose flex flex-col gap-y-8 divide-y-2 max-w-prose mx-auto">
      {!isLoading &&
        data?.data &&
        data.data.map(({ details, preview }, i) => (
          <Link
            href={`/article/${details.title
              .replaceAll(' ', '-')
              .toLowerCase()}`}
            class="block w-full px-8 no-underline cursor-pointer mt-8"
            key={i}>
            <h2 class="my-4">{details.title}</h2>
            {details.thumbnail && (
              <RespImage
                class="w-full max-h-[25vh] object-cover"
                src={details.thumbnail}
                alt={details.title}
              />
            )}
            {preview && <p>{preview}</p>}

            <button class="block underline text-emerald-500">Read More</button>
          </Link>
        ))}
    </section>
  );
}
