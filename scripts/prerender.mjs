// Writes a static HTML file for every live sumptuousindia.com URL, so search engines get the same
// titles, meta tags, canonical links, structured data and page text without running JavaScript.
// Runs after `vite build` (client, into dist/) and `vite build --ssr` (into dist-ssr/).
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const { render, headTags, seoPaths } = await import(pathToFileURL(path.join(root, "dist-ssr/entry-server.js")).href);

const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");
const page = (url, head, body) =>
  template.replace(/<title>.*?<\/title>/s, head).replace('<div id="root"></div>', `<div id="root">${body}</div>`);

// "/" -> index.html, "/about" -> about.html (served as /about with cleanUrls), "/post/x" -> post/x.html
const fileFor = (url) => (url === "/" ? "index.html" : `${url.slice(1)}.html`);

for (const url of seoPaths) {
  const html = page(url, headTags(url), await render(url));
  const file = path.join(dist, fileFor(url));
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
}
fs.writeFileSync(path.join(dist, "404.html"), page("/404", headTags("/404"), await render("/404")));

// Same URL set as the live Wix sitemaps (blog posts, projects and pages).
const site = "https://www.sumptuousindia.com";
const sitemapUrls = seoPaths.filter((u) => u !== "/blog/page/2");
fs.writeFileSync(
  path.join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapUrls
    .map((u) => `<url><loc>${site}${u === "/" ? "" : u}</loc></url>`)
    .join("\n")}\n</urlset>\n`,
);

fs.rmSync(path.join(root, "dist-ssr"), { recursive: true, force: true });
console.log(`prerendered ${seoPaths.length} pages + 404, sitemap with ${sitemapUrls.length} URLs`);
