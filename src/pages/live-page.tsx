import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowUpRight, BadgeCheck, Mail, Phone } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { ParallaxImage } from "@/components/ui/parallax-image";
import { ArrowButton } from "@/components/ui/arrow-button";
import { Container, Crumbs, SectionLabel } from "@/components/site/primitives";
import { CtaBlock, FaqBlock } from "@/components/site/blocks";
import { Article, type Item } from "@/components/site/article";
import { cortizoPages, img, landingPages, site } from "@/data/site";
import live from "@/data/live-pages.json";

const pages = live as unknown as Record<string, Item[]>;

/** The page's first line is its title, set in the tag the live page uses (H1, or H2 on Privacy Policy). */
function Title({ item, className }: { item: Item; className?: string }) {
  if (item.tag === "card") return null;
  const T = item.tag === "li" ? "p" : item.tag;
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
      <T className={className}>{item.text}</T>
    </motion.div>
  );
}

/**
 * Cortizo sub-pages (windows, doors, sliding, minimal) and the city pages (Bangalore, Chennai, Hyderabad):
 * the live article with a hero image and a contact card.
 */
export function ArticlePage({ slug }: { slug: string }) {
  const cortizo = cortizoPages.find((c) => c.slug === slug);
  const meta = cortizo ?? landingPages.find((c) => c.slug === slug)!;
  const [title, ...body] = pages[slug];
  const others = (cortizo ? cortizoPages : landingPages).filter((c) => c.slug !== slug);
  const name = (c: { title: string }) => c.title.split(" | ")[0];

  return (
    <>
      <section className="pb-10 pt-32 md:pt-40">
        <Container>
          <Crumbs items={cortizo ? [["Home", "/"], ["Cortizo", "/cortizo-in-india"], [name(meta)]] : [["Home", "/"], [name(meta)]]} />
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="label-mono mt-8 inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1.5 text-accent">
            <BadgeCheck className="size-3.5" /> Certified Cortizo Fabricator
          </motion.p>
          <Title item={title} className="font-display-tight mt-6 max-w-5xl text-3xl md:text-5xl" />
        </Container>
      </section>

      <motion.div initial={{ clipPath: "inset(12% 8% 0% 8% round 2rem)" }} animate={{ clipPath: "inset(0% 0% 0% 0% round 2rem)" }} transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }} className="mx-auto max-w-[1320px] px-4 md:px-8">
        <ParallaxImage src={img(meta.img)} alt={name(meta)} className="h-[52svh] rounded-[2rem]" strength={6} priority />
      </motion.div>

      <section className="py-16 md:py-24">
        <Container className="grid gap-12 lg:grid-cols-12">
          <article className="lg:col-span-8"><Article items={body} /></article>
          <aside className="lg:col-span-4">
            <div className="space-y-2 lg:sticky lg:top-28">
              <div className="rounded-[var(--radius)] border bg-card p-6">
                <SectionLabel>Contact Us</SectionLabel>
                <p className="mt-4 text-base leading-relaxed">Ready to bring your vision to life? Tell us about your project, and we’ll reach out to discuss how we can build something exceptional together.</p>
                <div className="mt-6 grid gap-2">
                  <ArrowButton to="/contact" className="w-full justify-center">Contact Us</ArrowButton>
                  <a href={`tel:${site.phoneRaw}`} className="inline-flex h-12 items-center justify-center gap-2 rounded-full border text-sm font-medium transition-colors hover:bg-muted"><Phone className="size-4" /> {site.phone}</a>
                  <a href={`mailto:${site.email}`} className="inline-flex h-12 items-center justify-center gap-2 rounded-full border text-sm font-medium transition-colors hover:bg-muted"><Mail className="size-4" /> {site.email}</a>
                </div>
              </div>
              {cortizo ? (
                <ul className="rounded-[var(--radius)] border p-2">
                  {others.map((c) => (
                    <li key={c.slug}>
                      <Link to={`/${c.slug}`} className="group flex items-center justify-between gap-4 rounded-2xl p-3 text-sm font-medium transition-colors hover:bg-muted">
                        {name(c)} <ArrowUpRight className="size-4 shrink-0 transition-transform group-hover:rotate-45" />
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </aside>
        </Container>
      </section>

      <FaqBlock slug={slug} className="border-t" />
      <CtaBlock />
    </>
  );
}

/** Privacy Policy, Terms & Conditions and FAQ: a plain reading column. */
export function LegalPage({ slug }: { slug: string }) {
  const [title, ...body] = pages[slug];
  return (
    <>
      <section className="pb-8 pt-32 md:pt-40">
        <Container>
          <Crumbs items={[["Home", "/"], ["text" in title ? title.text : ""]]} />
          <div className="mt-8 border-b pb-8">
            <Title item={title} className="font-display-tight text-4xl md:text-6xl" />
          </div>
        </Container>
      </section>
      <section className="pb-16 md:pb-24">
        <Container>
          <FadeIn><Article items={body} className="max-w-3xl" /></FadeIn>
        </Container>
      </section>
      <CtaBlock />
    </>
  );
}
