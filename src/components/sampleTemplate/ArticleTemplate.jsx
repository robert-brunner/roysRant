// ArticleTemplate.jsx
import Linkify from "linkify-react";
import { useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------ */
/* helpers: figure out what kind of link we're dealing with           */
/* ------------------------------------------------------------------ */

function getYouTubeId(url) {
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, "");
    if (host === "youtu.be") return u.pathname.slice(1) || null;
    if (host.endsWith("youtube.com")) {
      if (u.pathname === "/watch") return u.searchParams.get("v");
      if (u.pathname.startsWith("/embed/")) return u.pathname.split("/")[2];
      if (u.pathname.startsWith("/shorts/")) return u.pathname.split("/")[2];
    }
  } catch {
    /* not a valid URL */
  }
  return null;
}

function getVimeoId(url) {
  try {
    const u = new URL(url);
    if (u.hostname.replace(/^www\./, "").endsWith("vimeo.com")) {
      const id = u.pathname.split("/").filter(Boolean)[0];
      if (/^\d+$/.test(id)) return id;
    }
  } catch {
    /* ignore */
  }
  return null;
}

// cache metadata across hovers so we never refetch the same URL.
// values can be a resolved object OR an in-flight Promise (dedupes
// a prefetch and a hover that race for the same URL).
const metaCache = new Map();

// shared fetch: returns cached data, an in-flight promise, or starts one
function fetchMeta(href) {
  const cached = metaCache.get(href);
  if (cached) return Promise.resolve(cached);

  const promise = fetch(
    `https://api.microlink.io/?url=${encodeURIComponent(href)}`
  )
    .then((r) => r.json())
    .then((json) => {
      const d = json.data || {};
      const m = {
        title: d.title,
        description: d.description,
        image: d.image?.url,
        logo: d.logo?.url,
        publisher: d.publisher,
        url: d.url || href,
      };
      metaCache.set(href, m); // replace the promise with the result
      return m;
    })
    .catch((err) => {
      metaCache.delete(href); // allow a later retry on hover
      throw err;
    });

  metaCache.set(href, promise);
  return promise;
}

