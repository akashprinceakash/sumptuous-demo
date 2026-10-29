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
import { img, partners, posts, products, projectPath, projects, site, testimonials, uniqueApproach, whyChoose } from "@/data/site";

const HERO_IMAGES = [
  "hero-guillotine", "u-villa-sliding", "mcslide-lounge", "u-house-dusk", "railing-terrace", "u-living-glass",
  "pronema-terrace", "u-villa-white", "renson-louvre", "u-modern-house", "pronema-awning", "u-glass-stair",
].map((n) => ({ src: img(n), alt: "" }));

const WHY_IMAGES = ["u-architect-drawing", "cortizo-villa", "u-glazed-corridor", "u-living-glass", "u-site-team", "u-villa-white"];

const initials = (s: string) => s.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();

// Live home page copy, in page order. Tags follow the live page: its H1 is the keyword line,
// "Sumptuous Building Systems" and the section titles are H2s.
const INTRO = [
  "Experience the perfect blend of luxury, performance, and modern architecture with premium Cortizo windows in India designed for contemporary homes, villas, and commercial spaces. At Sumptuous Building System, we deliver sophisticated aluminium window solutions that combine minimalist aesthetics, superior durability, thermal efficiency, and exceptional craftsmanship for elegant living spaces.",
  "Our advanced window systems are engineered to maximize natural light, enhance ventilation, and create seamless indoor-outdoor connectivity while maintaining high standards of security and energy efficiency. Whether you are designing a luxury residence or upgrading a modern architectural project, our expertly crafted aluminium solutions bring timeless style and long-lasting performance to every space.",
  "From sleek sliding systems to high-performance minimal frames, we provide customized solutions that match modern architectural trends and premium lifestyle expectations. With a focus on innovation, precision engineering, and elegant finishes, our collection of Cortizo windows in India is ideal for homeowners, architects, and builders seeking refined architectural excellence.",
];
const BANGALORE = [
  "Looking for premium Cortizo Windows in Bangalore for your home or commercial project? Cortizo aluminium systems are known for their sleek European design, durability, and high performance. These modern window systems are perfect for luxury villas, apartments, offices, and contemporary buildings in Bangalore.",
  "Cortizo windows offer slim aluminium frames, large glass panels, excellent sound insulation, and smooth functionality. They are designed to handle Bangalore’s changing weather conditions while providing long-lasting performance with minimal maintenance.",
  "Whether you need sliding windows, minimal windows, or premium aluminium doors and windows, Cortizo Windows in Bangalore are an ideal choice for stylish and high-quality living spaces.",
];
const PARTNERS_TEXT = [
  "Sumptuous India partners with leading global brands to deliver world-class aluminium systems and architectural solutions in India. Our portfolio includes internationally recognised brands known for innovation, performance and design excellence across windows, doors, facade systems and architectural hardware.",
  "Our partner brands include Cortizo, Albert Genau, Joy Windows, Bettio, Tempio, MC Slide, OPK, Pronema, Renson, Smartech Door Systems and Wind-Dam, enabling us to provide diverse, high-performance solutions tailored for modern architectural needs.",
];

// Live home page, "OUR FINEST PRODUCT · Timeless Georgian Windows For Modern Living"
const GEORGIAN_TEXT = "Discover bespoke Georgian windows by Sumptuous Building Systems, crafted in premium Aluminium, Wood, and Steel. Combining classic architectural elegance with modern performance, our solutions are tailored to enhance every home and commercial space.";

