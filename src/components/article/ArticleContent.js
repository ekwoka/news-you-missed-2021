import Markdown from 'markdown-to-jsx';
import { articleMDOptions } from '../../data/utils';
import RespImage from '../respImage';

export default function ArticleContent({ details, content }) {
  return (
    <>
      <article-details class="prose max-w-prose prose-emerald p-4 mx-auto w-full block">
        <h1 class="mb-4">{details.title}</h1>
        {details.url && (
          <a href={details.url} target="_blank">
            See Article
          </a>
        )}
      </article-details>
      {details.thumbnail && (
        <RespImage
          class="w-full max-h-[33vh] object-cover mb-8 mx-auto max-w-screen-xl"
          src={details.thumbnail}
          alt={details.title}
        />
      )}
      <Markdown
        class="max-w-prose mx-auto px-4 prose prose-emerald"
        options={articleMDOptions}>
        {content}
      </Markdown>
    </>
  );
}
