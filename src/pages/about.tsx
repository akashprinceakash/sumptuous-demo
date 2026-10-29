import * as React from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, Gem, Lightbulb, MapPinned, ShieldCheck } from "lucide-react";
import { TextReveal } from "@/components/ui/text-reveal";
import { FadeIn } from "@/components/ui/fade-in";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { ParallaxImage } from "@/components/ui/parallax-image";
import { ArrowButton } from "@/components/ui/arrow-button";
import { Container, Crumbs, SectionLabel } from "@/components/site/primitives";
import { CtaBlock, Presence, SectionHead } from "@/components/site/blocks";
import { img, partners } from "@/data/site";

// Wording from the live About page (sumptuousindia.com/about).

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
    <div ref={ref} className="relative h-[32rem] md:h-[40rem]">
      {shots.map((s, i) => (
        <motion.div
          key={s.src}
          style={{ y: s.y }}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.2 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
          className={`absolute overflow-hidden rounded-[var(--radius)] shadow-[0_30px_60px_-30px_rgba(22,24,26,.5)] ${s.cls}`}
        >
          <img src={img(s.src)} alt="" className="size-full object-cover" />
        </motion.div>
      ))}
    </div>
  );
}

const highlights = ["26+ Years Experience", "Pan India Service", "International Network", "Premium Residential Solutions"];

const whyUs = [
  { icon: Gem, t: "26+ years of Experience", d: "Guided by nearly three decades of industry knowledge, ensuring reliability, precision, and excellence." },
  { icon: Lightbulb, t: "Solution-Oriented Approach", d: "We don't push off-the-shelf products. We listen to your needs and engineer custom solutions designed for your space." },
  { icon: MapPinned, t: "Pan-India Service Network", d: "A robust distribution and execution network capable of delivering seamless end-to-end service across India." },
  { icon: ShieldCheck, t: "Uncompromising Quality", d: "Every solution is crafted using premium materials and executed with strict attention to detail." },
];

