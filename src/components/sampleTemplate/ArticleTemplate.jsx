// ArticleTemplate.jsx
import Linkify from "linkify-react";
import { useEffect, useState } from "react";

const ArticleTemplate = ({ title, body }) => {
  const [hoveredLink, setHoveredLink] = useState(null);

  useEffect(() => {
    const links = document.querySelectorAll(".article-content a");

    const handleEnter = (e) => setHoveredLink(e.currentTarget.href);
    const handleLeave = () => setHoveredLink(null);

    links.forEach((link) => {
      link.addEventListener("mouseenter", handleEnter);
      link.addEventListener("mouseleave", handleLeave);
    });

    // cleanup so listeners don't pile up
    return () => {
      links.forEach((link) => {
        link.removeEventListener("mouseenter", handleEnter);
        link.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, [body]);

  return (
    <>
      {hoveredLink && (
        <div className="fixed bottom-6 right-6 w-[400px] p-4 bg-white border border-gray-300 shadow-2xl z-50">
          <h2 className="text-sm font-bold mb-2">Link Preview</h2>
          <p className="text-sm break-all">{hoveredLink}</p>
        </div>
      )}

      <section className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl mb-10">{title}</h1>

        <div className="article-content">
          <Linkify>
            <div className="whitespace-pre-wrap break-words [overflow-wrap:anywhere] text-[20px] leading-[2] text-gray-700">
              {body}
            </div>
          </Linkify>
        </div>
      </section>
    </>
  );
};

export default ArticleTemplate;