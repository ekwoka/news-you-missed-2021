import RespImage from '../../components/respImage';
import { Link } from 'preact-router/match';

export default function ArticlePreview({ details, preview }) {
  return (
    <Link
      href={`/article/${details.title.replaceAll(' ', '-').toLowerCase()}`}
      class="mt-8 block w-full cursor-pointer px-8 no-underline">
      <h2 class="my-4">{details.title}</h2>
      {details.thumbnail && (
        <RespImage
          class="max-h-[25vh] w-full object-cover"
          src={details.thumbnail}
          alt={details.title}
        />
      )}
      {preview && <p>{preview}</p>}

      <button class="block text-emerald-500 underline">Read More</button>
    </Link>
  );
}
