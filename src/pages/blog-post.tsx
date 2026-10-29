import * as React from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useSpring } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { TextReveal } from "@/components/ui/text-reveal";
import { FadeIn } from "@/components/ui/fade-in";
import { ParallaxImage } from "@/components/ui/parallax-image";
import { ArrowButton } from "@/components/ui/arrow-button";
import { Accordion, type AccordionItem } from "@/components/ui/accordion";
import { Container, Crumbs, SectionLabel } from "@/components/site/primitives";
import { PostCard } from "@/components/site/blocks";
import { img, posts, type Post } from "@/data/site";
import bodies from "@/data/live-posts.json";

type Item = { tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "li"; text: string };
type Body = { body: Item[]; faq: AccordionItem[] };

const anchor = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
// Short lines without a full stop are list entries in the live articles ("Standard frame designs").
const isListLine = (it: Item) => it.tag === "li" || (it.tag === "p" && it.text.length < 90 && !/[.?!:]$/.test(it.text));
const isHeading = (it: Item) => /^h[1-6]$/.test(it.tag);
// headings keep their live level; the article title above is the page H1
const headingStyle: Record<string, string> = {
  h1: "mb-4 mt-12 text-2xl font-semibold tracking-tight md:text-3xl",
  h2: "mb-4 mt-12 text-2xl font-semibold tracking-tight",
  h3: "mb-3 mt-10 text-xl font-semibold tracking-tight",
  h4: "mb-3 mt-8 text-lg font-semibold",
};

/** The live article: headings, paragraphs and grouped list lines, wording untouched. */
function ArticleBody({ items }: { items: Item[] }) {
  const out: React.ReactNode[] = [];
  for (let i = 0; i < items.length; i++) {
    const it = items[i];
    if (isListLine(it)) {
      // live list items stay <li>; short paragraph lines stay <p>, set as a list
      const group: Item[] = [];
      while (i < items.length && isListLine(items[i]) && items[i].tag === it.tag) group.push(items[i++]);
      i--;
      const cls = "my-5 space-y-2 border-l-2 border-accent/40 pl-5";
      out.push(
        it.tag === "li"
          ? <ul key={i} className={cls}>{group.map((g) => <li key={g.text} className="text-foreground/85">{g.text}</li>)}</ul>
          : <div key={i} className={cls}>{group.map((g) => <p key={g.text} className="text-foreground/85">{g.text}</p>)}</div>,
      );
    } else if (isHeading(it)) {
      const T = it.tag as "h2";
      out.push(<T key={i} id={anchor(it.text)} className={`${headingStyle[it.tag] ?? headingStyle.h4} scroll-mt-28 first:mt-0`}>{it.text}</T>);
    } else {
      out.push(<p key={i} className="mb-5 text-foreground/80">{it.text}</p>);
    }
  }
  return <>{out}</>;
}

export default function BlogPost({ post }: { post: Post }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });
  const data = (bodies as Record<string, Body>)[post.slug];
  // the live "FAQs" heading (H1 or H2, depending on the post) moves down to sit above the accordion
  const faqAt = data.body.findIndex((it, i, all) => isHeading(it) && /^faqs?$/i.test(it.text) && i >= all.length - 2);
  const faqTag = (faqAt >= 0 ? data.body[faqAt].tag : "p") as "h1" | "h2" | "p";
  const items = data.body.filter((_, i) => i !== faqAt);
  const toc = items.filter((it) => it.tag === "h2").slice(0, 8);
  const related = posts.filter((p) => p !== post).slice(0, 3);

  return (
    <>
      <motion.div style={{ scaleX }} className="fixed inset-x-0 top-0 z-[55] h-1 origin-left bg-accent" aria-hidden />
      <article>
        <header className="pb-12 pt-32 md:pt-40">
          <Container className="max-w-4xl">
            <Crumbs items={[["Home", "/"], ["Blogs", "/blog"], [post.title]]} />
            <p className="label-mono mt-10 text-muted-foreground">{post.date} · {post.read}</p>
            <TextReveal as="h1" text={post.title} className="mt-5 text-3xl md:text-5xl" />
          </Container>
        </header>
        <div className="mx-auto max-w-[1320px] px-4 md:px-8"><ParallaxImage src={img(post.img)} alt="" className="h-[52svh] rounded-[2rem]" priority /></div>

        <Container className="grid gap-12 py-16 md:py-24 lg:grid-cols-12">
          <aside className="lg:col-span-3">
            <div className="lg:sticky lg:top-28">
              <SectionLabel>Contents</SectionLabel>
              <ol className="mt-5 space-y-3 text-sm">
                {toc.map((h, i) => (
                  <li key={h.text}><a href={`#${anchor(h.text)}`} className="flex gap-3 text-muted-foreground hover:text-accent"><span className="label-mono pt-0.5">{String(i + 1).padStart(2, "0")}</span>{h.text}</a></li>
                ))}
              </ol>
              <Link to="/blog" className="label-mono mt-10 inline-flex items-center gap-2 text-muted-foreground hover:text-accent"><ArrowLeft className="size-3.5" /> All Posts</Link>
            </div>
          </aside>
          <div className="text-[1.05rem] leading-[1.8] lg:col-span-7">
            <ArticleBody items={items} />
            {data.faq.length ? (
              <FadeIn className="mt-14">
                {React.createElement(faqTag, { className: "mb-4 text-2xl font-semibold tracking-tight" }, faqAt >= 0 ? data.body[faqAt].text : "FAQs")}
                <Accordion items={data.faq} />
              </FadeIn>
            ) : null}
            <div className="mt-14 flex flex-wrap items-center justify-between gap-6 rounded-[var(--radius)] bg-accent-soft p-8">
              <p className="max-w-sm text-lg font-medium leading-snug">Ready to bring your vision to life?</p>
              <ArrowButton to="/contact">Contact Us</ArrowButton>
            </div>
          </div>
        </Container>
      </article>

      <section className="border-t py-20 md:py-28">
        <Container>
          <SectionLabel as="h2">Recent Posts</SectionLabel>
          <div className="mt-10 grid gap-8 md:grid-cols-3">{related.map((p) => <PostCard key={p.slug} p={p} />)}</div>
        </Container>
      </section>
    </>
  );
}
