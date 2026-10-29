// Build-time renderer: scripts/prerender.mjs calls render() once per URL to write static HTML.
import { PassThrough } from "node:stream";
import { StrictMode } from "react";
import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "./App";
import { headTags, seoPaths } from "./lib/seo";

export { headTags, seoPaths };

/** Renders one URL to HTML, waiting for every lazy page so the full content is in the markup. */
export function render(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    let html = "";
    const sink = new PassThrough();
    sink.on("data", (c) => (html += c));
    sink.on("end", () => resolve(html));
    const stream = renderToPipeableStream(
      <StrictMode>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </StrictMode>,
      { onAllReady: () => stream.pipe(sink), onShellError: reject, onError: reject },
    );
  });
}
