import * as React from "react";
import { cn } from "@/lib/utils";

type Heading = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
type Line = { tag: Heading | "p" | "li"; text: string };
type Card = { tag: "card"; n: string; titleTag: Heading; title: string; text: string };
export type Item = Line | Card;

// Every line keeps the HTML tag it has on the live page, so the heading outline search engines
// index stays the same; only the styling is new.
const headingStyle: Record<Heading, string> = {
  h1: "mb-4 mt-14 text-2xl font-semibold tracking-tight md:text-3xl",
  h2: "mb-3 mt-12 text-xl font-semibold tracking-tight md:text-2xl",
  h3: "mb-3 mt-10 text-lg font-semibold tracking-tight md:text-xl",
  h4: "mb-2 mt-8 text-base font-semibold",
  h5: "mb-2 mt-8 text-base font-semibold",
  h6: "mb-2 mt-8 text-base font-semibold",
};
const isHeading = (it: Item): it is Line & { tag: Heading } => /^h[1-6]$/.test(it.tag);
// Short lines without a full stop are list entries set as separate paragraphs ("Modern villas").
const isShortLine = (it?: Item) => !!it && it.tag === "p" && it.text.length < 80 && !/[.?!:]$/.test(it.text);

export function Article({ items, className }: { items: Item[]; className?: string }) {
  const out: React.ReactNode[] = [];
  for (let i = 0; i < items.length; i++) {
    const it = items[i];
    if (it.tag === "card") {
      const group: Card[] = [];
      while (i < items.length && items[i].tag === "card") group.push(items[i++] as Card);
      i--;
      out.push(
        <div key={i} className="my-6 grid gap-2 sm:grid-cols-2">
          {group.map((g) => {
            const T = g.titleTag;
            return (
              <div key={g.n} className="rounded-2xl border bg-card p-5">
                <span className="label-mono text-accent">{g.n.padStart(2, "0")}</span>
                <T className="mt-2 text-lg font-semibold tracking-tight">{g.title}</T>
                {g.text ? <p className="mt-2 text-[0.95rem] leading-relaxed text-muted-foreground">{g.text}</p> : null}
              </div>
            );
          })}
        </div>,
      );
    } else if (it.tag === "li" || (isShortLine(it) && isShortLine(items[i + 1]) && isShortLine(items[i + 2]))) {
      const group: Line[] = [];
      const kind = it.tag;
      while (i < items.length && (kind === "li" ? items[i].tag === "li" : isShortLine(items[i]))) group.push(items[i++] as Line);
      i--;
      const cell = "rounded-2xl border bg-card p-4 text-[0.95rem] font-medium leading-relaxed";
      out.push(
        kind === "li" ? (
          <ul key={i} className="my-6 grid gap-2 sm:grid-cols-2">{group.map((g) => <li key={g.text} className={cell}>{g.text}</li>)}</ul>
        ) : (
          <div key={i} className="my-6 grid gap-2 sm:grid-cols-2">{group.map((g) => <p key={g.text} className={cell}>{g.text}</p>)}</div>
        ),
      );
    } else if (isHeading(it)) {
      const T = it.tag;
      // numbered markers ("1.") and sentence-long headings are styled as a label and a lead paragraph
      const style = /^\d+\.?$/.test(it.text)
        ? "label-mono mt-10 text-accent"
        : it.text.length > 110
          ? "mb-4 mt-8 text-lg font-normal leading-relaxed text-foreground/80"
          : headingStyle[T];
      out.push(<T key={i} className={cn(style, "first:mt-0")}>{it.text}</T>);
    } else {
      const lead = it.text.length < 60 && !/[.?!:]$/.test(it.text);
      out.push(<p key={i} className={lead ? "mb-2 mt-8 font-semibold text-foreground" : "mb-4 text-base leading-relaxed text-muted-foreground"}>{it.text}</p>);
    }
  }
  return <div className={className}>{out}</div>;
}

/** Splits a live page into its leading H1s (the page title block) and the rest of the article. */
export function splitTitle(items: Item[]) {
  let n = 0;
  while (n < items.length && items[n].tag === "h1") n++;
  return { titles: items.slice(0, n) as Line[], body: items.slice(n) };
}
