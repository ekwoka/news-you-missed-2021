import Markdown from 'markdown-to-jsx';
import { usePrerenderData } from '../../plugins/preact/prerender-data-provider/hook';

export default function Article(props) {
  const [data, isLoading] = usePrerenderData(props);
  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        Loading...
      </div>
    )
  }
  if (data?.data) {
    const content = data.data.content;
    return (
      <Markdown className="prose" options={{ wrapper: 'article', forceWrapper: true }}>
        {content}
      </Markdown>
    )
  }
}
