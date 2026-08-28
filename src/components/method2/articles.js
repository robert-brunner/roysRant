const articleModules = import.meta.glob("./articles/*.json", {
  eager: true,
  import: "default",
});

export const articlesArray = Object.values(articleModules);

const articles = Object.fromEntries(
  articlesArray.map((article) => [article.slug, article])
);

export default articles;
