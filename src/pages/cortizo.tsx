import { motion } from "motion/react";
import { ArrowUpRight, BadgeCheck, DoorOpen, Fence, LayoutGrid, Palette, PanelsTopLeft, Settings2, Sun, Columns3 } from "lucide-react";
import { TextReveal } from "@/components/ui/text-reveal";
import { FadeIn } from "@/components/ui/fade-in";
import { NumberTicker } from "@/components/ui/number-ticker";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { ParallaxImage } from "@/components/ui/parallax-image";
import { ArrowButton } from "@/components/ui/arrow-button";
import { Container, Crumbs, SectionLabel } from "@/components/site/primitives";
import { CtaBlock, PostCard, SectionHead } from "@/components/site/blocks";
import { img, posts } from "@/data/site";

const range = [
  { icon: PanelsTopLeft, t: "Hinged", d: "Casement windows and doors in thermal and non-thermal series." },
  { icon: DoorOpen, t: "Doors", d: "Entrance and terrace doors with concealed hardware." },
  { icon: Columns3, t: "Sliding", d: "Minimal, lift-and-slide and pocket sliding systems." },
  { icon: LayoutGrid, t: "PVC", d: "High-insulation PVC windows for energy-led projects." },
  { icon: Palette, t: "Finishes", d: "13 anodised colours and 110 finishes." },
  { icon: Sun, t: "Sunscreen", d: "Louvres, brise-soleil and solar shading." },
  { icon: Fence, t: "Handrail", d: "Glass and aluminium balustrade systems." },
  { icon: Settings2, t: "Accessories", d: "Hardware, seals and smart operation." },
];

export default function Cortizo() {
  return (
    <>
      <section className="bg-drafting relative pb-10 pt-32 md:pt-40">
        <Container className="text-center">
          <Crumbs items={[["Home", "/"], ["Cortizo"]]} className="flex justify-center" />
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="label-mono mt-10 inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1.5 text-accent">
            <BadgeCheck className="size-3.5" /> Authorised Cortizo partner in India
          </motion.p>
          <TextReveal as="h1" text="Cortizo. Engineered in Spain, installed in India." accent={["Spain,"]} className="mx-auto mt-6 max-w-5xl text-4xl md:text-6xl" />
          <FadeIn delay={0.5} className="mx-auto mt-8 max-w-xl text-lg text-muted-foreground">
            A global leader in façade and fenestration, headquartered in Padrón, Spain, with a Technology Centre certified by PfB Rosenheim, Germany.
          </FadeIn>
          <FadeIn delay={0.6} className="mt-10 flex flex-wrap justify-center gap-2">
            <ArrowButton to="/contact">Request a Cortizo quote</ArrowButton>
            <ArrowButton href="https://www.ventanascortizo.com/en/" variant="light" className="border">Cortizo catalogue</ArrowButton>
          </FadeIn>
        </Container>
        <Container className="relative mt-16">
          <ParallaxImage src={img("v-white-villa")} alt="Minimal white villa with large aluminium glazing" className="h-[56svh] rounded-[2rem]" strength={6} priority />
          {[["150+", "systems", "left-14 top-6"], ["PfB", "Rosenheim certified", "right-14 bottom-6"]].map(([a, b, pos]) => (
            <motion.div key={a} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.8 }} className={`absolute hidden rounded-2xl bg-background/90 px-5 py-4 backdrop-blur md:block ${pos}`}>
              <p className="font-display-tight text-4xl">{a}</p>
              <p className="label-mono text-muted-foreground">{b}</p>
            </motion.div>
          ))}
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <div className="grid divide-y border-y md:grid-cols-4 md:divide-x md:divide-y-0">
            {([[150, "+", "Systems"], [9, "", "Manufacturing plants"], [13, "", "Anodised colours"], [110, "", "Finishes"]] as const).map(([n, s, l]) => (
              <div key={l} className="px-2 py-8 md:px-8 md:py-12">
                <p className="font-display-tight text-7xl md:text-8xl"><NumberTicker value={n} /><span className="text-accent">{s}</span></p>
                <p className="label-mono mt-3 text-muted-foreground">{l}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-20 md:pb-28">
        <Container>
          <SectionHead n="01" label="The range" title="Choose your system." accent={["system."]} aside={<p className="max-w-xs">Cortizo's anodising range is unparalleled. Every series below is available in our Bengaluru sample room.</p>} />
          <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
            {range.map(({ icon: Icon, t, d }, i) => (
              <FadeIn key={t} delay={(i % 4) * 0.06}>
                <SpotlightCard className="group h-full p-6 md:p-8">
                  <Icon className="size-8 text-accent" strokeWidth={1.2} />
                  <h3 className="font-display-tight mt-16 text-3xl md:text-4xl">{t}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{d}</p>
                  <ArrowUpRight className="absolute right-6 top-6 size-5 opacity-0 transition-all duration-500 group-hover:rotate-45 group-hover:opacity-100" />
                </SpotlightCard>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      <section className="px-2 md:px-3">
        <div className="grid overflow-hidden rounded-[2rem] bg-graphite text-background lg:grid-cols-2">
          <div className="flex flex-col justify-between gap-16 p-8 md:p-16">
            <SectionLabel n="02" className="text-background/60">Technology centre</SectionLabel>
            <div>
              <TextReveal text="Tested in Spain. Certified in Germany." accent={["Certified"]} className="text-5xl md:text-7xl [&_.text-accent]:text-accent-bright" />
              <p className="mt-8 max-w-md text-background/65">Every Cortizo system is validated for air, water and wind performance in a state-of-the-art Technology Centre certified by PfB Rosenheim, so performance on paper is performance on site.</p>
            </div>
          </div>
          <ParallaxImage src={img("v-white-tower")} alt="Facade with deep-set aluminium windows" className="min-h-[50svh]" />
        </div>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <SectionHead n="03" label="Cortizo journal" title="Questions architects ask us." accent={["ask"]} />
          <div className="grid gap-8 md:grid-cols-3">
            {posts.filter((p) => p.cat === "Cortizo").slice(0, 3).map((p, i) => <FadeIn key={p.slug} delay={i * 0.08}><PostCard p={p} /></FadeIn>)}
          </div>
        </Container>
      </section>

      <CtaBlock title="Specify Cortizo with confidence." accent={["confidence."]} />
    </>
  );
}
