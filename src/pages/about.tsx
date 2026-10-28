import * as React from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, Gem, Handshake, Ruler, Wrench } from "lucide-react";
import { TextReveal } from "@/components/ui/text-reveal";
import { FadeIn } from "@/components/ui/fade-in";
import { NumberTicker } from "@/components/ui/number-ticker";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { ParallaxImage } from "@/components/ui/parallax-image";
import { Container, Crumbs } from "@/components/site/primitives";
import { CtaBlock, Presence, SectionHead } from "@/components/site/blocks";
import { img, partners } from "@/data/site";

/** Three photographs drifting at different speeds beside the intro. */
function Collage() {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const a = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const b = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const c = useTransform(scrollYProgress, [0, 1], [0, -220]);
  const shots = [
    { src: "joy-classic-arch", y: a, cls: "left-0 top-0 w-[58%] aspect-[3/4]" },
    { src: "u-facade-angles", y: b, cls: "right-0 top-[22%] w-[52%] aspect-[4/5]" },
    { src: "mcslide-lounge", y: c, cls: "left-[18%] bottom-0 w-[46%] aspect-square" },
  ];
  return (
    <div ref={ref} className="relative h-[34rem] md:h-[44rem]">
      {shots.map((s, i) => (
        <motion.div
          key={s.src}
          style={{ y: s.y }}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
          className={`absolute overflow-hidden rounded-[var(--radius)] shadow-[0_30px_60px_-30px_rgba(22,24,26,.5)] ${s.cls}`}
        >
          <img src={img(s.src)} alt="" className="size-full object-cover" />
        </motion.div>
      ))}
    </div>
  );
}

const values = [
  { icon: Gem, t: "Curation", d: "We partner only with manufacturers whose engineering, testing and finish we have verified first-hand." },
  { icon: Ruler, t: "Specification", d: "Our consultants translate design intent into profiles, glass and hardware that perform in Indian conditions." },
  { icon: Wrench, t: "Precision", d: "Trained installation teams work to European tolerances, so systems seal, glide and last as designed." },
  { icon: Handshake, t: "Partnership", d: "From the first drawing to after-care, we stay accountable for the life of every project." },
];

export default function About() {
  return (
    <>
      <section className="overflow-hidden pb-16 pt-32 md:pb-28 md:pt-40">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Crumbs items={[["Home", "/"], ["About"]]} />
            <TextReveal as="h1" text="Curators of Europe's finest building systems." accent={["finest"]} className="mt-8 text-4xl md:text-6xl" />
            <FadeIn delay={0.4} className="mt-10 max-w-md text-lg text-muted-foreground">
              Sumptuous Building Systems (SBS) is a distinguished leader in India's façade and fenestration industry, bringing premium solutions from renowned European manufacturers to architects, builders and discerning homeowners.
            </FadeIn>
          </div>
          <Collage />
        </Container>
      </section>

      <section className="border-y bg-card py-20 md:py-28">
        <Container className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="font-display-tight text-[9rem] leading-none text-accent md:text-[13rem]"><NumberTicker value={25} />+</p>
            <p className="label-mono mt-2 text-muted-foreground">Years in façade &amp; fenestration</p>
          </div>
          <div className="space-y-6 text-lg leading-relaxed md:col-span-7 md:col-start-6 md:columns-2 md:gap-10 md:space-y-0">
            <p className="md:mb-6">Our curated portfolio showcases innovative products that embody cutting-edge technology, exceptional design and deep industry expertise.</p>
            <p className="md:mb-6">By forging strategic partnerships with esteemed European manufacturers, SBS gives clients access to the finest solutions on the global market.</p>
            <p>Our commitment to uncompromising quality, innovative products and exceptional service has made us a trusted partner across the industry, with more than 500 projects completed across India.</p>
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <SectionHead n="01" label="What we believe" title="Four principles behind every opening." accent={["every"]} />
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ icon: Icon, t, d }, i) => (
              <FadeIn key={t} delay={i * 0.08}>
                <SpotlightCard className="flex h-full min-h-80 flex-col justify-between p-7">
                  <div className="flex items-center justify-between">
                    <span className="grid size-12 place-items-center rounded-full bg-accent-soft text-accent"><Icon className="size-5" strokeWidth={1.5} /></span>
                    <span className="label-mono text-muted-foreground">0{i + 1}</span>
                  </div>
                  <div>
                    <h3 className="font-display-tight text-4xl">{t}</h3>
                    <p className="mt-4 text-muted-foreground">{d}</p>
                  </div>
                </SpotlightCard>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      <div className="mx-auto max-w-[1320px] px-4 md:px-8"><ParallaxImage src={img("u-house-dusk")} alt="Contemporary home with full-height glazing at dusk" className="h-[62svh] rounded-[2rem]" strength={8} /></div>

      <section className="py-20 md:py-28">
        <Container>
          <SectionHead n="02" label="Partners" title="Ten makers, four countries, one portfolio." accent={["one"]} />
          <div className="grid gap-px overflow-hidden rounded-[var(--radius)] border bg-border sm:grid-cols-2 lg:grid-cols-5">
            {partners.map((p, i) => (
              <FadeIn key={p.name} delay={(i % 5) * 0.05} className="h-full">
                <a href={p.url} target="_blank" rel="noopener" className="group flex h-full min-h-52 flex-col justify-between bg-background p-6 transition-colors duration-500 hover:bg-graphite hover:text-background">
                  <div className="flex items-center justify-between">
                    <span className="label-mono rounded border px-1.5 py-0.5 group-hover:border-background/30">{p.code}</span>
                    <ArrowUpRight className="size-4 opacity-40 transition-all group-hover:rotate-45 group-hover:opacity-100" />
                  </div>
                  <div>
                    <p className="font-display text-2xl italic">{p.name}</p>
                    <p className="mt-2 text-sm text-muted-foreground group-hover:text-background/60">{p.note}</p>
                  </div>
                </a>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      <Presence />
      <CtaBlock title="Built on trust. Let's build yours." accent={["trust."]} />
    </>
  );
}

