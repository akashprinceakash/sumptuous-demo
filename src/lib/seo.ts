// Per-URL head tags copied from the live sumptuousindia.com pages (title, description, canonical,
// Open Graph, Twitter, Search Console verification and JSON-LD), so search engines see the same signals.
import seo from "@/data/seo.json";

type Entry = { title?: string; canonical?: string; prev?: string; meta?: Record<string, string>; ld?: unknown[] };
const pages = seo as Record<string, Entry>;

export const seoPaths = Object.keys(pages);

export function seoFor(path: string): Entry | undefined {
  return pages[path] ?? pages[path.replace(/\/$/, "")];
}

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Head markup for one URL, written into each pre-rendered page. Tags carry data-seo so the client can swap them. */
export function headTags(path: string): string {
  const e = seoFor(path);
  if (!e) return `<title>Page not found | Sumptuous Building Systems</title><meta data-seo name="robots" content="noindex">`;
  const out: string[] = [];
  if (e.title) out.push(`<title>${esc(e.title)}</title>`);
  for (const [k, v] of Object.entries(e.meta ?? {})) {
    const attr = k.startsWith("og:") || k.startsWith("article:") ? "property" : "name";
    out.push(`<meta data-seo ${attr}="${esc(k)}" content="${esc(v)}">`);
  }
  if (e.canonical) out.push(`<link data-seo rel="canonical" href="${esc(e.canonical)}">`);
  if (e.prev) out.push(`<link data-seo rel="prev" href="${esc(e.prev)}">`);
  for (const ld of e.ld ?? []) out.push(`<script data-seo type="application/ld+json">${JSON.stringify(ld).replace(/</g, "\\u003c")}</script>`);
  return out.join("\n    ");
}

/** On client-side navigation, replaces the previous page's tags with this URL's. */
export function applySeo(path: string) {
  const e = seoFor(path);
  const head = document.head;
  head.querySelectorAll("[data-seo]").forEach((n) => n.remove());
  document.title = e?.title ?? "Page not found | Sumptuous Building Systems";
  const tpl = document.createElement("template");
  tpl.innerHTML = headTags(path).replace(/<title>.*?<\/title>/, "");
  head.append(tpl.content);
}
