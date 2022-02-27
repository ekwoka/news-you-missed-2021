import Markdown from 'markdown-to-jsx';
import { useState } from 'preact/hooks';
import { articleMDOptions } from '../../data/utils';
import useImage from '../../hooks/useImage';
import PlaceholderImage from '../placeholders/image';
import RespImage from '../respImage';

export default function ArticleContent({ details, content }) {
  const [image, ready] = useImage(`${details.title} ${details.keywords}`);
  const [error, setError] = useState(false);
  return (
    <>
      <div class="prose prose-emerald mx-auto block w-full max-w-prose p-4">
        <h1 class="mb-4">{details.title}</h1>
        {details.url && (
          <a href={details.url} target="_blank" rel="noreferrer noopener">
            See Article
          </a>
        )}
      </div>
      {ready && !error && (
        <RespImage
          class="mx-auto mb-8 max-h-[33vh] w-full max-w-screen-xl object-cover"
          src={image.contentUrl}
          width={image.width}
          height={image.height}
          alt={image.title}
          onError={() => setError(true)}
        />
      )}
      {!ready && !error && (
        <PlaceholderImage class="mx-auto mb-8 h-[33vh] max-w-screen-xl xl:rounded-lg" />
      )}
      <Markdown
        class="prose prose-emerald mx-auto max-w-prose px-4 pb-12"
        options={articleMDOptions}>
        {content}
      </Markdown>
    </>
  );
}
