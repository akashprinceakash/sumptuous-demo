import * as React from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "motion/react";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, MapPin, Quote } from "lucide-react";
import { TiltedGridHero } from "@/components/ui/tilted-grid-hero";
import { Marquee } from "@/components/ui/marquee";
import { TextReveal } from "@/components/ui/text-reveal";
import { FadeIn } from "@/components/ui/fade-in";
import { ArrowButton } from "@/components/ui/arrow-button";
import { StickyScrollReveal } from "@/components/ui/sticky-scroll-reveal";
import { ParallaxColumns } from "@/components/ui/parallax-columns";
import TimelineBlock01 from "@/components/ui/timeline-01";
import AutoScroll from "embla-carousel-auto-scroll";
import type { CarouselApi } from "@/components/ui/carousel";
import {
  Stories, StoriesContent, Story, StoryAuthor, StoryAuthorImage, StoryAuthorName, StoryImage, StoryOverlay, StoryTitle,
} from "@/components/ui/stories-carousel";
import { Container } from "@/components/site/primitives";
import { StudioSection } from "@/components/site/studio-section";
import { CtaBlock, PostCard, Presence, ProductTile, SectionHead } from "@/components/site/blocks";
import { img, partners, posts, products, projects, testimonials } from "@/data/site";

const HERO_IMAGES = [
  "hero-guillotine", "u-villa-sliding", "mcslide-lounge", "u-house-dusk", "railing-terrace", "u-living-glass",
  "pronema-terrace", "u-villa-white", "renson-louvre", "u-modern-house", "pronema-awning", "u-glass-stair",
].map((n) => ({ src: img(n), alt: "" }));

const PROCESS = [
  { date: "Consult", title: "Reading the brief and the site", description: "We study drawings, orientation and climate, and how each room should live, then shortlist the systems that fit.", image: img("u-architect-drawing") },
  { date: "Specify", title: "Profiles, glass and hardware", description: "Finishes, glazing and hardware are matched to performance targets and budget, with samples from our studio.", image: img("cortizo-villa") },
  { date: "Engineer", title: "Shop drawings with Europe", description: "Structural checks and fabrication drawings are coordinated directly with our European manufacturing partners.", image: img("u-glazed-corridor") },
  { date: "Install", title: "Millimetre tolerances on site", description: "Trained crews install, seal and test every opening so it glides, locks and weathers as designed.", image: img("u-site-team") },
  { date: "Care", title: "Support for the life of the building", description: "Handover documentation, maintenance guidance and service visits long after the last opening is glazed.", image: img("u-living-glass") },
];

const initials = (s: string) => s.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();

/** Pauses the hero's CSS animation while it is off screen, so it costs nothing as you scroll on. */
function useOffscreenPause() {
  const ref = React.useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { margin: "0px" });
  return { ref, visible };
}

