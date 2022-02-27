import RespImage from '../../components/respImage';
import { Link } from 'preact-router/match';
import { route } from 'preact-router';
import useImage from '../../hooks/useImage';
import { useState } from 'preact/hooks';
import PlaceholderImage from '../placeholders/image';

export default function ArticlePreview({ details, preview }) {
  const [image, ready, ref] = useImage(
    `${details.title} ${details.keywords}`,
    true
  );
  const [error, setError] = useState(false);
  return (
    <article-card class="mt-8 block w-full px-8">
      <h2
        class="my-4 cursor-pointer"
        ref={ref}
        onClick={() =>
          route(`/article/${details.title.replaceAll(' ', '-').toLowerCase()}`)
        }>
        {details.title}
      </h2>
      {ready && !error && (
        <RespImage
          class="max-h-[25vh] w-full object-cover"
          src={image.contentUrl}
          width={image.width}
          height={image.height}
          alt={image.title}
          onError={() => setError(true)}
        />
      )}
      {!ready && !error && <PlaceholderImage class="h-[25vh] rounded-lg" />}
      {preview && <p class="line-clamp-3">{preview}</p>}

      <Link
        href={`/article/${details.title.replaceAll(' ', '-').toLowerCase()}`}
        class="block text-emerald-600 underline">
        Read More
      </Link>
    </article-card>
  );
}
