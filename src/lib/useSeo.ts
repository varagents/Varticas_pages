import { useEffect } from "react";

/**
 * Lightweight, dependency-free document-head SEO hook.
 *
 * Mutates <title>, meta tags, canonical link, and (optionally)
 * injects per-route JSON-LD. Cleans up on unmount so SPA navigation
 * never leaves stale tags behind.
 */
export interface SeoOptions {
  title: string;
  description?: string;
  canonical?: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article" | "product";
  noindex?: boolean;
  keywords?: string;
  /** Optional schema.org JSON-LD payload (object or array). */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

const SITE_URL = "https://www.varticas.com";
const DEFAULT_IMAGE = `${SITE_URL}/varticas-og-final.png`;
const DEFAULT_IMAGE_ALT =
  "Varticas — AI workflow automation platform with autonomous AI coworkers";

const JSON_LD_ATTR = "data-seo-jsonld";

function upsertMeta(
  selector: string,
  attrs: Record<string, string>
): HTMLMetaElement | null {
  if (typeof document === "undefined") return null;
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    Object.entries(attrs).forEach(([k, v]) => el!.setAttribute(k, v));
    document.head.appendChild(el);
  } else {
    Object.entries(attrs).forEach(([k, v]) => el!.setAttribute(k, v));
  }
  return el;
}

function upsertLink(rel: string, href: string): HTMLLinkElement | null {
  if (typeof document === "undefined") return null;
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
  return el;
}

export function useSeo(options: SeoOptions): void {
  useEffect(() => {
    if (typeof document === "undefined") return;

    const {
      title,
      description,
      canonical,
      image = DEFAULT_IMAGE,
      imageAlt = DEFAULT_IMAGE_ALT,
      type = "website",
      noindex = false,
      keywords,
      jsonLd,
    } = options;

    const previousTitle = document.title;
    document.title = title;

    if (description) {
      upsertMeta('meta[name="description"]', {
        name: "description",
        content: description,
      });
      upsertMeta('meta[property="og:description"]', {
        property: "og:description",
        content: description,
      });
      upsertMeta('meta[name="twitter:description"]', {
        name: "twitter:description",
        content: description,
      });
    }

    if (keywords) {
      upsertMeta('meta[name="keywords"]', { name: "keywords", content: keywords });
    }

    upsertMeta('meta[property="og:title"]', {
      property: "og:title",
      content: title,
    });
    upsertMeta('meta[name="twitter:title"]', {
      name: "twitter:title",
      content: title,
    });
    upsertMeta('meta[property="og:type"]', { property: "og:type", content: type });

    if (image) {
      upsertMeta('meta[property="og:image"]', {
        property: "og:image",
        content: image,
      });
      upsertMeta('meta[name="twitter:image"]', {
        name: "twitter:image",
        content: image,
      });
      upsertMeta('meta[property="og:image:alt"]', {
        property: "og:image:alt",
        content: imageAlt,
      });
      upsertMeta('meta[name="twitter:image:alt"]', {
        name: "twitter:image:alt",
        content: imageAlt,
      });
    }

    upsertMeta('meta[name="robots"]', {
      name: "robots",
      content: noindex
        ? "noindex, nofollow"
        : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    });

    const canonicalUrl =
      canonical ||
      (typeof window !== "undefined"
        ? `${SITE_URL}${window.location.pathname}`
        : SITE_URL);
    upsertLink("canonical", canonicalUrl);
    upsertMeta('meta[property="og:url"]', {
      property: "og:url",
      content: canonicalUrl,
    });

    // JSON-LD (route-scoped — tagged for clean removal)
    const ldNodes: HTMLScriptElement[] = [];
    if (jsonLd) {
      const payloads = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
      payloads.forEach((payload) => {
        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.setAttribute(JSON_LD_ATTR, "true");
        script.textContent = JSON.stringify(payload);
        document.head.appendChild(script);
        ldNodes.push(script);
      });
    }

    return () => {
      document.title = previousTitle;
      ldNodes.forEach((node) => node.remove());
    };
  }, [options]);
}
