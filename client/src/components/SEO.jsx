import { useEffect } from "react";

function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export default function SEO({ title, description, image, path, type = "website" }) {
  useEffect(() => {
    const siteName = "Koru";
    const fullTitle = title ? `${title} — ${siteName}` : siteName;
    const url = `https://koru.dev${path || "/"}`;
    const ogImage = image || "/og-default.svg";

    document.title = fullTitle;

    setMeta("name", "description", description || "Koru — websites that make businesses look better, work smarter, and grow.");
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description || "Modern, fast, conversion-focused websites for businesses, creators and startups.");
    setMeta("property", "og:type", type);
    setMeta("property", "og:url", url);
    setMeta("property", "og:image", ogImage);
    setMeta("property", "og:site_name", siteName);
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", description || "");
    setMeta("name", "twitter:image", ogImage);

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", url);

    return () => {
      // Keep last description fallback intact on unmount; nothing to clean.
    };
  }, [title, description, image, path, type]);

  return null;
}