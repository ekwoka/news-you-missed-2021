import RespImage from '../../components/respImage';
import { Link } from 'preact-router/match';
import { route } from 'preact-router';

export default function ArticlePreview({ details, preview }) {
  return (
    <article-card class="mt-8 block w-full px-8">
      <h2
        class="my-4 cursor-pointer"
        onClick={() =>
          route(`/article/${details.title.replaceAll(' ', '-').toLowerCase()}`)
        }>
        {details.title}
      </h2>
      {details.thumbnail && (
        <RespImage
          class="max-h-[25vh] w-full object-cover"
          src={details.thumbnail}
          alt={details.title}
        />
      )}
      {preview && <p class="line-clamp-3">{preview}</p>}

      <Link
        href={`/article/${details.title.replaceAll(' ', '-').toLowerCase()}`}
        class="block text-emerald-600 underline">
        Read More
      </Link>
    </article-card>
  );
}