// pull every http(s) URL out of the article body
function extractUrls(text = "") {
  const matches = text.match(/https?:\/\/[^\s<>"')]+/g) || [];
  return [...new Set(matches)];
}

/* ------------------------------------------------------------------ */
/* the floating preview card                                          */
/* ------------------------------------------------------------------ */

const CARD_WIDTH = 400;
const OFFSET = 16;

function LinkPreview({ href, position, onEnter, onLeave }) {
  const ytId = getYouTubeId(href);
  const vimeoId = getVimeoId(href);
  const isVideo = Boolean(ytId || vimeoId);

  // a cached entry that's a plain object (not a Promise) is already resolved
  const cached = metaCache.get(href);
  const isResolved = cached && typeof cached.then !== "function";

  const [meta, setMeta] = useState(() => (isResolved ? cached : null));
  const [status, setStatus] = useState(() => (isResolved ? "done" : "idle"));

  useEffect(() => {
    if (isVideo) return; // videos don't need a metadata fetch

    let active = true;
    setStatus(isResolved ? "done" : "loading");

    // shares the cache/in-flight request with the prefetcher
    fetchMeta(href)
      .then((m) => {
        if (!active) return;
        setMeta(m);
        setStatus("done");
      })
      .catch(() => active && setStatus("error"));

    return () => {
      active = false;
    };
  }, [href, isVideo, isResolved]);

  const hostname = (() => {
    try {
      return new URL(href).hostname.replace(/^www\./, "");
    } catch {
      return href;
    }
  })();

  // anchor the card's bottom-left near the cursor so it grows up & right.
  // flip to the left of the cursor if there's no room on the right.
  const vw = typeof window !== "undefined" ? window.innerWidth : 1200;
  const vh = typeof window !== "undefined" ? window.innerHeight : 800;
  const left =
    position.x + OFFSET + CARD_WIDTH > vw
      ? Math.max(OFFSET, position.x - CARD_WIDTH - OFFSET)
      : position.x + OFFSET;
  const bottom = Math.min(vh - OFFSET, vh - position.y + OFFSET);

  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{ position: "fixed", left, bottom, width: CARD_WIDTH }}
      className="bg-white border border-gray-200 shadow-2xl rounded-xl overflow-hidden z-50 pointer-events-auto"
    >
      {/* ---------- VIDEO ---------- */}
      {ytId && (
        <div className="aspect-video w-full bg-black">
          <iframe
            title="YouTube preview"
            src={`https://www.youtube-nocookie.com/embed/${ytId}`}
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}

      {vimeoId && (
        <div className="aspect-video w-full bg-black">
          <iframe
            title="Vimeo preview"
            src={`https://player.vimeo.com/video/${vimeoId}`}
            className="w-full h-full"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}

      {/* ---------- WEBSITE ---------- */}
      {!isVideo && (
        <>
          {status === "loading" && (
            <div className="h-[200px] w-full bg-gray-100 animate-pulse" />
          )}

          {status === "done" && meta?.image && (
            <img
              src={meta.image}
              alt=""
              className="w-full h-[200px] object-cover bg-gray-100"
            />
          )}

          {(status === "done" || status === "error") && (
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                {meta?.logo && (
                  <img src={meta.logo} alt="" className="w-4 h-4 rounded-sm" />
                )}
                <span className="text-xs text-gray-500 truncate">
                  {meta?.publisher || hostname}
                </span>
              </div>

              <h2 className="text-sm font-bold leading-snug line-clamp-2">
                {meta?.title || hostname}
              </h2>

              {meta?.description && (
                <p className="text-xs text-gray-600 mt-1 line-clamp-3">
                  {meta.description}
                </p>
              )}
            </div>
          )}
        </>
      )}

      {/* ---------- URL footer (always shown) ---------- */}
      <div className="px-4 py-2 border-t border-gray-100 bg-gray-50">
        <p className="text-[11px] text-gray-500 break-all">{href}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* main component                                                     */
/* ------------------------------------------------------------------ */

const ArticleTemplate = ({ title, subtitle, body }) => {
  const [hoveredLink, setHoveredLink] = useState(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const closeTimer = useRef(null);

  const openPreview = (href, e) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setPos({ x: e.clientX, y: e.clientY });
    setHoveredLink(href);
  };

  // small delay on leave so the user can move the cursor onto the
  // card (e.g. to play the video) without it disappearing
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setHoveredLink(null), 200);
  };

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  // warm the metadata cache for every website link as soon as the
  // article loads, so hovering feels instant. videos are skipped
  // (they need no fetch). throttled so we don't fire 50 requests at once.
  useEffect(() => {
    const urls = extractUrls(body).filter(
      (u) => !getYouTubeId(u) && !getVimeoId(u)
    );

    let cancelled = false;
    let i = 0;
    const pump = () => {
      if (cancelled) return;
      const batch = urls.slice(i, i + 4); // 4 at a time
      i += 4;
      batch.forEach((u) => fetchMeta(u).catch(() => {}));
      if (i < urls.length) setTimeout(pump, 300);
    };
    pump();

    return () => {
      cancelled = true;
    };
  }, [body]);

  const linkifyOptions = {
    target: "_blank",
    rel: "noopener noreferrer",
    // render each link as a real React element so we can attach handlers
    render: ({ attributes, content }) => {
      const { href, ...rest } = attributes;
      return (
        <a
          {...rest}
          href={href}
          className="text-blue-600 hover:underline"
          onMouseEnter={(e) => openPreview(href, e)}
          onMouseMove={(e) => setPos({ x: e.clientX, y: e.clientY })}
          onMouseLeave={scheduleClose}
        >
          {content}
        </a>
      );
    },
  };

  return (
    <>
      {hoveredLink && (
        <LinkPreview
          key={hoveredLink}
          href={hoveredLink}
          position={pos}
          onEnter={cancelClose}
          onLeave={scheduleClose}
        />
      )}

      <section className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-5xl font-bold mb-10 text-center">{title}</h1>
        {subtitle && (
          <p className="text-xl font-bold italic text-gray-500 text-center mb-10">
            {subtitle}
          </p>
        )}

        <div className="article-content">
          <Linkify options={linkifyOptions}>
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
