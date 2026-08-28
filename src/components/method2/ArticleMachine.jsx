// ArticlePage.jsx
import { useParams } from "react-router-dom";
import articleData from "./articles.json";
import ArticleTemplate from "../../components/sampleTemplate/ArticleTemplate.jsx";

const ArticlePage = () => {
  const { slug } = useParams();
  const article = articleData.articles.find((a) => a.slug === slug);

  if (!article) {
    return <p className="max-w-4xl mx-auto px-6 py-16">Page not found.</p>;
  }

  return (
    <ArticleTemplate
      title={article.title}
      subtitle={article.subtitle}
      body={article.body}
    />
  );
};

export default ArticlePage;