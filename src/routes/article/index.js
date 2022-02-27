import ArticleContent from '../../components/article/ArticleContent';
import PlaceholderArticle from '../../components/placeholders/article';
import { useArticle } from '../../hooks/useArticles';

export default function Article(props) {
  const [data, ready] = useArticle(props.country);
  if (!ready) {
    return <PlaceholderArticle />;
  }
  if (ready) {
    const { details, body, preview } = data;
    return (
      <ArticleContent details={details} content={body} preview={preview} />
    );
  }
}
