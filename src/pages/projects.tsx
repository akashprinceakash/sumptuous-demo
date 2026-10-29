import { motion } from "motion/react";
import { MapPin } from "lucide-react";
import { TextReveal } from "@/components/ui/text-reveal";
import { FadeIn } from "@/components/ui/fade-in";
import { ExpandableGallery } from "@/components/ui/expandable-gallery";
import { Container, Crumbs, SectionLabel } from "@/components/site/primitives";
import { CtaBlock, Presence } from "@/components/site/blocks";
import { Link } from "react-router-dom";
import { img, projectPath, projects, site } from "@/data/site";
import { cn } from "@/lib/utils";

// Wording from the live Projects page ("Our Projects") and the home page project descriptions.
export default function Projects() {
  const featured = projects.filter((p) => p.text);
  return (
    <>
      <section className="pb-12 pt-32 md:pt-40">
        <Container className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <Crumbs items={[["Home", "/"], ["Projects"]]} />
            <TextReveal as="h1" text="Our Projects" accent={["Projects"]} className="mt-8 text-4xl md:text-6xl" />
            <FadeIn delay={0.3} className="mt-4 text-base text-muted-foreground md:text-lg">Showcasing Our Finest Expertise</FadeIn>
          </div>
          <FadeIn delay={0.4} className="md:col-span-4">
            <p className="text-6xl font-medium tracking-tight text-accent">500+</p>
            <p className="mt-2 text-sm text-muted-foreground">projects completed across India</p>
          </FadeIn>
        </Container>
      </section>

      <section className="pb-16">
        <Container>
          <ExpandableGallery items={featured.map((p) => ({ title: p.name, meta: p.city ?? site.name, img: img(p.img) }))} />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {featured.map((p, i) => (
              <FadeIn key={p.name} delay={i * 0.06}>
                <p className="text-lg font-semibold tracking-tight">{p.name}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <SectionLabel n="01" className="mb-8">Our Projects</SectionLabel>
          <div className="columns-1 gap-2 sm:columns-2 lg:columns-3">
            {projects.map((p, i) => (
              <motion.article
                key={p.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8% 0px" }}
                transition={{ duration: 0.7, delay: (i % 3) * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="group relative mb-2 break-inside-avoid overflow-hidden rounded-[var(--radius)] bg-muted"
              >
                <Link to={projectPath(p)} aria-label={p.name} className="absolute inset-0 z-10" />
                <img src={img(p.img)} alt={p.name} loading="lazy" decoding="async" className={cn("w-full object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-105", i % 3 === 0 ? "aspect-[3/4]" : "aspect-[4/3]")} />
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-graphite/85 via-graphite/0 p-5 text-background">
                  {p.city ? <p className="label-mono inline-flex items-center gap-1.5 text-accent-bright"><MapPin className="size-3" />{p.city}</p> : null}
                  <p className="mt-1.5 text-xl font-semibold tracking-tight">{p.name}</p>
                </div>
              </motion.article>
            ))}
          </div>
          <p className="mt-6 text-xs text-muted-foreground">Imagery is indicative. Project photography to follow.</p>
        </Container>
      </section>

      <Presence />
      <CtaBlock />
    </>
  );
}
