import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, Mail, Phone } from "lucide-react";
import { TextReveal } from "@/components/ui/text-reveal";
import { FadeIn } from "@/components/ui/fade-in";
import { ParallaxImage } from "@/components/ui/parallax-image";
import { ArrowButton } from "@/components/ui/arrow-button";
import { Container, Crumbs, SectionLabel } from "@/components/site/primitives";
import { CtaBlock, FaqBlock } from "@/components/site/blocks";
import { img, products, site, type Product } from "@/data/site";
import { Article, splitTitle, type Item } from "@/components/site/article";
import live from "@/data/live-pages.json";

export default function ProductDetail({ product: p }: { product: Product }) {
  const i = products.indexOf(p);
  const prev = products[(i - 1 + products.length) % products.length];
  const next = products[(i + 1) % products.length];
  const { titles, body: rest } = splitTitle((live as unknown as Record<string, Item[]>)[p.slug]);
  // two leading H1s on the live page = the menu label, then the page title
  const label = titles.length > 1 ? titles[0].text : null;
  const title = titles[titles.length - 1].text;
  // the long H2 sentence near the top is the page's intro
  const ii = rest.findIndex((x, k) => k < 3 && x.tag === "h2" && x.text.length > 100);
  const intro = ii >= 0 ? (rest[ii] as { text: string }).text : null;
  const body = rest.filter((_, k) => k !== ii);
  const Icon = p.icon;

  return (
    <>
      <section className="pb-10 pt-32 md:pt-40">
        <Container>
          <Crumbs items={[["Home", "/"], ["Products", "/products"], [p.name]]} />
          <div className="mt-8 grid gap-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap gap-2">
                {label ? (
                  <h1 className="label-mono inline-flex items-center gap-2 rounded-full bg-graphite px-3 py-1.5 text-background"><Icon className="size-3.5" />{label}</h1>
                ) : (
                  <span className="label-mono inline-flex items-center gap-2 rounded-full bg-graphite px-3 py-1.5 text-background"><Icon className="size-3.5" />{p.name}</span>
                )}
                <span className="label-mono rounded-full border px-3 py-1.5">{p.partner}</span>
              </motion.div>
              <TextReveal as="h1" text={title} className="mt-6 text-3xl md:text-5xl" />
            </div>
            {intro ? <FadeIn delay={0.3} className="md:col-span-4"><h2 className="text-base font-normal leading-relaxed text-muted-foreground">{intro}</h2></FadeIn> : null}
          </div>
        </Container>
      </section>

      <motion.div initial={{ clipPath: "inset(12% 8% 0% 8% round 2rem)" }} animate={{ clipPath: "inset(0% 0% 0% 0% round 2rem)" }} transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }} className="mx-auto max-w-[1320px] px-4 md:px-8">
        <ParallaxImage src={img(p.hero)} alt={p.name} className="h-[58svh] rounded-[2rem]" strength={6} priority />
      </motion.div>

      <section className="py-16 md:py-24">
        <Container className="grid gap-12 lg:grid-cols-12">
          <article className="lg:col-span-8">
            <Article items={body} />
            <div className="mt-12 grid gap-2 sm:grid-cols-2">
              <ParallaxImage src={img(p.img)} alt="" className="aspect-[4/3] rounded-[var(--radius)]" strength={5} />
              <ParallaxImage src={img(p.img2)} alt="" className="aspect-[4/3] rounded-[var(--radius)]" strength={5} />
            </div>
          </article>

          <aside className="lg:col-span-4">
            <div className="rounded-[var(--radius)] border bg-card p-6 lg:sticky lg:top-28">
              <SectionLabel>Contact Us</SectionLabel>
              <p className="mt-4 text-base leading-relaxed">Ready to bring your vision to life? Tell us about your project, and we’ll reach out to discuss how we can build something exceptional together.</p>
              <dl className="mt-6 divide-y border-y text-sm">
                <div className="flex justify-between gap-4 py-3"><dt className="label-mono text-muted-foreground">Product</dt><dd className="text-right font-medium">{p.name}</dd></div>
                <div className="flex justify-between gap-4 py-3"><dt className="label-mono text-muted-foreground">Partner</dt><dd className="text-right font-medium">{p.partner}</dd></div>
              </dl>
              <div className="mt-6 grid gap-2">
                <ArrowButton to="/contact" className="w-full justify-center">Contact Us</ArrowButton>
                <a href={`tel:${site.phoneRaw}`} className="inline-flex h-12 items-center justify-center gap-2 rounded-full border text-sm font-medium transition-colors hover:bg-muted"><Phone className="size-4" /> {site.phone}</a>
                <a href={`mailto:${site.email}`} className="inline-flex h-12 items-center justify-center gap-2 rounded-full border text-sm font-medium transition-colors hover:bg-muted"><Mail className="size-4" /> {site.email}</a>
              </div>
            </div>
          </aside>
        </Container>
      </section>

      <FaqBlock slug={p.slug} className="border-t" />

      <nav aria-label="More products" className="border-t">
        <Container className="grid gap-2 py-8 md:grid-cols-2">
          {[{ q: prev, label: "Previous", I: ArrowLeft }, { q: next, label: "Next", I: ArrowRight }].map(({ q, label, I }) => (
            <Link key={label} to={`/${q.slug}`} className="group relative flex min-h-40 items-end overflow-hidden rounded-[var(--radius)] bg-graphite p-6 text-background">
              <img src={img(q.hero)} alt="" loading="lazy" decoding="async" className="absolute inset-0 size-full object-cover opacity-40 transition-all duration-700 group-hover:scale-105 group-hover:opacity-60" />
              <div className="relative flex w-full items-end justify-between gap-4">
                <div>
                  <p className="label-mono text-accent-bright">{label}</p>
                  <p className="mt-2 text-xl font-medium tracking-tight md:text-2xl">{q.name}</p>
                </div>
                <I className="size-6 shrink-0 transition-transform duration-500 group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </Container>
      </nav>

      <CtaBlock />
    </>
  );
}
