import RespImage from '../../components/respImage';
import { Link } from 'preact-router/match';

export default function ArticlePreview({ details, preview }) {
  return (
    <Link
      href={`/article/${details.title.replaceAll(' ', '-').toLowerCase()}`}
      class="block w-full px-8 no-underline cursor-pointer mt-8">
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
  );
}
