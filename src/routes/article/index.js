import ArticleContent from '../../components/article/ArticleContent';
import { usePrerenderData } from '../../plugins/preact/prerender-data-provider/hook';

export default function Article(props) {
  const [data, isLoading] = usePrerenderData(props);
  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        Loading...
      </div>
    );
  }
  if (data?.data) {
    const { details, content } = data.data;
    return <ArticleContent details={details} content={content} />;
  }
}
