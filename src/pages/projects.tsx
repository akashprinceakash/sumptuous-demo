import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { MapPin } from "lucide-react";
import { TextReveal } from "@/components/ui/text-reveal";
import { FadeIn } from "@/components/ui/fade-in";
import { ExpandableGallery } from "@/components/ui/expandable-gallery";
import { Container, Crumbs, SectionLabel } from "@/components/site/primitives";
import { CtaBlock, Presence } from "@/components/site/blocks";
import { img, projects } from "@/data/site";
import { cn } from "@/lib/utils";

const types = ["All", ...new Set(projects.map((p) => p.type))];

export default function Projects() {
  const [filter, setFilter] = React.useState("All");
  const shown = projects.filter((p) => filter === "All" || p.type === filter);

  return (
    <>
      <section className="pb-12 pt-32 md:pt-40">
        <Container className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <Crumbs items={[["Home", "/"], ["Projects"]]} />
            <TextReveal as="h1" text="Five hundred openings, each one considered." accent={["considered."]} className="mt-8 text-4xl md:text-6xl" />
          </div>
          <FadeIn delay={0.4} className="md:col-span-4">
            <p className="font-display-tight text-8xl text-accent">500+</p>
            <p className="label-mono mt-2 text-muted-foreground">Projects completed across India</p>
          </FadeIn>
        </Container>
      </section>

      <section className="pb-20">
        <Container>
          <ExpandableGallery items={projects.slice(0, 5).map((p) => ({ title: p.name, meta: `${p.city} · ${p.products}`, img: img(p.img) }))} />
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <div className="mb-10 flex flex-wrap items-center justify-between gap-6">
            <SectionLabel n="01">Project index</SectionLabel>
            <div role="toolbar" aria-label="Filter projects" className="flex flex-wrap gap-1 rounded-full border bg-card p-1">
              {types.map((t) => (
                <button key={t} type="button" aria-pressed={filter === t} onClick={() => setFilter(t)} className="relative rounded-full px-4 py-2 text-sm">
                  {filter === t && <motion.span layoutId="proj-pill" className="absolute inset-0 rounded-full bg-graphite" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />}
                  <span className={cn("relative", filter === t && "text-background")}>{t}</span>
                </button>
              ))}
            </div>
          </div>
          <motion.div layout className="columns-1 gap-2 sm:columns-2 lg:columns-3">
            <AnimatePresence mode="popLayout">
              {shown.map((p, i) => (
                <motion.article
                  layout
                  key={p.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative mb-2 break-inside-avoid overflow-hidden rounded-[var(--radius)] bg-muted"
                >
                  <img src={img(p.img)} alt={p.name} loading="lazy" className={cn("w-full object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-105", i % 3 === 0 ? "aspect-[3/4]" : "aspect-[4/3]")} />
                  <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-graphite/90 via-graphite/0 p-5 text-background opacity-100 transition-opacity duration-500 md:opacity-0 md:group-hover:opacity-100">
                    <p className="label-mono inline-flex items-center gap-1.5 text-accent-bright"><MapPin className="size-3" />{p.city}</p>
                    <h3 className="font-display-tight mt-2 text-3xl">{p.name}</h3>
                    <p className="mt-1 text-sm text-background/70">{p.type} · {p.products}</p>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
          <p className="label-mono mt-6 text-muted-foreground">Imagery is indicative. Project photography to follow.</p>
        </Container>
      </section>

      <Presence />
      <CtaBlock title="Your project, next in this list." accent={["next"]} />
    </>
  );
}
