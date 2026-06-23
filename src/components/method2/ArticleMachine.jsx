// ArticlePage.jsx
import { useParams } from "react-router-dom";
import articles from "../method2/articles.js";  
import ArticleTemplate from "../../components/sampleTemplate/ArticleTemplate.jsx";

const ArticlePage = () => {
  const { slug } = useParams();
  const article = articles[slug];

  if (!article) {
    return <p className="max-w-4xl mx-auto px-6 py-16">Page not found.</p>;
  }

  return <ArticleTemplate title={article.title} body={article.body} />;
};

export default ArticlePage;