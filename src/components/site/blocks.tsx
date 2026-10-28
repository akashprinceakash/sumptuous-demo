// Section-level building blocks shared across pages.
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { cities, site, type Post, type Product } from "@/data/site";
import { ArrowButton } from "@/components/ui/arrow-button";
import { FadeIn } from "@/components/ui/fade-in";
import { TextReveal } from "@/components/ui/text-reveal";
import { cn } from "@/lib/utils";
import { Container, SectionLabel } from "./primitives";

export function SectionHead({ n, label, title, accent, aside, className }: {
  n?: string; label: string; title: string; accent?: string[]; aside?: React.ReactNode; className?: string;
}) {
  return (
    <div className={cn("mb-10 grid gap-8 md:mb-14 md:grid-cols-12 md:items-end", className)}>
      <div className="md:col-span-8">
        <SectionLabel n={n}>{label}</SectionLabel>
        <TextReveal text={title} accent={accent} className="mt-5 text-4xl md:text-6xl" />
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
        <img src={`/images/${p.img}.webp`} alt={p.title} loading="lazy" className="absolute inset-0 size-full object-cover transition-transform duration-[1.4s] ease-out-expo group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/10 to-transparent" />
        <span className="label-mono absolute left-4 top-4 rounded-full bg-background/90 px-2.5 py-1 text-foreground">{String(index + 1).padStart(2, "0")}</span>
        <span className="absolute right-4 top-4 grid size-10 place-items-center rounded-full bg-background/15 backdrop-blur-md transition-all duration-500 group-hover:rotate-45 group-hover:bg-accent-bright group-hover:text-graphite">
          <ArrowUpRight className="size-4" />
        </span>
      </div>
      <div className="relative -mt-16 flex items-end justify-between gap-4 p-5">
        <div>
          <p className="label-mono text-accent-bright">{p.partner}</p>
          <h3 className="font-display-tight mt-2 text-2xl md:text-3xl">{p.short}</h3>
        </div>
        <Icon className="size-5 shrink-0 text-background/60" strokeWidth={1.4} />
      </div>
    </Link>
  );
}

export function PostCard({ p, className }: { p: Post; className?: string }) {
  return (
    <Link to={`/blog/${p.slug}`} className={cn("group flex flex-col gap-4", className)}>
      <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius)] bg-muted">
        <img src={`/images/${p.img}.webp`} alt="" loading="lazy" className="absolute inset-0 size-full object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-105" />
        <span className="label-mono absolute left-3 top-3 rounded-full bg-background/90 px-2.5 py-1">{p.cat}</span>
      </div>
      <p className="label-mono text-muted-foreground">{p.date} · {p.read} min read</p>
      <h3 className="text-xl font-medium leading-snug transition-colors group-hover:text-accent">{p.title}</h3>
    </Link>
  );
}

export function Presence() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <SectionHead n="IN" label="Our presence" title="Installed across thirteen cities." accent={["thirteen"]} aside={<p className="max-w-xs">From our Bengaluru studio, our teams specify, supply and install across India.</p>} />
        <ul className="flex flex-wrap gap-2 md:gap-3">
          {cities.map((c, i) => (
            <motion.li
              key={c}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                "cursor-default rounded-full border px-5 py-3 text-lg transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-background md:px-7 md:py-4 md:text-2xl",
                i === 0 && "border-graphite bg-graphite text-background",
              )}
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
export function CtaBlock({ title = "Have drawings? Let's frame the view.", accent = ["frame"] }: { title?: string; accent?: string[] }) {
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
          <SectionLabel className="justify-center text-background/70">Begin a project</SectionLabel>
          <TextReveal text={title} accent={accent} className="mt-6 text-5xl md:text-7xl [&_.text-accent]:text-accent-bright" />
          <FadeIn delay={0.3} className="mt-12 flex flex-wrap justify-center gap-3">
            <ArrowButton to="/contact" variant="light">Book a consultation</ArrowButton>
            <ArrowButton href={`tel:${site.phoneRaw}`} variant="outline" className="text-background">Call {site.phone}</ArrowButton>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
