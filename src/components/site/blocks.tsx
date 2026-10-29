// Section-level building blocks shared across pages.
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { cities, site, type Post, type Product } from "@/data/site";
import { ArrowButton } from "@/components/ui/arrow-button";
import { FadeIn } from "@/components/ui/fade-in";
import { Accordion, type AccordionItem } from "@/components/ui/accordion";
import faqs from "@/data/live-faqs.json";
import { TextReveal } from "@/components/ui/text-reveal";
import { cn } from "@/lib/utils";
import { Container, SectionLabel } from "./primitives";

export function SectionHead({ n, label, title, accent, aside, className, labelAs, titleAs = "h2" }: {
  n?: string; label: string; title: string; accent?: string[]; aside?: React.ReactNode; className?: string;
  labelAs?: "p" | "h2" | "h3"; titleAs?: "h2" | "h3" | "p";
}) {
  return (
    <div className={cn("mb-10 grid gap-8 md:mb-14 md:grid-cols-12 md:items-end", className)}>
      <div className="md:col-span-8">
        <SectionLabel n={n} as={labelAs}>{label}</SectionLabel>
        <TextReveal as={titleAs} text={title} accent={accent} className="mt-4 text-3xl md:text-5xl" />
      </div>
      {aside ? <FadeIn className="text-muted-foreground md:col-span-4 md:justify-self-end md:text-right">{aside}</FadeIn> : null}
    </div>
  );
}

/** Product tile with image, icon chip and partner line. Used in grids and bentos. */
export function ProductTile({ p, index, className, tall }: { p: Product; index: number; className?: string; tall?: boolean }) {
  const Icon = p.icon;
  return (
    <Link to={`/${p.slug}`} className={cn("group relative flex flex-col overflow-hidden rounded-[var(--radius)] bg-graphite text-background", className)}>
      <div className={cn("relative overflow-hidden", tall ? "flex-1 min-h-72" : "aspect-[4/3]")}>
        <img src={`/images/${p.img}.webp`} alt={p.name} loading="lazy" className="absolute inset-0 size-full object-cover transition-transform duration-[1.4s] ease-out-expo group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/10 to-transparent" />
        <span className="label-mono absolute left-4 top-4 rounded-full bg-background/90 px-2.5 py-1 text-foreground">{String(index + 1).padStart(2, "0")}</span>
        <span className="absolute right-4 top-4 grid size-10 place-items-center rounded-full bg-background/15 backdrop-blur-md transition-all duration-500 group-hover:rotate-45 group-hover:bg-accent-bright group-hover:text-graphite">
          <ArrowUpRight className="size-4" />
        </span>
      </div>
      <div className="relative -mt-16 flex items-end justify-between gap-4 p-5">
        <div>
          <p className="label-mono text-accent-bright">{p.partner}</p>
          <p className="font-display-tight mt-2 text-xl md:text-2xl">{p.name}</p>
        </div>
        <Icon className="size-5 shrink-0 text-background/60" strokeWidth={1.4} />
      </div>
    </Link>
  );
}

export function PostCard({ p, className, as: T = "h3" }: { p: Post; className?: string; as?: "h2" | "h3" }) {
  return (
    <Link to={`/post/${p.slug}`} className={cn("group flex flex-col gap-4", className)}>
      <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius)] bg-muted">
        <img src={`/images/${p.img}.webp`} alt="" loading="lazy" className="absolute inset-0 size-full object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-105" />
      </div>
      <p className="label-mono text-muted-foreground">{p.date} · {p.read}</p>
      <T className="text-lg font-semibold leading-snug tracking-tight transition-colors group-hover:text-accent">{p.title}</T>
    </Link>
  );
}

export function Presence() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <SectionHead
          n="IN"
          label="Branches"
          title="Our Presence"
          titleAs="p"
          aside={
            <div className="text-sm leading-relaxed">
              <p className="label-mono mb-2 text-foreground">Head Office</p>
              {site.headOffice.map((l) => <span key={l} className="block">{l}</span>)}
            </div>
          }
        />
        <ul className="flex flex-wrap gap-2 md:gap-3">
          {cities.map((c, i) => (
            <motion.li
              key={c}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="cursor-default rounded-full border px-5 py-2.5 text-base transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-background md:px-6 md:py-3 md:text-lg"
            >
              {c}
            </motion.li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/** Closing call to action: dark card with a slow aurora and two routes in. */
// Live site "Contact Us" block
export function CtaBlock() {
  return (
    <section className="px-2 pb-2 pt-16 md:px-3 md:pt-24">
      <div className="relative overflow-hidden rounded-[2rem] bg-accent px-5 py-20 text-background md:px-12 md:py-28">
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -left-1/4 top-0 size-[50rem] rounded-full will-change-transform"
          style={{ background: "radial-gradient(circle, rgba(143,193,170,.45), transparent 65%)" }}
          animate={{ x: ["0%", "40%", "0%"], y: ["0%", "20%", "0%"] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="relative mx-auto max-w-5xl text-center">
          <SectionLabel as="h2" className="justify-center text-background/70">Contact Us</SectionLabel>
          <TextReveal as="p" text="Ready to bring your vision to life?" accent={["vision"]} className="mt-5 text-4xl md:text-6xl [&_.text-accent]:text-accent-bright" />
          <FadeIn delay={0.2} className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-background/80 md:text-lg">
            Tell us about your project, and we’ll reach out to discuss how we can build something exceptional together.
          </FadeIn>
          <FadeIn delay={0.3} className="mt-10 flex flex-wrap justify-center gap-3">
            <ArrowButton to="/contact" variant="light">Contact Us</ArrowButton>
            <ArrowButton href={`tel:${site.phoneRaw}`} variant="outline" className="text-background">Call {site.phone}</ArrowButton>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/** The live pages' FAQ widget: an H2 "Frequently asked questions" and each question as a heading (H3, or H2 on the Cortizo page). */
export function FaqBlock({ slug, className }: { slug: string; className?: string }) {
  const faq = (faqs as Record<string, { title: string; items: { tag: string; q: string; a: string }[] }>)[slug];
  if (!faq) return null;
  return (
    <section className={cn("py-16 md:py-20", className)}>
      <Container className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 className="font-display-tight text-3xl md:text-4xl">{faq.title}</h2>
        </div>
        <div className="lg:col-span-8">
          <Accordion items={faq.items.map((x) => ({ q: x.q, a: x.a, qtag: x.tag as AccordionItem["qtag"] }))} />
        </div>
      </Container>
    </section>
  );
}
