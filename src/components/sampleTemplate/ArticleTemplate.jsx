const HTML_CONTENT_PATTERN =
  /<\/?(?:p|br|h[1-6]|ul|ol|li|strong|b|em|i|u|a|blockquote|pre|code|hr|img|video|iframe|div)\b[^>]*>/i;

const ARTICLE_MEDIA_STYLES = `
  .article-content::after {
    display: block;
    clear: both;
    content: "";
  }

  .article-content img,
  .article-content video {
    display: block;
    max-width: 100%;
    height: auto;
  }

  .article-content .article-media {
    box-sizing: border-box;
    max-width: 100%;
  }

  .article-content .article-media-left {
    float: left;
    width: min(45%, 420px);
    margin: 0.35rem 1.5rem 1rem 0;
  }

  .article-content .article-media-right {
    float: right;
    width: min(45%, 420px);
    margin: 0.35rem 0 1rem 1.5rem;
  }

  .article-content .article-media-center {
    float: none;
    clear: both;
    width: min(100%, 760px);
    margin: 1.25rem auto;
  }

  .article-content [data-video-embed] iframe,
  .article-content [data-video-embed] video {
    display: block;
    width: 100%;
    aspect-ratio: 16 / 9;
    border: 0;
    background: #111827;
  }

  @media (max-width: 640px) {
    .article-content .article-media-left,
    .article-content .article-media-right {
      float: none;
      clear: both;
      width: 100%;
      margin: 1.25rem auto;
    }
  }
`;

const escapeHtml = (value = "") =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const ArticleTemplate = ({ title, subtitle, body = "" }) => {
  const bodyHtml = HTML_CONTENT_PATTERN.test(body) ? body : escapeHtml(body);

  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      <style>{ARTICLE_MEDIA_STYLES}</style>
      <h1 className="text-5xl font-bold mb-10 text-center">{title}</h1>
      {subtitle && (
        <p className="text-xl font-bold italic text-gray-500 text-center mb-10">
          {subtitle}
        </p>
      )}
      <div
        className="article-content whitespace-pre-line text-[20px] leading-[2] text-gray-700
                   [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-8 [&_h2]:mb-4
                   [&_h3]:text-2xl [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-6 [&_h3]:mb-3
                   [&_p]:mb-4
                   [&_a]:text-blue-600 [&_a]:underline [&_a]:hover:text-blue-800
                   [&_ul]:list-disc [&_ul]:ml-6 [&_ul]:mb-4
                   [&_ol]:list-decimal [&_ol]:ml-6 [&_ol]:mb-4
                   [&_li]:mb-1
                   [&_strong]:font-bold [&_strong]:text-gray-900
                   [&_em]:italic"
        dangerouslySetInnerHTML={{ __html: bodyHtml }}
      />
    </section>
  );
};

export default ArticleTemplate;