export default function About() {
  return (
    <>
      <section className="overflow-hidden pb-16 pt-32 md:pb-24 md:pt-40">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Crumbs items={[["Home", "/"], ["About"]]} />
            {/* heading tags follow the live About page, which uses several H1s */}
            <h2 className="label-mono mt-8 font-normal text-accent">About Sumptuous Business System</h2>
            <TextReveal as="h1" text="About Sumptuous Building Systems India" accent={["Sumptuous"]} className="mt-4 text-4xl md:text-6xl" />
            <FadeIn delay={0.3} className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground md:text-lg">
              <p>Sumptuous Building Systems (SBS) is a distinguished leader in India's facade and fenestration industry, specializing in the provision of premium solutions sourced from renowned European manufacturers. Our meticulously curated portfolio showcases a diverse range of innovative products that embody cutting-edge technology, exceptional design, and unparalleled industry expertise.</p>
              <p>By forging strategic partnerships with esteemed European manufacturers, SBS empowers architects, builders, and discerning homeowners to access the finest solutions available in the global market. Our commitment to delivering uncompromising quality, innovative products, and exceptional customer service has established us as a trusted partner in the industry.</p>
            </FadeIn>
          </div>
          <Collage />
        </Container>
      </section>

      <section className="border-y bg-card py-20 md:py-28">
        <Container className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <SectionLabel n="01" as="h1">About Sumptuous Business Systems</SectionLabel>
            <TextReveal as="h1" text="Turning Houses Into Bespoke Homes" accent={["Bespoke"]} className="mt-4 text-3xl md:text-5xl" />
            <ul className="mt-8 grid grid-cols-2 gap-2">
              {highlights.map((h) => (
                <li key={h} className="rounded-2xl border bg-background px-4 py-3 text-sm font-medium"><span className="mr-1.5 text-accent">✧</span>{h}</li>
              ))}
            </ul>
          </div>
          <FadeIn className="space-y-5 text-base leading-relaxed text-muted-foreground md:col-span-6 md:col-start-7 md:text-lg">
            <p>At Sumptuous Business System, we believe every home should be as unique as the people who live in it. We don’t just sell products—we deliver tailored, high-end residential solutions designed to bring your vision to life.</p>
            <p>With a strong National and International, we combine deep industry expertise with nationwide reach to bring customized, premium living solutions directly to your doorstep—wherever you are located in India.</p>
            <div className="border-t pt-6">
              <h2 className="text-xl font-semibold tracking-tight text-foreground">Our Leadership & Expertise</h2>
              <p className="mt-3">Under the vision and leadership of our Director, Ranjeet Rawat, who brings 26 years of industry experience, Sumptuous Business System has grown into a trusted name in customized residential spaces.</p>
              <p className="mt-3">Nearly three decades of hands-on experience allow us to navigate complex design requirements, anticipate client needs, and maintain uncompromising quality across every project we undertake.</p>
            </div>
          </FadeIn>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <SectionHead n="02" label="Sumptuous Building Systems" title="Why Choose Us ?" />
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {whyUs.map(({ icon: Icon, t, d }, i) => (
              <FadeIn key={t} delay={i * 0.08}>
                <SpotlightCard className="flex h-full min-h-72 flex-col justify-between p-7">
                  <div className="flex items-center justify-between">
                    <span className="grid size-12 place-items-center rounded-full bg-accent-soft text-accent"><Icon className="size-5" strokeWidth={1.5} /></span>
                    <span className="label-mono text-muted-foreground">0{i + 1}</span>
                  </div>
                  <div>
                    <h1 className="text-xl font-semibold tracking-tight">{t}</h1>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{d}</p>
                  </div>
                </SpotlightCard>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-20 md:pb-28">
        <Container className="grid items-center gap-10 md:grid-cols-12">
          <ParallaxImage src={img("u-house-dusk")} alt="Contemporary home with full-height glazing at dusk" className="h-[56svh] rounded-[2rem] md:col-span-7" strength={8} />
          <FadeIn className="md:col-span-5">
            <SectionLabel n="03" as="h2">Our Commitment</SectionLabel>
            <blockquote className="mt-5 font-serif text-3xl italic leading-tight md:text-4xl">
              “A house is built with walls and beams
              <br />A home is built with love and dreams.”
            </blockquote>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">Our mission is to bridge the gap between imagination and execution. Whether you are building from scratch or redesigning your space, Sumptuous Business System is your trusted partner in crafting spaces that reflect comfort, elegance, and individuality.</p>
            <ArrowButton to="/contact" className="mt-8">Let's build your home</ArrowButton>
          </FadeIn>
        </Container>
      </section>

      <section className="bg-graphite py-20 text-background md:py-28">
        <Container>
          <div className="mb-12 grid gap-6 md:grid-cols-12 md:items-end">
            <div className="md:col-span-6">
              <SectionLabel className="text-background/60">Partners</SectionLabel>
              <TextReveal as="p" text="Global Partner Brands" accent={["Global"]} className="mt-4 text-3xl md:text-5xl [&_.text-accent]:text-accent-bright" />
            </div>
            <p className="text-background/65 md:col-span-6">Sumptuous India partners with leading global brands to deliver world-class aluminium systems and architectural solutions in India. Our portfolio includes internationally recognised brands known for innovation, performance and design excellence across windows, doors, facade systems and architectural hardware.</p>
          </div>
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius)] border border-background/10 bg-background/10 sm:grid-cols-3 lg:grid-cols-4">
            {partners.map((p, i) => {
              const inner = (
                <>
                  <div className="flex items-center justify-between">
                    <span className="label-mono text-background/45">{String(i + 1).padStart(2, "0")}</span>
                    {p.url ? <ArrowUpRight className="size-4 opacity-40 transition-all group-hover:rotate-45 group-hover:opacity-100" /> : null}
                  </div>
                  <div>
                    <p className="font-serif text-2xl italic md:text-3xl">{p.name}</p>
                    {p.country ? <p className="mt-1 text-sm text-background/55">{p.country}</p> : null}
                  </div>
                </>
              );
              const cls = "group flex h-full min-h-40 flex-col justify-between bg-graphite p-6 transition-colors duration-500 hover:bg-graphite-2";
              return (
                <FadeIn key={p.name} delay={(i % 4) * 0.05} className="h-full">
                  {p.url ? <a href={p.url} target="_blank" rel="noopener" className={cls}>{inner}</a> : <div className={cls}>{inner}</div>}
                </FadeIn>
              );
            })}
            <div className="hidden bg-graphite lg:block" />
          </div>
        </Container>
      </section>

      <Presence />
      <CtaBlock />
    </>
  );
}
