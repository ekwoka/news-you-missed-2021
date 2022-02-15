import Markdown from 'markdown-to-jsx';
import { usePrerenderData } from '../../plugins/preact/prerender-data-provider/hook';

export default function Article(props) {
  const [data, isLoading] = usePrerenderData(props);
  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        Loading...
      </div>
    );
  }
  if (data?.data) {
    const { details, content } = data.data;
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
}
