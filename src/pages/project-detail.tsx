import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import { TextReveal } from "@/components/ui/text-reveal";
import { FadeIn } from "@/components/ui/fade-in";
import { ParallaxImage } from "@/components/ui/parallax-image";
import { Container, Crumbs } from "@/components/site/primitives";
import { CtaBlock } from "@/components/site/blocks";
import { img, projectPath, projects, type Project } from "@/data/site";

// The live project pages carry only the project name and its photos, so this page does the same.
export default function ProjectDetail({ project: p }: { project: Project }) {
  const i = projects.indexOf(p);
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const next = projects[(i + 1) % projects.length];
  const gallery = [prev.img, next.img];

  return (
    <>
      <section className="pb-10 pt-32 md:pt-40">
        <Container className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <Crumbs items={[["Home", "/"], ["Projects", "/projects"], [p.name]]} />
            {p.city ? <p className="label-mono mt-8 inline-flex items-center gap-1.5 text-accent"><MapPin className="size-3.5" />{p.city}</p> : null}
            <TextReveal as="h1" text={p.name} className="mt-4 text-4xl md:text-6xl" />
          </div>
          {p.text ? <FadeIn delay={0.3} className="text-base leading-relaxed text-muted-foreground md:col-span-4">{p.text}</FadeIn> : null}
        </Container>
      </section>

      <Container>
        <ParallaxImage src={img(p.img)} alt={p.name} className="h-[64svh] rounded-[2rem]" strength={6} priority />
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {gallery.map((g) => <ParallaxImage key={g} src={img(g)} alt="" className="aspect-[4/3] rounded-[var(--radius)]" strength={5} />)}
        </div>
        <p className="mt-5 text-xs text-muted-foreground">Imagery is indicative. Project photography to follow.</p>
      </Container>

      <nav aria-label="More projects" className="mt-16 border-t">
        <Container className="grid gap-2 py-8 md:grid-cols-2">
          {[{ q: prev, label: "Previous", I: ArrowLeft }, { q: next, label: "Next", I: ArrowRight }].map(({ q, label, I }) => (
            <Link key={label} to={projectPath(q)} className="group relative flex min-h-40 items-end overflow-hidden rounded-[var(--radius)] bg-graphite p-6 text-background">
              <img src={img(q.img)} alt="" loading="lazy" decoding="async" className="absolute inset-0 size-full object-cover opacity-40 transition-all duration-700 group-hover:scale-105 group-hover:opacity-60" />
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
