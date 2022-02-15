import ArticleContent from '../../components/article';
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
    return <ArticleContent details={details} content={content} />;
  }
}
