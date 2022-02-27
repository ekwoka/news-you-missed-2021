import ArticleContent from '../../components/article/ArticleContent';
import { useArticle } from '../../hooks/useArticles';

export default function Article(props) {
  const [data, ready] = useArticle(props.country);
  if (!ready) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        Loading...
      </div>
    );
  }
  if (ready) {
    const { details, body, preview } = data;
    return (
      <ArticleContent details={details} content={body} preview={preview} />
    );
  }
}
