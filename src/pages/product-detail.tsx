import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, Check, Download, Phone } from "lucide-react";
import { TextReveal } from "@/components/ui/text-reveal";
import { FadeIn } from "@/components/ui/fade-in";
import { ParallaxImage } from "@/components/ui/parallax-image";
import { ArrowButton } from "@/components/ui/arrow-button";
import { Container, Crumbs, SectionLabel } from "@/components/site/primitives";
import { CtaBlock } from "@/components/site/blocks";
import { img, products, site, type Product } from "@/data/site";

export default function ProductDetail({ product: p }: { product: Product }) {
  const i = products.indexOf(p);
  const prev = products[(i - 1 + products.length) % products.length];
  const next = products[(i + 1) % products.length];
  const Icon = p.icon;
  const [titleMain, titleSub] = p.title.split(": ");

  return (
    <>
      <section className="pb-10 pt-32 md:pt-40">
        <Container>
          <Crumbs items={[["Home", "/"], ["Products", "/products"], [p.short]]} />
          <div className="mt-8 grid gap-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap gap-2">
                <span className="label-mono inline-flex items-center gap-2 rounded-full bg-graphite px-3 py-1.5 text-background"><Icon className="size-3.5" />{String(i + 1).padStart(2, "0")} / {products.length}</span>
                <span className="label-mono rounded-full border px-3 py-1.5">{p.partner}</span>
                <span className="label-mono rounded-full border px-3 py-1.5">{p.origin}</span>
              </motion.div>
              <TextReveal as="h1" text={titleMain} className="mt-6 text-4xl md:text-6xl" />
              {titleSub ? <FadeIn delay={0.3}><p className="font-display mt-2 text-3xl italic text-accent md:text-5xl">{titleSub}</p></FadeIn> : null}
            </div>
            <FadeIn delay={0.4} className="text-lg text-muted-foreground md:col-span-4">{p.lede}</FadeIn>
          </div>
        </Container>
      </section>

      <motion.div initial={{ clipPath: "inset(12% 8% 0% 8% round 2rem)" }} animate={{ clipPath: "inset(0% 0% 0% 0% round 2rem)" }} transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }} className="mx-auto max-w-[1320px] px-4 md:px-8">
        <ParallaxImage src={img(p.hero)} alt={p.title} className="h-[62svh] rounded-[2rem]" strength={6} priority />
      </motion.div>

      <section className="py-20 md:py-32">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="space-y-20 lg:col-span-8">
            <div>
              <SectionLabel n="01">Overview</SectionLabel>
              <FadeIn className="mt-6 text-2xl leading-snug md:text-3xl">{p.body}</FadeIn>
            </div>

            <div>
              <SectionLabel n="02">Capabilities</SectionLabel>
              <div className="mt-8 grid gap-2 sm:grid-cols-2">
                {p.features.map((f, k) => (
                  <FadeIn key={f} delay={(k % 2) * 0.06}>
                    <div className="flex h-full items-start gap-4 rounded-2xl border bg-card p-5">
                      <span className="grid size-8 shrink-0 place-items-center rounded-full bg-accent-soft text-accent"><Check className="size-4" /></span>
                      <span className="pt-1">{f}</span>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>

            <div>
              <SectionLabel n="03">In detail</SectionLabel>
              <div className="mt-8 grid gap-2 sm:grid-cols-5">
                <ParallaxImage src={img(p.img2)} alt="" className="aspect-[4/5] rounded-[var(--radius)] sm:col-span-3" />
                <div className="flex flex-col gap-2 sm:col-span-2">
                  <ParallaxImage src={img(p.img)} alt="" className="aspect-square rounded-[var(--radius)]" strength={6} />
                  <div className="flex flex-1 flex-col justify-between rounded-[var(--radius)] bg-accent p-6 text-background">
                    <Icon className="size-7" strokeWidth={1.2} />
                    <p className="font-display mt-8 text-2xl italic leading-tight">Samples available in our Bengaluru studio.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* sticky spec sheet */}
          <aside className="lg:col-span-4">
            <div className="rounded-[var(--radius)] border bg-card p-6 lg:sticky lg:top-28">
              <p className="label-mono flex items-center justify-between text-muted-foreground"><span>Spec sheet</span><span>SBS-{String(i + 1).padStart(3, "0")}</span></p>
              <dl className="mt-6 divide-y border-y">
                {p.specs.map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 py-3.5">
                    <dt className="label-mono text-muted-foreground">{k}</dt>
                    <dd className="text-right text-sm font-medium">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-6 grid gap-2">
                <ArrowButton to="/contact" className="w-full justify-center">Request a quote</ArrowButton>
                <a href={`tel:${site.phoneRaw}`} className="inline-flex h-12 items-center justify-center gap-2 rounded-full border text-sm font-medium transition-colors hover:bg-muted"><Phone className="size-4" /> {site.phone}</a>
                <Link to="/contact" className="label-mono mt-2 inline-flex items-center justify-center gap-2 text-muted-foreground hover:text-accent"><Download className="size-3.5" /> Ask for the technical brochure</Link>
              </div>
            </div>
          </aside>
        </Container>
      </section>

      <nav aria-label="More products" className="border-t">
        <Container className="grid gap-2 py-8 md:grid-cols-2">
          {[{ q: prev, label: "Previous", I: ArrowLeft }, { q: next, label: "Next", I: ArrowRight }].map(({ q, label, I }) => (
            <Link key={label} to={`/${q.slug}`} className="group relative flex min-h-40 items-end overflow-hidden rounded-[var(--radius)] bg-graphite p-6 text-background">
              <img src={img(q.hero)} alt="" loading="lazy" decoding="async" className="absolute inset-0 size-full object-cover opacity-40 transition-all duration-700 group-hover:scale-105 group-hover:opacity-60" />
              <div className="relative flex w-full items-end justify-between">
                <div>
                  <p className="label-mono text-accent-bright">{label}</p>
                  <p className="font-display-tight mt-2 text-3xl md:text-4xl">{q.short}</p>
                </div>
                <I className="size-6 transition-transform duration-500 group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </Container>
      </nav>

      <CtaBlock />
    </>
  );
}