export default function Home() {
  const heroRef = React.useRef<HTMLDivElement>(null);
  const heroVisible = useInView(heroRef);
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
  const finest = [
    { p: bySlug("windows-georgian"), body: GEORGIAN_TEXT },
    ...["guillotine", "railings", "mosquito", "internal"].map((s) => ({ p: bySlug(s), body: bySlug(s).intro })),
  ];

  return (
    <>
      {/* ── hero ─────────────────────────────────────────── */}
      <div ref={heroRef} className={heroVisible ? "" : "[&_[class*='tgh-t-']]:[animation-play-state:paused]"}>
        <TiltedGridHero images={HERO_IMAGES} speed={4.5} tileHeight={26} axis={63} curve={76} fade={10} className="h-svh min-h-[640px] w-full bg-background">
          <div className="relative z-10 flex h-full flex-col items-center justify-between px-4 pb-8 pt-24 text-center md:pt-28">
            <div className="max-w-4xl">
              <motion.h2 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="label-mono inline-flex items-center gap-2 rounded-full border bg-background/70 px-3 py-1.5 font-normal">
                <span className="size-1.5 rounded-full bg-accent" /> {site.name}
              </motion.h2>
              <TextReveal as="h1" text="Cortizo Windows in India by Sumptuous Building System" accent={["India"]} delay={0.15} className="mt-5 text-[clamp(2.1rem,4.2vw,3.9rem)]" />
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.5 }} className="mt-4 text-base text-muted-foreground md:text-lg">{site.tagline}</motion.p>
            </div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.8 }} className="flex w-full max-w-6xl flex-col items-center justify-between gap-5 md:flex-row md:items-end">
              <span className="hidden w-24 md:block" />
              <div className="flex flex-wrap justify-center gap-2">
                <ArrowButton to="/products">Products</ArrowButton>
                <ArrowButton to="/projects" variant="light" className="border">Projects</ArrowButton>
              </div>
              <span className="label-mono hidden items-center gap-2 text-muted-foreground md:inline-flex"><ArrowDown className="size-3.5" /> Scroll</span>
            </motion.div>
          </div>
        </TiltedGridHero>
      </div>

      {/* ── intro: the live H1's three paragraphs ──────────── */}
      <section className="py-16 md:py-24">
        <Container className="grid gap-6 md:grid-cols-3 md:gap-10">
          {INTRO.map((t, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <p className={i === 0 ? "text-lg font-medium leading-relaxed tracking-tight text-foreground md:text-xl" : "text-base leading-relaxed text-muted-foreground"}>{t}</p>
            </FadeIn>
          ))}
        </Container>
      </section>

      {/* ── partner ticker (the named section with text is further down) ── */}
      <section aria-hidden className="border-y py-5">
        <Marquee duration={50}>
          {partners.map((p) => (
            <span key={p.name} className="flex items-center gap-3 whitespace-nowrap px-5">
              <span className="font-serif text-2xl italic">{p.name}</span>
              {p.code ? <span className="label-mono rounded border px-1.5 py-0.5 text-muted-foreground">{p.code}</span> : null}
            </span>
          ))}
        </Marquee>
      </section>

      <StudioSection />

      {/* ── products bento ───────────────────────────────── */}
      <section className="bg-drafting py-20 md:py-28">
        <Container>
          <SectionHead n="02" label="Products" labelAs="h2" titleAs="p" title="High Performance Windows for Sustainable Habitats" accent={["Sustainable"]} aside={<Link to="/products" className="inline-flex items-center gap-2 font-medium text-foreground hover:underline">All products <ArrowUpRight className="size-4" /></Link>} />
          <div className="grid auto-rows-[minmax(14rem,auto)] grid-cols-1 gap-2 md:grid-cols-6">
            <FadeIn className="md:col-span-4 md:row-span-2"><ProductTile p={products[4]} index={4} tall className="h-full" /></FadeIn>
            <FadeIn delay={0.05} className="md:col-span-2"><ProductTile p={products[0]} index={0} className="h-full" /></FadeIn>
            <FadeIn delay={0.1} className="md:col-span-2"><ProductTile p={products[11]} index={11} className="h-full" /></FadeIn>
            <FadeIn className="md:col-span-2"><ProductTile p={products[10]} index={10} className="h-full" /></FadeIn>
            <FadeIn delay={0.05} className="md:col-span-2"><ProductTile p={products[7]} index={7} className="h-full" /></FadeIn>
            <FadeIn delay={0.1} className="md:col-span-2">
              <Link to="/products" className="group flex h-full min-h-56 flex-col justify-between rounded-[var(--radius)] border border-dashed border-foreground/25 bg-background p-6 transition-colors hover:border-accent hover:bg-accent hover:text-background">
                <span className="label-mono">Products</span>
                <span className="font-display-tight text-3xl">View all 12 products <ArrowUpRight className="inline size-7 transition-transform group-hover:rotate-45" /></span>
              </Link>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ── our finest product, sticky reveal ────────────── */}
      <section className="py-20 md:py-28">
        <Container>
          {/* live tags: "OUR" and "FINEST PRODUCT" are H1s, the two title lines H2s */}
          <div className="mb-10 md:mb-14">
            <div className="label-mono flex items-center gap-2 text-muted-foreground">
              <span className="text-accent">(03)</span>
              <h1 className="font-normal">OUR</h1>
              <h1 className="font-normal">FINEST PRODUCT</h1>
            </div>
            <div className="font-display-tight mt-4 text-3xl md:text-5xl">
              <h2>Timeless <em className="text-accent">Georgian</em> Windows</h2>
              <h2>For Modern Living</h2>
            </div>
          </div>
          <StickyScrollReveal items={finest.map(({ p, body }) => ({ title: p.name, eyebrow: `${p.partner} · ${p.origin}`, body, img: img(p.hero), to: `/${p.slug}` }))} />
        </Container>
      </section>

      {/* ── parallax interlude ───────────────────────────── */}
      <section className="bg-graphite py-3">
        <ParallaxColumns
          images={["u-house-dusk", "u-glass-towers", "u-villa-pool", "u-living-clerestory", "u-black-facade", "u-timber-house", "u-facade-angles", "u-villa-white", "u-modern-house"].map((n) => ({ src: img(n), alt: "" }))}
        >
          <div className="mx-4 rounded-[2rem] bg-graphite/80 px-8 py-10 text-center text-background backdrop-blur-md md:px-14 md:py-12">
            <p className="label-mono text-accent-bright">Crafted to perfection</p>
            <h2 className="font-display-tight mt-4 text-4xl md:text-6xl">The Art of <em className="text-accent-bright">Built</em> Excellence</h2>
          </div>
        </ParallaxColumns>
      </section>

      {/* ── projects: stories carousel ───────────────────── */}
      <section className="overflow-hidden py-20 md:py-28">
        <Container>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl space-y-3">
              <p className="inline-flex items-center rounded-full border px-3 py-1 text-xs text-muted-foreground">(04) Our Projects</p>
              <h2 className="text-3xl font-medium tracking-tight md:text-5xl">Showcasing Our Finest Expertise</h2>
              <p className="text-base leading-relaxed text-muted-foreground md:text-lg">{site.tagline}</p>
            </div>
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => step("prev")} aria-label="Previous projects" className="grid size-11 place-items-center rounded-full border transition-colors hover:bg-graphite hover:text-background"><ArrowLeft className="size-4" /></button>
              <button type="button" onClick={() => step("next")} aria-label="Next projects" className="grid size-11 place-items-center rounded-full border transition-colors hover:bg-graphite hover:text-background"><ArrowRight className="size-4" /></button>
              <Link to="/projects" className="ml-2 inline-flex h-11 items-center gap-2 rounded-full bg-graphite px-5 text-sm font-medium text-background hover:bg-accent">Our Projects <ArrowUpRight className="size-4" /></Link>
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
                <Link to={projectPath(p)} aria-label={p.name} className="absolute inset-0 z-10" />
                <StoryImage src={img(p.img)} alt={p.name} loading="lazy" decoding="async" />
                {p.city ? (
                  <>
                    <StoryOverlay side="top" className="h-24 from-black/45" />
                    <StoryTitle>
                      <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2 py-0.5 text-xs backdrop-blur-sm"><MapPin className="size-3" />{p.city}</span>
                    </StoryTitle>
                  </>
                ) : null}
                <StoryOverlay className="h-32 from-black/70" />
                <StoryAuthor>
                  <StoryAuthorImage fallback={initials(p.name)} name={p.name} className="size-7 bg-accent" />
                  <StoryAuthorName className="block">{p.name}</StoryAuthorName>
                </StoryAuthor>
              </Story>
            ))}
          </StoriesContent>
        </Stories>
        <Container>
          <p className="mt-5 text-xs text-muted-foreground">Imagery is indicative. Project photography to follow.</p>
          <div className="mt-12 grid gap-8 border-t pt-10 md:grid-cols-3">
            {projects.filter((p) => p.text).map((p, i) => (
              <FadeIn key={p.slug} delay={i * 0.08}>
                <h2 className="text-xl font-semibold tracking-tight"><Link to={projectPath(p)} className="hover:text-accent">{p.name}</Link></h2>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">{p.text}</p>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* ── why choose us: timeline-01 ───────────────────── */}
      <TimelineBlock01
        badge="OUR UNIQUE APPROACH"
        badgeAs="h2"
        titleAs="p"
        itemAs="p"
        title="Why Choose Sumptuous India"
        description={uniqueApproach}
        items={whyChoose.map((title, i) => ({ title, image: img(WHY_IMAGES[i]) }))}
      />

      {/* ── testimonials, dual marquee ───────────────────── */}
      <section className="overflow-hidden py-20 md:py-28">
        <Container>
          <SectionHead n="06" label="Trusted & Appreciated" titleAs="h3" title="See What Our Clients Say about Us" accent={["Clients"]} aside={<p className="label-mono">SATISFIED CUSTOMERS</p>} />
        </Container>
        <div className="space-y-3 [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
          {[false, true].map((rev) => (
            <Marquee key={String(rev)} reverse={rev} duration={80} className="[&>div]:items-stretch">
              {(rev ? [...testimonials].reverse() : testimonials).map((t) => (
                <figure key={t.who} className="flex w-[21rem] shrink-0 flex-col justify-between rounded-[var(--radius)] border bg-card p-6 md:w-[26rem]">
                  <div>
                    <Quote className="size-5 text-accent" />
                    <blockquote className="mt-4 space-y-3 text-[0.95rem] leading-relaxed">{t.q.map((q) => <p key={q}>{q}</p>)}</blockquote>
                  </div>
                  <figcaption className="mt-6 border-t pt-4 text-sm">
                    <span className="block font-semibold">— {t.who}</span>
                    {t.where ? <span className="mt-0.5 block text-muted-foreground">{t.where}</span> : null}
                  </figcaption>
                </figure>
              ))}
            </Marquee>
          ))}
        </div>
      </section>

      {/* ── Cortizo in Bangalore (live H3 + H2 and copy) ───── */}
      <section className="border-t py-20 md:py-28">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h3 className="label-mono font-normal text-accent">Premium Aluminium Windows &amp; Doors in India</h3>
            <p className="mt-3 text-sm text-muted-foreground">{site.tagline}</p>
            <TextReveal as="h2" text="Cortizo Windows in Bangalore for Modern Luxury Homes" accent={["Bangalore"]} className="mt-6 text-3xl md:text-5xl" />
          </div>
          <div className="space-y-5 text-base leading-relaxed text-muted-foreground md:text-lg lg:col-span-6 lg:col-start-7">
            {BANGALORE.map((t) => <FadeIn key={t}><p>{t}</p></FadeIn>)}
          </div>
        </Container>
      </section>

      {/* ── global partner brands ───────────────────────── */}
      <section className="border-y bg-card py-20 md:py-28">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12">
            <TextReveal as="h2" text="Global Partner Brands" accent={["Partner"]} className="text-3xl md:text-5xl lg:col-span-5" />
            <div className="space-y-5 text-base leading-relaxed text-muted-foreground md:text-lg lg:col-span-6 lg:col-start-7">
              {PARTNERS_TEXT.map((t) => <FadeIn key={t}><p>{t}</p></FadeIn>)}
            </div>
          </div>
          <ul className="mt-12 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
            {partners.map((p) => (
              <li key={p.name}>
                {p.url ? (
                  <a href={p.url} target="_blank" rel="noopener" className="flex h-full items-center justify-between gap-3 rounded-2xl border bg-background p-5 transition-colors hover:border-accent">
                    <span className="font-serif text-2xl italic">{p.name}</span>
                    {p.code ? <span className="label-mono rounded border px-1.5 py-0.5 text-muted-foreground">{p.code}</span> : null}
                  </a>
                ) : (
                  <span className="flex h-full items-center rounded-2xl border bg-background p-5 font-serif text-2xl italic">{p.name}</span>
                )}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <Presence />

      {/* ── blog ─────────────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <Container>
          <SectionHead n="07" label="Blogs" titleAs="p" title="All Posts" aside={<Link to="/blog" className="inline-flex items-center gap-2 font-medium text-foreground hover:underline">View all <ArrowUpRight className="size-4" /></Link>} />
          <div className="grid gap-8 md:grid-cols-3">
            {posts.slice(0, 3).map((p, i) => <FadeIn key={p.slug} delay={i * 0.08}><PostCard p={p} /></FadeIn>)}
          </div>
        </Container>
      </section>

      <CtaBlock />
    </>
  );
}