export default function Home() {
  const hero = useOffscreenPause();
  const [api, setApi] = React.useState<CarouselApi>();
  // Continuous drift for the projects strip; pauses while hovered, resumes after a drag.
  const autoScroll = React.useMemo(
    () => AutoScroll({ speed: 0.7, startDelay: 400, stopOnInteraction: false, stopOnMouseEnter: true, stopOnFocusIn: true }),
    [],
  );
  const reduceMotion = typeof window !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;
  const step = (dir: "prev" | "next") => {
    if (!api) return;
    const auto = api.plugins().autoScroll;
    auto?.stop();
    if (dir === "next") api.scrollNext(); else api.scrollPrev();
    window.setTimeout(() => { if (!reduceMotion) auto?.play(); }, 1400);
  };
  const bySlug = (s: string) => products.find((p) => p.slug.startsWith(s))!;
  const signature = [
    { p: bySlug("guillotine"), eyebrow: "Albertgenau · Spain", body: "Frameless panels glide up or down at the click of a remote, opening an entire room to the horizon." },
    { p: bySlug("railings"), eyebrow: "Wind-dam", body: "A retractable glass railing that rises against wind, sand and noise, then sinks away for the view." },
    { p: bySlug("mosquito"), eyebrow: "Bettio · Pronema · Renson", body: "Neoscenica® screens with the patented ANIMA21® windproof system: refined enough to read as architecture." },
    { p: bySlug("internal"), eyebrow: "MC Slide · Italy", body: "Sliding glass that divides space without dividing light, framed or completely frameless." },
  ];

  return (
    <>
      {/* ── hero ─────────────────────────────────────────── */}
      <div ref={hero.ref} className={hero.visible ? "" : "[&_[class*='tgh-t-']]:[animation-play-state:paused]"}>
        <TiltedGridHero images={HERO_IMAGES} speed={4.5} tileHeight={26} axis={63} curve={76} fade={10} className="h-svh min-h-[640px] w-full bg-background">
          <div className="relative z-10 flex h-full flex-col items-center justify-between px-4 pb-8 pt-24 text-center md:pt-28">
            <div className="max-w-5xl">
              <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="label-mono inline-flex items-center gap-2 rounded-full border bg-background/70 px-3 py-1.5">
                <span className="size-1.5 rounded-full bg-accent" /> Façade &amp; fenestration · 25+ years
              </motion.p>
              <TextReveal as="h1" text="The world's finest windows, brought to India." accent={["finest"]} delay={0.15} className="mt-5 text-balance text-[clamp(2.4rem,5vw,4.75rem)]" />
            </div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.8 }} className="flex w-full max-w-6xl flex-col items-center justify-between gap-5 md:flex-row md:items-end">
              <p className="max-w-xs text-balance text-sm text-muted-foreground md:text-left">European systems in aluminium, wood, steel and bronze, curated, specified and installed across India.</p>
              <div className="flex flex-wrap justify-center gap-2">
                <ArrowButton to="/products">Explore products</ArrowButton>
                <ArrowButton to="/projects" variant="light" className="border">Projects</ArrowButton>
              </div>
              <span className="label-mono hidden items-center gap-2 text-muted-foreground md:inline-flex"><ArrowDown className="size-3.5" /> Scroll</span>
            </motion.div>
          </div>
        </TiltedGridHero>
      </div>

      {/* ── partner ticker ───────────────────────────────── */}
      <section aria-label="Partners" className="border-y py-5">
        <Marquee duration={50}>
          {partners.map((p) => (
            <span key={p.name} className="flex items-center gap-3 whitespace-nowrap px-5">
              <span className="font-display text-2xl italic">{p.name}</span>
              <span className="label-mono rounded border px-1.5 py-0.5 text-muted-foreground">{p.code}</span>
            </span>
          ))}
        </Marquee>
      </section>

      <StudioSection />

      {/* ── bento of systems ─────────────────────────────── */}
      <section className="bg-drafting py-20 md:py-28">
        <Container>
          <SectionHead n="02" label="The collection" title="Twelve systems. One standard." accent={["One", "standard."]} aside={<Link to="/products" className="inline-flex items-center gap-2 font-medium text-foreground hover:underline">All 12 products <ArrowUpRight className="size-4" /></Link>} />
          <div className="grid auto-rows-[minmax(14rem,auto)] grid-cols-1 gap-2 md:grid-cols-6">
            <FadeIn className="md:col-span-4 md:row-span-2"><ProductTile p={products[4]} index={4} tall className="h-full" /></FadeIn>
            <FadeIn delay={0.05} className="md:col-span-2"><ProductTile p={products[0]} index={0} className="h-full" /></FadeIn>
            <FadeIn delay={0.1} className="md:col-span-2"><ProductTile p={products[11]} index={11} className="h-full" /></FadeIn>
            <FadeIn className="md:col-span-2"><ProductTile p={products[10]} index={10} className="h-full" /></FadeIn>
            <FadeIn delay={0.05} className="md:col-span-2"><ProductTile p={products[7]} index={7} className="h-full" /></FadeIn>
            <FadeIn delay={0.1} className="md:col-span-2">
              <Link to="/products" className="group flex h-full min-h-56 flex-col justify-between rounded-[var(--radius)] border border-dashed border-foreground/25 bg-background p-6 transition-colors hover:border-accent hover:bg-accent hover:text-background">
                <span className="label-mono">+ 7 more systems</span>
                <span className="font-display-tight text-3xl">Steel, bronze, railings, screens &amp; more <ArrowUpRight className="inline size-7 transition-transform group-hover:rotate-45" /></span>
              </Link>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ── signature systems, sticky reveal ─────────────── */}
      <section className="py-20 md:py-28">
        <Container>
          <SectionHead n="03" label="Signature systems" title="Openings that move." accent={["move."]} />
          <StickyScrollReveal items={signature.map(({ p, eyebrow, body }) => ({ title: p.short, eyebrow, body, img: img(p.img), to: `/${p.slug}` }))} />
        </Container>
      </section>

      {/* ── parallax interlude ───────────────────────────── */}
      <section className="bg-graphite py-3">
        <ParallaxColumns
          images={["u-house-dusk", "u-glass-towers", "u-villa-pool", "u-living-clerestory", "u-black-facade", "u-timber-house", "u-facade-angles", "u-villa-white", "u-modern-house"].map((n) => ({ src: img(n), alt: "" }))}
        >
          <div className="mx-4 rounded-[2rem] bg-graphite/80 px-8 py-10 text-center text-background backdrop-blur-md md:px-14 md:py-12">
            <p className="label-mono text-accent-bright">Engineered in Europe · Installed in India</p>
            <p className="font-display-tight mt-4 text-5xl md:text-7xl">Light, <em className="text-accent-bright">framed</em> precisely.</p>
          </div>
        </ParallaxColumns>
      </section>

      {/* ── projects: stories carousel ───────────────────── */}
      <section className="overflow-hidden py-20 md:py-28">
        <Container>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl space-y-3">
              <p className="inline-flex items-center rounded-full border px-3 py-1 text-xs text-muted-foreground">(04) Selected projects</p>
              <h2 className="text-3xl font-medium tracking-tight md:text-5xl">Homes opened to light</h2>
              <p className="text-base leading-relaxed text-muted-foreground md:text-lg">A selection of residences across Karnataka where our systems frame the view. Hover to pause, drag to browse.</p>
            </div>
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => step("prev")} aria-label="Previous projects" className="grid size-11 place-items-center rounded-full border transition-colors hover:bg-graphite hover:text-background"><ArrowLeft className="size-4" /></button>
              <button type="button" onClick={() => step("next")} aria-label="Next projects" className="grid size-11 place-items-center rounded-full border transition-colors hover:bg-graphite hover:text-background"><ArrowRight className="size-4" /></button>
              <Link to="/projects" className="ml-2 inline-flex h-11 items-center gap-2 rounded-full bg-graphite px-5 text-sm font-medium text-background hover:bg-accent">All projects <ArrowUpRight className="size-4" /></Link>
            </div>
          </div>
        </Container>
        {/* full-bleed looping track that drifts on its own; edges fade out instead of hard-cutting */}
        <Stories
          setApi={setApi}
          opts={{ loop: true, dragFree: true }}
          plugins={reduceMotion ? [] : [autoScroll]}
          className="[mask-image:linear-gradient(90deg,transparent,#000_4%,#000_96%,transparent)]"
        >
            {/* Loop mode spaces slides by their padding only (a CSS gap leaves the wrapped pair touching),
                so slides are sized here and each card sits inside its slide's left padding. */}
            <StoriesContent className="gap-0 [&>[role=group]]:!w-[248px] md:[&>[role=group]]:!w-[296px]">
              {projects.map((p) => (
                <Story key={p.name} className="aspect-[3/4]">
                  <StoryImage src={img(p.img)} alt={p.name} loading="lazy" decoding="async" />
                  <StoryOverlay side="top" className="h-24 from-black/45" />
                  <StoryTitle>
                    <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2 py-0.5 text-xs backdrop-blur-sm"><MapPin className="size-3" />{p.city}</span>
                  </StoryTitle>
                  <StoryOverlay className="h-32 from-black/70" />
                  <StoryAuthor>
                    <StoryAuthorImage fallback={initials(p.name)} name={p.name} className="size-7 bg-accent" />
                    <div className="min-w-0">
                      <StoryAuthorName className="block">{p.name}</StoryAuthorName>
                      <span className="block truncate text-xs text-white/70">{p.products}</span>
                    </div>
                  </StoryAuthor>
                </Story>
              ))}
            </StoriesContent>
        </Stories>
        <Container>
          <p className="mt-5 text-xs text-muted-foreground">Imagery is indicative. Project photography to follow.</p>
        </Container>
      </section>

      {/* ── process: timeline-01 ─────────────────────────── */}
      <TimelineBlock01
        badge="(05) How we work"
        title="From first sketch to final seal"
        description="One accountable team from the first conversation to service visits years after handover."
        items={PROCESS}
      />

      {/* ── testimonials, dual marquee ───────────────────── */}
      <section className="overflow-hidden py-20 md:py-28">
        <Container><SectionHead n="06" label="Testimonials" title="In their words." accent={["words."]} /></Container>
        <div className="space-y-3 [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
          {[false, true].map((rev) => (
            <Marquee key={String(rev)} reverse={rev} duration={60}>
              {(rev ? [...testimonials].reverse() : testimonials).map((t) => (
                <figure key={t.q} className="w-[20rem] shrink-0 rounded-[var(--radius)] border bg-card p-6 md:w-[26rem]">
                  <Quote className="size-5 text-accent" />
                  <blockquote className="mt-4 leading-snug md:text-lg">{t.q}</blockquote>
                  <figcaption className="label-mono mt-6 text-muted-foreground"><span className="text-foreground">{t.who}</span> · {t.where}</figcaption>
                </figure>
              ))}
            </Marquee>
          ))}
        </div>
      </section>

      <Presence />

      {/* ── journal ──────────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <Container>
          <SectionHead n="07" label="Journal" title="Notes on light and glass." accent={["light"]} aside={<Link to="/blog" className="inline-flex items-center gap-2 font-medium text-foreground hover:underline">All articles <ArrowUpRight className="size-4" /></Link>} />
          <div className="grid gap-8 md:grid-cols-3">
            {posts.slice(0, 3).map((p, i) => <FadeIn key={p.slug} delay={i * 0.08}><PostCard p={p} /></FadeIn>)}
          </div>
        </Container>
      </section>

      <CtaBlock />
    </>
  );
}
