// ArticleTemplate.jsx
const ArticleTemplate = ({ title, subtitle, body }) => {
  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-5xl font-bold mb-10 text-center">{title}</h1>
      {subtitle && (
        <p className="text-xl font-bold italic text-gray-500 text-center mb-10">
          {subtitle}
        </p>
      )}
      <div
        className="article-content text-[20px] leading-[2] text-gray-700
                   [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-8 [&_h2]:mb-4
                   [&_h3]:text-2xl [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-6 [&_h3]:mb-3
                   [&_p]:mb-4
                   [&_a]:text-blue-600 [&_a]:underline [&_a]:hover:text-blue-800
                   [&_ul]:list-disc [&_ul]:ml-6 [&_ul]:mb-4
                   [&_ol]:list-decimal [&_ol]:ml-6 [&_ol]:mb-4
                   [&_li]:mb-1
                   [&_strong]:font-bold [&_strong]:text-gray-900
                   [&_em]:italic"
        dangerouslySetInnerHTML={{ __html: body }}
      />
    </section>
  );
};

export default ArticleTemplate;